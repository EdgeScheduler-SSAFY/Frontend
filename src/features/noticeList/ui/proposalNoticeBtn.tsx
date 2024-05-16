"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { getDay } from "date-fns";

import { Color } from "@/shared/lib/styles/color";
import Button from "@/shared/ui/button";
import { dayList, MonthList } from "@/shared/lib/data";
import { PatchNoticeRead } from "../api/patchNoticeRead";
import ConversionTimeMini from "../model/conversionTimeMini";
import useNoticeStore from "@/store/noticeStore";
import { DetailProposal } from "@/features/schedule";

export default function ProposalNoticeBtn({ data }: { data: any }) {
  const noticeCount = useNoticeStore((state) => state.noticeCount);
  const setNoticeCount = useNoticeStore((state) => state.setNoticeCount);
  const startDate = data.proposedStartTime.split("T")[0];
  const [year, month, date] = startDate.split("-");
  const day = getDay(new Date(startDate));
  const [isRead, setIsRead] = useState<boolean>(data.isRead);
  const [trigger, setTrigger] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const isReadHandle = async (isRead: boolean, id: string) => {
    if (!isRead) {
      try {
        await PatchNoticeRead(id);
        setIsRead(true);
        setNoticeCount(noticeCount - 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ProposalNoticeLayout
      $isRead={isRead}
      onClick={() => {
        isReadHandle(isRead, data.id);
      }}
    >
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{data.attendeeName}&nbsp;</div>
          <CategoryDiv>suggested&nbsp;</CategoryDiv>
          <div>a new time for this event.</div>
        </NoticeTitleDetail>
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
          <TitleDiv>{data.scheduleName}</TitleDiv>
          <TimeDiv>
            <ConversionTimeMini start={data.proposedStartTime} end={data.proposedEndTime} />
          </TimeDiv>
          <ButtonDiv>
            <Button
              color='black100'
              $bgColor='white'
              $hoverColor='yellow50'
              onClick={() => {
                setShowDetail((prev) => !prev);
              }}
              width={3.5}
              height={1.8}
              fontSize={10}
              $zIndex={10}
              $borderColor='black100'
            >
              detail
            </Button>
          </ButtonDiv>
        </InfoDiv>
      </NoticeContent>
      {showDetail && (
        <DetailProposal
          triggerReload={() => setTrigger((prev) => !prev)}
          endDatetime={data.proposedEndTime}
          name={data.scheduleName}
          proposalId={data.proposalId}
          reason={data.reason}
          scheduleId={data.scheduleId}
          startDatetime={data.proposedStartTime}
          close={() => setShowDetail(false)}
        />
      )}
    </ProposalNoticeLayout>
  );
}

const ProposalNoticeLayout = styled.div<{ $isRead: boolean }>`
  width: 17rem;
  height: 7rem;
  border: 2px solid ${Color("black100")};
  border-radius: 10px;
  background-color: ${(props) => (props.$isRead ? Color("black50") : "white")};
  font-size: 13px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${Color("black50")};
  }
`;

const NoticeTitle = styled.div`
  font-size: 11px;
  width: 17rem;
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
  height: 4.5rem;
`;

const ScheduleDiv = styled.div`
  width: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const MonthDiv = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const DateDiv = styled.div`
  font-size: 15px;
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
  height: 100%;
`;

const TitleDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
const TimeDiv = styled.div`
  font-size: 12px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
`;
