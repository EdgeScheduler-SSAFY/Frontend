import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { Color } from "@/shared/lib/styles/color";
import {
  getScheduleDetailsResponse,
  getScheduleDetails,
  deleteSchedule,
  CreateSchedule,
} from "@/features/schedule/index";
import Button from "@/shared/ui//button";

interface IDetailScheduleProps {
  close: () => void;
  scheduleId: number;
  startDatetime: string;
  endDatetime: string;
  triggerReload: () => void;
}
export function DetailSchedule({
  close,
  scheduleId,
  startDatetime,
  endDatetime,
  triggerReload,
}: IDetailScheduleProps) {
  const [data, setData] = useState<getScheduleDetailsResponse | null>(null); //data api 가져온다.
  //api 호출
  useEffect(() => {
    getScheduleDetails(scheduleId).then((response) => {
      console.log(response);
      const startDate = new Date(startDatetime);
      const endDate = new Date(endDatetime);
      setData({ ...response, startDatetime: startDate, endDatetime: endDate });
    });
  }, [scheduleId]);
  // 외부영역 클릭 확인을위한 ref
  const ref = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 더보기 일정 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [showDetail, setShowDetail] = useState(false); // 시간변경제안 상세보기
  const [detailData, setDetailData] = useState<any>(); // 시간변경제안 상세보기 데이터
  const [showDelete, setShowDelete] = useState(false); // 삭제 확인창 보여주기 상태
  const [showUpadate, setShowUpdate] = useState(false); // 수정창 보여주기 상태
  // 수정창 보여주기
  const handleUpdate = () => {
    setShowUpdate((prev) => !prev);
  };
  // 외부영역 클릭 확인을위한 ref
  const ref2 = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 더보기 일정 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref2.current && !ref2.current.contains(event.target as Node)) {
        setShowDetail(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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
  // 데이터가 없으면 null
  if (!data) {
    return null;
  }

  return (
    <MainLayout onClick={(e) => e.stopPropagation()} ref={ref} data-testid="detail schedule">
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
            JSON.parse(sessionStorage.getItem("user") || "").id === data.organizerId)) && (
          <IconLayout>
            <div>
              <GoPencil size={20} onClick={() => handleUpdate()}></GoPencil>
            </div>
            <div></div>
            <div onClick={() => setShowDelete((prev) => !prev)}>
              <FaRegTrashAlt size={20}></FaRegTrashAlt>
            </div>
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
      {/* 회의인 경우에만 보여주는참석자 */}
      {data.type === "MEETING" && <DataLayout>attendee</DataLayout>}
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
                {attendee.memberId}
                {attendee.proposal ? (
                  <SmTextDiv>{attendee.proposal.startDatetime}</SmTextDiv>
                ) : attendee.reason ? (
                  <SmTextDiv>{attendee.reason}</SmTextDiv>
                ) : null}
              </AteendeeNameLayout>
              {/* 제안이 있는 참가자만 보여줌 */}
              {attendee.proposal &&
                JSON.parse(sessionStorage.getItem("user") || "").id === data.organizerId && (
                  <button
                    onClick={() => {
                      setShowDetail((prev) => !prev);
                      setDetailData(attendee);
                    }}
                  >
                    detail
                  </button>
                )}
            </AttendeeLayout>
          ))}
        </AttendeesLayout>
      )}
      {/* 시간변경제안 상세보기 */}
      {showDetail && (
        <ProposalDetailLayout ref={ref2}>
          <NameLayout>
            <div>suggested time</div>
          </NameLayout>
          <div>{data.name}</div>
          <DataLayout>
            {data.startDatetime &&
            data.endDatetime &&
            format(data.startDatetime, "yyyy-MM-dd(EE)") !==
              format(data.endDatetime, "yyyy-MM-dd(EE)") ? (
              <div>
                {format(data.startDatetime, "yyyy-MM-dd(EE) HH:mm a") +
                  " ~ " +
                  format(data.endDatetime, "yyyy-MM-dd(EE) HH:mm a")}
              </div>
            ) : (
              <div>
                {format(data.startDatetime, "yyyy-MM-dd(EE) HH:mm a") +
                  " ~ " +
                  format(data.endDatetime, "HH:mm a")}
              </div>
            )}
          </DataLayout>
          <div>reason</div>
          <SmTextDiv>{detailData.reason}</SmTextDiv>
          <AttendeeLayout>
            <div>
              <div>ACCEPTED</div>
              {data.type === "MEETING" &&
                data.attendeeList &&
                data.attendeeList
                  .filter((attendee) => attendee.status === "ACCEPTED")
                  .map((attendee: any) => <div key={attendee.memberId}>{attendee.memberId}</div>)}
            </div>
            <div>
              <div>DECLINED</div>
              {data.type === "MEETING" &&
                data.attendeeList &&
                data.attendeeList
                  .filter((attendee) => attendee.status === "DECLINED")
                  .map((attendee: any) => <div key={attendee.memberId}>{attendee.memberId}</div>)}
            </div>
          </AttendeeLayout>
          <ButtonLayout>
            <div></div>
            <button>accept</button>
            <button>decline</button>
          </ButtonLayout>
        </ProposalDetailLayout>
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
              fontSize={10}
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
              cancle
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
  );
}

const MainLayout = styled.div`
  position: fixed;
  top: 10px;
  background-color: white;
  width: 350px;
  z-index: 300;
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
  background-color: blue;
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

const ProposalDetailLayout = styled.div`
  position: absolute;
  width: 350px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  left: 0;
  top: 0;
  padding: 20px;
  background-color: #fff;
  z-index: 200;
`;
const ButtonLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60% 1fr 1fr;
  justify-content: right;
  grid-column-gap: 5px;
  margin-top: 10px;
`;
