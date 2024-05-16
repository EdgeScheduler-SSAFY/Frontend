"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { getDay } from "date-fns";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
import Button from "@/shared/ui/button";
import { dayList, MonthList } from "@/shared/lib/data";
import ConversionTimeMini from "@/features/noticeList/model/conversionTimeMini";
import { DetailProposal } from "@/features/schedule";

export default function CreatedNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const startDate = eventData.startTime.split("T")[0];
  const [year, month, date] = startDate.split("-");
  const day = getDay(new Date(startDate));
  const [trigger, setTrigger] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  // sse 알림 닫는 함수
  const closeHandle = () => {
    onClose();
  };

  return (
    <ProposalNoticeLayout>
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.attendeeName}&nbsp;</div>
          <CategoryDiv>suggested&nbsp;</CategoryDiv>
          <div>a new time for this event.</div>
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
            <ConversionTimeMini start={eventData.proposedStartTime} end={eventData.proposedEndTime} />
          </TimeDiv>
          <ButtonDiv>
            <Button
              color='black200'
              $bgColor='white'
              $hoverColor='yellow50'
              onClick={() => {
                setShowDetail((prev) => !prev);
              }}
              width={5}
              height={2}
              fontSize={12}
              $zIndex={10}
              $borderColor='black200'
            >
              detail
            </Button>
          </ButtonDiv>
        </InfoDiv>
      </NoticeContent>
      {showDetail && (
        <DetailProposal
          triggerReload={() => setTrigger((prev) => !prev)}
          endDatetime={eventData.proposedEndTime}
          name={eventData.scheduleName}
          proposalId={eventData.proposalId}
          reason={eventData.reason}
          scheduleId={eventData.scheduleId}
          startDatetime={eventData.proposedStartTime}
          close={() => setShowDetail(false)}
        />
      )}
    </ProposalNoticeLayout>
  );
}

const ProposalNoticeLayout = styled.div`
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
  color: ${Color("yellow")};
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
  background-color: ${Color("yellow")};
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
