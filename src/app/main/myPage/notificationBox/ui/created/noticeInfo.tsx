"use client";
import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

import { Color } from "@/shared/lib/styles/color";
import ModalLayout from "@/shared/ui/modalLayout";
import ProposalModal from "@/shared/ui/proposalModal";
import { ProposalButton } from "@/shared/ui/proposalButton";
import ConversionDate from "../../model/conversionDate";
import { PostMeetingAccepted } from "@/shared/api/postMeetingAccepted";

export default function NoticeInfo({ data }: any) {
  const [buttonClicked, setButtonClicked] = useState<string>(data.receiverStatus);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(new Date(data.startTime) <= new Date() ? false : true);

  // 버튼 클릭 시 상태 변경 함수
  const onClick = (status: string, scheduleId: number) => {
    setButtonClicked(status);
    if (status === "attend") {
      PostMeetingAccepted(scheduleId);
    } else if (status === "absence") {
      setIsModalOpen(true);
    }
  };

  return (
    <AlarmInfoDiv>
      <AlarmCategoryDiv>
        <div>
          <ProfileImage src='/images/profile.webp' alt='프로필사진' width={18} height={18} />
          {data.organizerName}
        </div>
        &nbsp;
        <AlarmTextDiv>sent a request&nbsp;</AlarmTextDiv>
        <div>to attend the meeting.</div>
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
        {isButtonShow && (
          <ProposalButton
            buttonClicked={buttonClicked}
            onClickAttend={() => onClick("attend", data.scheduleId)}
            onClickAbsence={() => onClick("absence", data.scheduleId)}
          />
        )}
      </AlarmButtonDiv>
      <ModalLayout
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen((prev) => !prev);
        }}
      >
        <ProposalModal
          eventData={data}
          onClose={() => {
            setIsModalOpen((prev) => !prev);
          }}
        />
      </ModalLayout>
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
