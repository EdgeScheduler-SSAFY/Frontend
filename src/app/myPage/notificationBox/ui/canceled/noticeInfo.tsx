import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { Color } from "@/shared/lib/styles/color";
import ConversionDate from "@/app/myPage/notificationBox/model/conversionDate";

export default function NoticeInfo({ data }: any) {
  const isMeetingDeleted = data.type === "MEETING_DELETED";
  return (
    <AlarmInfoDiv>
      <AlarmCategoryDiv>
        <div>
          <ProfileImage src='/images/profile.webp' alt='프로필사진' width={18} height={18} />
          {data.organizerName}
        </div>
        &nbsp;
        <AlarmTextDiv>{isMeetingDeleted ? "canceled" : "updated"}&nbsp;</AlarmTextDiv>
        <div>{isMeetingDeleted ? "this event." : "an information to this event."}&nbsp;</div>
        {isMeetingDeleted ? (
          ""
        ) : (
          <AlarmTextDiv>
            (
            {data.updatedFields.map((field: string, index: number) => {
              return index === data.updatedFields.length - 1 ? field : `${field}, `;
            })}
            )
          </AlarmTextDiv>
        )}
      </AlarmCategoryDiv>
      <DividingLine />
      <AlarmButtonDiv>
        <AlarmDetailDiv>
          <TitleDiv>
            <SubjectDiv>Title&nbsp;:&nbsp;</SubjectDiv>
            <div>{data.scheduleName}</div>
          </TitleDiv>
          <DateDiv>
            <SubjectDiv>Date&nbsp;:&nbsp;</SubjectDiv>
            <ConversionDate start={data.startTime} end={data.endTime} />
          </DateDiv>
        </AlarmDetailDiv>
      </AlarmButtonDiv>
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
  height: 3.5rem;
`;

const AlarmTextDiv = styled.div`
  font-weight: 600;
  color: ${Color("black100")};
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
