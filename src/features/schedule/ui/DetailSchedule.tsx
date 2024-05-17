import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { format, differenceInMinutes, addDays, set } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import ReactDOM from "react-dom";
import { useRouter } from "next/navigation";

import { DetailProposal } from "@/features/schedule/index";
import { Color } from "@/shared/lib/styles/color";
import {
  getScheduleDetailsResponse,
  getScheduleDetails,
  deleteSchedule,
  CreateSchedule,
} from "@/features/schedule/index";
import Button from "@/shared/ui//button";
import { fetchWithInterceptor } from "@/shared";
import ProposalModal from "@/shared/ui/proposalModal";
import ModalLayout from "@/shared/ui/modalLayout";

import useMeetStore, { MeetState } from "@/store/meetStore";

interface IDetailScheduleProps {
  close: () => void;
  scheduleId: number;
  startDatetime: string;
  endDatetime: string;
  triggerReload: () => void;
  left: number;
  top: number;
}
export function DetailSchedule({
  close,
  scheduleId,
  startDatetime,
  endDatetime,
  triggerReload,
  left,
  top,
}: IDetailScheduleProps) {
  const router = useRouter();
  const [data, setData] = useState<getScheduleDetailsResponse | null>(null); //data api 가져온다.
  const [trigger, setTrigger] = useState(false); //
  const [buttonClicked, setButtonClicked] = useState<string>("");
  //api 호출
  useEffect(() => {
    getScheduleDetails(scheduleId).then((response) => {
      console.log(response);
      const startDate = new Date(startDatetime);
      const endDate = new Date(endDatetime);
      setData({ ...response, startDatetime: startDate, endDatetime: endDate });
      setButtonClicked(
        response.myStatus === "ACCEPTED"
          ? "attend"
          : response.myStatus === "DECLINED"
          ? "absence"
          : ""
      );
    });
  }, [scheduleId, trigger]);
  // 외부영역 클릭 확인을위한 ref
  const ref = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 더보기 일정 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !document.getElementById("createScheduleModal")?.contains(event.target as Node) &&
        !document.getElementById("detailProposal")?.contains(event.target as Node) &&
        !document.getElementById("proposalModal")?.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [showDetail, setShowDetail] = useState(false); // 시간변경제안 상세보기
  const [detailData, setDetailData] = useState<{
    proposal: {
      proposalId: number;
      startDatetime: string;
      endDatetime: string;
    };
    reason: string;
  }>(); // 시간변경제안 상세보기 데이터
  const [showDelete, setShowDelete] = useState(false); // 삭제 확인창 보여주기 상태
  const [showUpadate, setShowUpdate] = useState(false); // 수정창 보여주기 상태
  const {
    setMeetName,
    setStartDatetime,
    setEndDatetime,
    setRunningTime,
    setMemberList,
    setDescription,
    setIsUpdate,
    setScheduleId,
  } = useMeetStore((state: MeetState) => state);
  const nextHandle = async () => {
    await Promise.all([
      setMeetName(data?.name || ""),
      setDescription(data?.description || ""),
      setStartDatetime(
        data?.startDatetime ? format(data.startDatetime, "yyyy-MM-dd'T'HH:mm:ss") : ""
      ),
      setEndDatetime(
        data?.endDatetime ? format(addDays(data.endDatetime, 7), "yyyy-MM-dd'T'HH:mm:ss") : ""
      ),
      setRunningTime(
        data?.startDatetime && data?.endDatetime
          ? differenceInMinutes(data.endDatetime, data.startDatetime)
          : 15
      ),
      setMemberList(
        (data?.attendeeList || []).map((attendee) => ({
          user: {
            id: attendee.memberId,
            name: attendee.memberName,
            profile: attendee.profile,
            zoneId: attendee.zoneId,
            department: attendee.department,
            region: attendee.region,
          },
          isRequired: attendee.isRequired,
        }))
      ),
      setIsUpdate(true),
      setScheduleId(scheduleId),
    ]);
    router.push("/main/meeting/createMeeting");
  };
  // 수정창 보여주기
  const handleUpdate = async () => {
    if (data?.type === "MEETING") {
      await nextHandle();
      return;
    }
    setShowUpdate((prev) => !prev);
  };
  // 삭제 api 호출
  const handelDelete = async (deleteRange?: "ALL" | "ONE" | "AFTERALL") => {
    await deleteSchedule({
      scheduleId: scheduleId,
      ...(deleteRange && {
        deleteRange: deleteRange,
        deleteStartDatetime: startDatetime,
        deleteEndDatetime: endDatetime,
      }),
    });
    close();
  };
  const addMeetingAccepted = async (scheduleId: number) => {
    try {
      await fetchWithInterceptor(
        `https://gateway.edgescheduler.co.kr/schedule-service/schedules/${scheduleId}/members/attendance`,
        {
          method: "POST",
          body: JSON.stringify({
            status: "ACCEPTED",
          }),
        }
      );
      console.log("success");
    } catch (error) {
      console.log(error);
    }
    return true;
  };
  //수락거절
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClick = (status: string, scheduleId: number) => {
    setButtonClicked(status);
    if (status === "attend") {
      if (buttonClicked === "attend") return;
      addMeetingAccepted(scheduleId);
    } else if (status === "absence") {
      if (buttonClicked === "absence") return;
      setIsModalOpen(true);
    }
  };
  // 데이터가 없으면 null
  if (!data) {
    return null;
  }
  return ReactDOM.createPortal(
    <BackLayout
      onClick={(e) => {
        close();
        e.stopPropagation();
      }}
    >
      <MainLayout
        onClick={(e) => e.stopPropagation()}
        data-testid="detail schedule"
        left={left}
        top={top}
        viewportHeight={window.innerHeight}
        id="detailSchedule"
      >
        <NameLayout>
          <TextDiv>
            {/* 일정 이름 */}
            <h3>{data.name}</h3>
          </TextDiv>
          <div></div>
          {/* MEETING의 경우 주최자만 수정 삭제 가능하기때문에 보여주지 않는다. */}
          {(data.type === "PERSONAL" ||
            data.type === "WORKING" ||
            (data.type === "MEETING" &&
              JSON.parse(sessionStorage.getItem("user") || "{}").id === data.organizerId)) && (
            <IconLayout>
              <IconDiv>
                <GoPencil size={20} onClick={() => handleUpdate()}></GoPencil>
              </IconDiv>
              <div></div>
              <IconDiv onClick={() => setShowDelete((prev) => !prev)}>
                <FaRegTrashAlt size={20}></FaRegTrashAlt>
              </IconDiv>
            </IconLayout>
          )}
        </NameLayout>
        {/* 일정 시간 */}
        <DataLayout>
          {data.startDatetime &&
          data.endDatetime &&
          format(data.startDatetime, "yyyy-MM-dd(EE)") !==
            format(data.endDatetime, "yyyy-MM-dd(EE)") ? (
            <div>
              {format(data.startDatetime, "yyyy-MM-dd(EE) HH:mm") +
                " ~ " +
                format(data.endDatetime, "yyyy-MM-dd(EE) HH:mm")}
            </div>
          ) : (
            <div>
              {format(data.startDatetime, "yyyy-MM-dd(EE) HH:mm") +
                " ~ " +
                format(data.endDatetime, "HH:mm")}
            </div>
          )}
        </DataLayout>
        {/* 일정 설명 */}
        <DataLayout>{data.description && <div>{data.description}</div>}</DataLayout>
        {data.type === "MEETING" && <DataLayout>attendee</DataLayout>}
        {/* 회의참석자만 보여줌 */}
        {data.type === "MEETING" &&
          JSON.parse(sessionStorage.getItem("user") || "").id !== data.organizerId && (
            <ButtonDiv>
              <Button
                id="attend"
                color="black"
                $bgColor={buttonClicked === "attend" ? "green" : "black50"}
                $hoverColor="black100"
                onClick={() => {
                  onClick("attend", scheduleId);
                }}
                width={5}
                height={2}
                fontSize={12}
              >
                attend
              </Button>
              <Button
                id="absence"
                color="black"
                $bgColor={buttonClicked === "absence" ? "orange" : "black50"}
                $hoverColor="black100"
                onClick={async () => {
                  await onClick("absence", scheduleId);
                  // close();
                }}
                width={5}
                height={2}
                fontSize={12}
              >
                absence
              </Button>
            </ButtonDiv>
          )}
        <ModalLayout
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen((prev) => !prev);
          }}
        >
          <ProposalModal
            eventData={{
              scheduleId: scheduleId,
              scheduleName: data.name,
              startTime: format(data.startDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
              endTime: format(data.endDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
              runningTime: differenceInMinutes(data.endDatetime, data.startDatetime),
            }}
            onClose={() => {
              setIsModalOpen((prev) => !prev);
            }}
          />
        </ModalLayout>
        {/* 회의인 경우에만 보여주는참석자 */}
        {data.type === "MEETING" && (
          <AttendeesLayout>
            {data.attendeeList.map((attendee: any) => (
              <AttendeeLayout key={attendee.memberId}>
                <ProfileLayout>
                  <ProfileImage src="" alt="" />
                  {attendee.status === "ACCEPTED" ? (
                    <CircleLayout color="green" />
                  ) : attendee.status === "DECLINED" ? (
                    <CircleLayout color="orange" />
                  ) : (
                    <CircleLayout color="black100" />
                  )}
                </ProfileLayout>
                <AteendeeNameLayout>
                  {attendee.memberName}
                  {attendee.reason ? <SmTextDiv>{attendee.reason}</SmTextDiv> : null}
                </AteendeeNameLayout>
                {/* 제안이 있는 참가자만 보여줌 */}
                {attendee.proposal &&
                  JSON.parse(sessionStorage.getItem("user") || "").id === data.organizerId && (
                    <Button
                      width={3}
                      height={1.5}
                      fontSize={10}
                      onClick={() => {
                        setShowDetail((prev) => !prev);
                        setDetailData(attendee);
                      }}
                    >
                      detail
                    </Button>
                  )}
              </AttendeeLayout>
            ))}
          </AttendeesLayout>
        )}
        {/* 시간변경제안 상세보기 */}
        {showDetail && detailData?.proposal && (
          <DetailProposal
            triggerReload={() => setTrigger((prev) => !prev)}
            endDatetime={detailData?.proposal?.endDatetime}
            name={data.name}
            proposalId={detailData?.proposal?.proposalId}
            reason={detailData?.reason}
            scheduleId={data.scheduleId}
            startDatetime={detailData?.proposal?.startDatetime}
            close={() => setShowDetail(false)}
          ></DetailProposal>
        )}
        {/* 삭제확인체크 반복의 경우 삭제방식 선택 */}
        {showDelete ? (
          data.recurrenceDetails ? (
            <div>
              delete ?
              <Button
                width={3}
                height={2}
                fontSize={10}
                $bgColor="orange"
                $hoverColor="orange400"
                onClick={async () => {
                  await handelDelete("ONE");
                  triggerReload();
                  close();
                }}
              >
                one
              </Button>
              <Button
                width={3}
                height={2}
                fontSize={10}
                $bgColor="orange"
                $hoverColor="orange400"
                onClick={async () => {
                  await handelDelete("ALL");
                  triggerReload();
                  close();
                }}
              >
                all
              </Button>
              <Button
                width={3}
                height={2}
                fontSize={8}
                $bgColor="orange"
                $hoverColor="orange400"
                onClick={async () => {
                  await handelDelete("AFTERALL");
                  triggerReload();
                  close();
                }}
              >
                after all
              </Button>
              <Button
                width={3}
                height={2}
                fontSize={10}
                $bgColor="orange"
                $hoverColor="orange400"
                onClick={() => setShowDelete(false)}
              >
                cancel
              </Button>
            </div>
          ) : (
            <div>
              sure?{" "}
              <Button
                width={3}
                height={2}
                fontSize={10}
                $bgColor="orange"
                $hoverColor="orange400"
                onClick={async () => {
                  await handelDelete("ONE");
                  triggerReload();
                  close();
                }}
              >
                yes
              </Button>
              <Button
                width={3}
                height={2}
                fontSize={10}
                $bgColor="orange"
                $hoverColor="orange400"
                onClick={() => setShowDelete(false)}
              >
                no
              </Button>
            </div>
          )
        ) : null}
        {/* 수정창 */}
        {showUpadate && (
          <CreateSchedule
            left={window.innerWidth / 2 - 200}
            top={window.innerHeight / 2 - 225}
            triggerReload={triggerReload}
            isWORKING={data.type === "WORKING" ? true : false}
            startDate={new Date(data.startDatetime)}
            close={() => setShowUpdate(false)}
            type={data.type}
            isUpdate={true}
            data={data}
          ></CreateSchedule>
        )}
      </MainLayout>
    </BackLayout>,
    document.getElementById("clickModal") as HTMLElement
  );
}

const MainLayout = styled.div<{ left: number; top: number; viewportHeight: number }>`
  position: absolute;
  top: ${(props) => (props.top > props.viewportHeight / 2 ? "auto" : `${props.top}px`)};
  bottom: ${(props) =>
    props.top > props.viewportHeight / 2 ? `${props.viewportHeight - props.top}px` : "auto"};
  left: ${(props) => `${props.left}px`};
  background-color: white;
  width: 350px;
  z-index: 301;
  color: black;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
`;
const TextDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const NameLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr max-content;
  border-bottom: 2px solid black;
`;
const IconLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const DataLayout = styled.div`
  padding: 10px 0 0 5px;
`;
const AttendeeLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  padding: 10px 0 0 5px;
`;
const AttendeesLayout = styled.div`
  padding: 10px 0 0 5px;
  overflow: auto;
  max-height: 150px;
`;
const ProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
`;
const AteendeeNameLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;
const CircleLayout = styled.div<{ color: "green" | "orange" | "black100" }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${(props) => Color(props.color)};
  position: absolute;
  top: 15px;
  left: 15px;
  border: 1px solid white;
`;
const SmTextDiv = styled.div`
  font-size: smaller;
  color: ${Color("black400")};
`;

const ButtonLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60% 1fr 1fr;
  justify-content: right;
  grid-column-gap: 5px;
  margin-top: 10px;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
`;
const BackLayout = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0);
`;
const IconDiv = styled.div`
  cursor: pointer;
`;
