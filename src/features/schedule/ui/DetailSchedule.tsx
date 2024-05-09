import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Color } from "@/shared/lib/styles/color";
import { Buttons } from "@testing-library/user-event/dist/cjs/system/pointer/buttons.js";
interface IDetailScheduleProps {
  close: () => void;
}
export function DetailSchedule({ close }: IDetailScheduleProps) {
  const data = {
    scheduleId: 123456789, // 일정 Id
    name: "Meeting", // 일정 이름
    organizerId: 987654321, // 주최자id
    description: "Discuss project updates", // 내용
    color: 1, // 일정 색상
    type: "MEETING", // 일정 타입(MEETING:회의,WORKING:근무시간,PERSONAL:개인일정)
    startDatetime: "2022-01-01T09:00:00", // 시작 일시 (사용자 시간대)
    endDatetime: "2022-01-02T10:00:00", // 종료 일시 (사용자 시간대)
    isPublic: true, // 공개여부
    attendeeList: [
      {
        memberId: 122,
        isRequired: true,
        status: "ACCEPTED", // 참여 여부(ACCEPTED:수락, DECLINED:거절, PENDING:대기중)
        reason: "", // 거절 사유
      },
      {
        memberId: 123,
        isRequired: true,
        status: "DECLINED", // 참여 여부(ACCEPTED:수락, DECLINED:거절, PENDING:대기중)
        reason: "hospital", // 거절 사유
      },
      {
        memberId: 124,
        isRequired: true,
        status: "PENDING", // 참여 여부(ACCEPTED:수락, DECLINED:거절, PENDING:대기중)
        reason: "", // 거절 사유
      },
      {
        memberId: 125,
        isRequired: true,
        status: "DECLINED", // 참여 여부(ACCEPTED:수락, DECLINED:거절, PENDING:대기중)
        reason: "hospital", // 거절 사유
        proposal: {
          proposalId: 987654321, // 일정 제안 ID
          startDatetime: "2022-01-01T09:00:00", // 시작 일시 (사용자 시간대)
          endDatetime: "2022-01-01T10:00:00", // 종료 일시 (사용자 시간대)
        },
      },
    ],
    recurrenceDetails: {
      freq: "DAILY",
      intv: 1,
      expiredDate: "2022-12-31",
      count: 10,
      recurrenceDay: ["MON", "WED", "FRI"],
    },
  };
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
  const [showDetail, setShowDetail] = useState(false);
  const [detailData, setDetailData] = useState<any>();
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
  return (
    <MainLayout onClick={(e) => e.stopPropagation()} ref={ref} data-testid="detail schedule">
      <NameLayout>
        <div>{data.name}</div>
        <div></div>
        <IconLayout>
          <div>수정</div>
          <div>삭제</div>
        </IconLayout>
      </NameLayout>
      <DataLayout>
        {data.startDatetime &&
        data.endDatetime &&
        format(data.startDatetime, "yyyy-MM-dd(EE)") !==
          format(data.endDatetime, "yyyy-MM-dd(EE)") ? (
          <div>
            {format(data.startDatetime, "yyyy-MM-dd(EE) hh:mm a") +
              " ~ " +
              format(data.endDatetime, "yyyy-MM-dd(EE) hh:mm a")}
          </div>
        ) : (
          <div>
            {format(data.startDatetime, "yyyy-MM-dd(EE) hh:mm a") +
              " ~ " +
              format(data.endDatetime, "hh:mm a")}
          </div>
        )}
      </DataLayout>
      <DataLayout>{data.description && <div>{data.description}</div>}</DataLayout>
      <DataLayout>attendee</DataLayout>
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
            {attendee.proposal && (
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
                {format(data.startDatetime, "yyyy-MM-dd(EE) hh:mm a") +
                  " ~ " +
                  format(data.endDatetime, "yyyy-MM-dd(EE) hh:mm a")}
              </div>
            ) : (
              <div>
                {format(data.startDatetime, "yyyy-MM-dd(EE) hh:mm a") +
                  " ~ " +
                  format(data.endDatetime, "hh:mm a")}
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
const NameLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  border-bottom: 2px solid black;
`;
const IconLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
