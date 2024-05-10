import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import { Color } from "@/shared/lib/styles/color";
import Button from "@/shared/ui/button";
export default function AlarmLog() {
  const [buttonClicked, setButtonClicked] = useState<string>("");


  const onClick = (id: string) => {
    setButtonClicked(id);
  };

  return (
    <AlarmInfoDiv>
      <AlarmCategoryDiv>
        <div>
          <ProfileImage src='/images/profile.webp' alt='프로필사진' width={18} height={18} />
          조현수
        </div>
        <AlarmTextDiv>sent a request&nbsp;</AlarmTextDiv>
        <div>to attend the meeting.</div>
      </AlarmCategoryDiv>
      <DividingLine />
      <AlarmButtonDiv>
        <AlarmDetailDiv>
          <TitleDiv>
            <SubjectDiv>Title&nbsp;:&nbsp;</SubjectDiv>
            <div>글로벌 회의 일정 잡기</div>
          </TitleDiv>
          <DateDiv>
            <SubjectDiv>Date&nbsp;:&nbsp;</SubjectDiv>
            <div>2024.05.07(Tue) PM 03:00-04:00</div>
          </DateDiv>
        </AlarmDetailDiv>
        <ButtonDiv>
          <Button
            id='attend'
            color='black'
            $bgColor={buttonClicked === "attend" ? "black100" : "black50"}
            $hoverColor='black100'
            onClick={() => onClick("attend")}
          >
            attend
          </Button>
          <Button
            id='absence'
            color='black'
            $bgColor={buttonClicked === "absence" ? "black100" : "black50"}
            $hoverColor='black100'
            onClick={() => onClick("absence")}
          >
            absence
          </Button>
        </ButtonDiv>
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
  height: 100%;
`;

const AlarmTextDiv = styled.div`
  font-weight: 600;
  color: ${Color("blue")};
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
`;
