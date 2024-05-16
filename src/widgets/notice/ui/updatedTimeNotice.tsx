"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { getDay } from "date-fns";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
import { ProposalButton } from "@/shared/ui/proposalButton";
import ModalLayout from "@/shared/ui/modalLayout";
import { dayList, MonthList } from "@/shared/lib/data";
import ProposalModal from "@/shared/ui/proposalModal";
import { PostMeetingAccepted } from "@/shared/api/postMeetingAccepted";
import ConversionTimeMini from "@/features/noticeList/model/conversionTimeMini";

export default function UpdatedTimeNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const startDate = eventData.updatedStartTime.split("T")[0];
  const [year, month, date] = startDate.split("-");
  const day = getDay(new Date(startDate));
  const [buttonClicked, setButtonClicked] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // sse 알림 닫는 함수
  const closeHandle = () => {
    onClose();
  };

  const onClick = (status: string, scheduleId: number) => {
    if (status === "attend") {
      setButtonClicked("ACCEPTED");
      PostMeetingAccepted(scheduleId);
    } else if (status === "absence") {
      setIsModalOpen(true);
    }
  };

  return (
    <UpdatedTimeNoticeLayout>
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.organizerName}&nbsp;</div>
          <CategoryDiv>updated&nbsp;</CategoryDiv>
          <div>the meeting schedule.</div>
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
            <ConversionTimeMini start={eventData.updatedStartTime} end={eventData.updatedEndTime} />
          </TimeDiv>
          <ProposalButton
            buttonClicked={buttonClicked}
            onClickAttend={() => onClick("attend", eventData.scheduleId)}
            onClickAbsence={() => onClick("absence", eventData.scheduleId)}
            width={5}
            height={2}
            fontSize={12}
          />
        </InfoDiv>
      </NoticeContent>
      <ModalLayout
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        <ProposalModal
          eventData={eventData}
          onClose={() => {
            setIsModalOpen((prev) => !prev);
          }}
        />
      </ModalLayout>
    </UpdatedTimeNoticeLayout>
  );
}

const UpdatedTimeNoticeLayout = styled.div`
  width: 20rem;
  height: 8rem;
  border: 2px solid ${Color("black100")};
  border-radius: 10px;
  background-color: white;
  font-size: 14px;
  margin-bottom: 0.5rem;
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
