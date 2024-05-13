import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDay } from "date-fns";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
import Button from "@/shared/ui/button";
import ProposalModal from "@/shared/ui/proposalModal";
import { dayList, MonthList } from "@/shared/lib/data";
import ModalContent from "@/shared/ui/modalContent";

export default function CreateNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const [startDate, startTime] = eventData.startTime.split("T");
  const [endDate, endTime] = eventData.endTime.split("T");
  const [year, month, date] = startDate.split("-");
  const day = getDay(new Date(startDate));
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [buttonClicked, setButtonClicked] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tmpAccessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcxNTU4MzE2Nn0.wo58LM8DNf4vlV-X5kZADTxUqJGupCdJW6-ySoGFeE4";

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, []); // 토큰 저장

  const addMeetingAccepted = async (scheduleId: number) => {
    try {
      await fetch(`https://gateway.edgescheduler.co.kr/schedule-service/schedules/1/members/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tmpAccessToken}`,
        },
        body: JSON.stringify({
          status: "ACCEPTED",
        }),
      });
      console.log("success");
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  // sse 알림 닫는 함수
  const closeHandle = () => {
    onClose();
  };

  // 버튼 클릭 시 상태 변경 함수
  const onClick = (status: string, scheduleId: number) => {
    setButtonClicked(status);
    if (status === "attend") {
      addMeetingAccepted(scheduleId);
    } else if (status === "absence") {
      setIsModalOpen(true);
    }
  };

  return (
    <CreateNoticeLayout>
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.organizerName}&nbsp;</div>
          <CategoryDiv>sent a request&nbsp;</CategoryDiv>
          <div>to attend the meeting.</div>
        </NoticeTitleDetail>
        <CustomMdClose size={15} onClick={closeHandle} />
      </NoticeTitle>
      <TitleLineDiv />
      <NoticeContent>
        <ScheduleDiv>
          <MonthDiv>{MonthList[parseInt(month) - 1]}</MonthDiv>
          <DateDiv>{date}</DateDiv>
          <DotLineDiv />
          <DayDiv>{dayList[day]}</DayDiv>
        </ScheduleDiv>
        <LineDiv />
        <InfoDiv>
          <TitleDiv>{eventData.scheduleName}</TitleDiv>
          <TimeDiv>
            {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
          </TimeDiv>
          <ButtonDiv>
            <Button
              id='attend'
              color='black'
              $bgColor={buttonClicked === "attend" ? "black100" : "black50"}
              $hoverColor='black100'
              onClick={() => onClick("attend", eventData.scheduleId)}
              width={5}
              height={2}
              fontSize={12}
            >
              attend
            </Button>
            <Button
              id='absence'
              color='black'
              $bgColor={buttonClicked === "absence" ? "black100" : "black50"}
              $hoverColor='black100'
              onClick={() => onClick("absence", eventData.scheduleId)}
              width={5}
              height={2}
              fontSize={12}
            >
              absence
            </Button>
          </ButtonDiv>
        </InfoDiv>
      </NoticeContent>
      <ProposalModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        <ModalContent
          eventData={eventData}
          onClose={() => {
            setIsModalOpen((prev) => !prev);
          }}
        />
      </ProposalModal>
    </CreateNoticeLayout>
  );
}

const CreateNoticeLayout = styled.div`
  width: 20rem;
  height: 8rem;
  border: 2px solid ${Color("black100")};
  border-radius: 10px;
  background-color: white;
  font-size: 14px;
`;

const NoticeTitle = styled.div`
  font-size: 11px;
  width: 18rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-top: 0.5rem;
`;

const NoticeTitleDetail = styled.div`
  display: flex;
  align-items: center;
`;

const CustomMdClose = styled(MdClose)`
  cursor: pointer;
`;

const CategoryDiv = styled.div`
  color: ${Color("blue")};
  font-weight: 600;
`;

const TitleLineDiv = styled.hr`
  width: 90%;
  margin: 0.3rem 1rem;
  border: 0.5px solid ${Color("black100")};
`;

const NoticeContent = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
`;

const ScheduleDiv = styled.div`
  width: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const MonthDiv = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const DateDiv = styled.div`
  font-size: 16px;
  font-weight: 900;
`;

const DotLineDiv = styled.hr`
  width: 80%;
  margin: 0;
  border: 0.5px dashed ${Color("black100")};
`;

const DayDiv = styled.div``;

const LineDiv = styled.div`
  width: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 10px;
  background-color: ${Color("blue")};
`;

const InfoDiv = styled.div`
  width: 14rem;
`;

const TitleDiv = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const TimeDiv = styled.div``;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
`;
