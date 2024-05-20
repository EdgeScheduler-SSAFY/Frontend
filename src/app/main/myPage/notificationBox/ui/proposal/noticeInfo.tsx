"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import { Color } from "@/shared/lib/styles/color";
import Button from "@/shared/ui/button";
import ConversionDate from "../../model/conversionDate";
import { DetailProposal } from "@/features/schedule";
export default function NoticeInfo({ data }: any) {
  const [trigger, setTrigger] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(new Date(data.proposedStartTime) <= new Date() ? false : true);

  console.log(data);
  return (
    <AlarmInfoDiv>
      <AlarmCategoryDiv>
        <div>
          <ProfileImage src='/images/profile.webp' alt='프로필사진' width={18} height={18} />
          {data.attendeeName}
        </div>
        &nbsp;
        <AlarmTextDiv>suggested&nbsp;</AlarmTextDiv>
        <div>a new time for this event.</div>
      </AlarmCategoryDiv>
      <DividingLine />
      <AlarmButtonDiv>
        <AlarmDetailDiv>
          <TitleDiv>
            <SubjectDiv>Title&nbsp;:&nbsp;</SubjectDiv>
            <div>{data.scheduleName}</div>
          </TitleDiv>
          <DateDiv>
            <SubjectDiv>Current&nbsp;:&nbsp;</SubjectDiv>
            <ConversionDate start={data.startTime} end={data.endTime} />
          </DateDiv>
          <DateDiv>
            <SubjectDiv>Suggested&nbsp;:&nbsp;</SubjectDiv>
            <ConversionDate start={data.proposedStartTime} end={data.proposedEndTime} />
          </DateDiv>
        </AlarmDetailDiv>
        {isButtonShow && (
          <ButtonDiv>
            <Button
              color='black200'
              $bgColor='white'
              $hoverColor='yellow50'
              onClick={() => {
                setShowDetail((prev) => !prev);
              }}
              $zIndex={10}
              $borderColor='black200'
            >
              detail
            </Button>
          </ButtonDiv>
        )}
      </AlarmButtonDiv>
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
    </AlarmInfoDiv>
  );
}

const AlarmInfoDiv = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 80%;
`;

const AlarmCategoryDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  margin-right: 0.3rem;
`;

const DividingLine = styled.hr`
  margin: 0.1rem 0;
  padding: 0;
  height: 0.1rem;
  background: ${Color("black100")};
  border: none;
`;

const AlarmButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AlarmDetailDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 4rem;
`;

const AlarmTextDiv = styled.div`
  font-weight: 600;
  color: ${Color("yellow")};
`;

const TitleDiv = styled.div`
  display: flex;
`;

const DateDiv = styled.div`
  display: flex;
`;

const SubjectDiv = styled.div`
  font-weight: 600;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
