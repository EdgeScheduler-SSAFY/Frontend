import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";
import ConversionDate from "@/app/myPage/notificationBox/model/conversionDate";

export default function NoticeInfo({ data }: any) {
  const responseColor: ColorName = data.response === "ACCEPTED" ? "green" : "orange";

  return (
    <AlarmInfoDiv>
      <AlarmCategoryDiv>
        <div>
          <ProfileImage src='/images/profile.webp' alt='프로필사진' width={18} height={18} />
          {data.attendeeName}
        </div>
        &nbsp;
        <AlarmTextDiv $responseColor={responseColor}>{data.response.toLowerCase()}&nbsp;</AlarmTextDiv>
        <div>an invitation to this event.</div>
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

const AlarmTextDiv = styled.div<{ $responseColor: ColorName }>`
  font-weight: 600;
  color: ${(props) => Color(props.$responseColor)};
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
