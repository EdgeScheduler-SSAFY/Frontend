import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RiUserFollowLine, RiUserForbidLine } from "react-icons/ri";

import { intervalTime } from "@/shared/lib/data";
import { DeclineMeetingData } from "@/shared/lib/type";
import TextArea from "@/shared/ui/textArea";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import Select from "@/shared/ui/select";

export default function ModalContent({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const runningTime = 90 / 15; // 임시

  const [startDate, startTime] = eventData.startTime.split("T");
  const [endDate, endTime] = eventData.endTime.split("T");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [startIdx, setStartIdx] = useState<number>(0);
  const [disabledIndex, setDisabledIndex] = useState<number>(0);
  const [declinedData, setDeclinedData] = useState<DeclineMeetingData>({
    status: "DECLINED",
    reason: "",
    startDateTime: eventData.startTime,
    endDateTime: eventData.endTime,
  });

  const tmpAccessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcxNTMwNjcwNH0.Fu5ExU8lQ-wUnq2RvluuLdHEScyq7pB84VFdS4Z3w38";

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, []); // 토큰 저장

  // 시작날짜 값이 변결될 때 실행될 함수
  const startDateHandle = (value: string) => {
    const startTime = declinedData.startDateTime.split("T")[1]; // 기존 시작 시간
    setDeclinedData({
      ...declinedData,
      startDateTime: `${value}T${startTime}`,
      endDateTime: `${value}T${startTime}`,
    });
  };

  // 시작시간 값이 변경될 때 실행될 함수
  const startTimeChangeHandle = (value: number | string) => {
    const startDate = declinedData.startDateTime.split("T")[0]; // 기존 시작 날짜
    setDeclinedData({ ...declinedData, startDateTime: `${startDate}T${value}` });
    setDisabledIndex(intervalTime.findIndex((option) => option.value === value));
  };

  const addMeetingDeclined = async (scheduleId: number) => {
    try {
      await fetch(`https://gateway.edgescheduler.co.kr/schedule-service/schedules/1/members/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tmpAccessToken}`,
        },
        body: JSON.stringify(declinedData),
      });
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  return (
    <ModalContentLayout>
      <ModalTitle>Would you like to be absent from the meeting?</ModalTitle>
      <TextArea
        placeholder='Please enter the reason for your absence OR suggesting the another time.'
        width={30}
        value={declinedData.reason}
        onChange={(e) => setDeclinedData({ ...declinedData, reason: e.target.value })}
      />
      <TimeSuggestTitle>Suggest another time</TimeSuggestTitle>
      <TimeSuggestDiv>
        <Input
          id='startDate'
          width={6}
          type='date'
          value={declinedData.startDateTime.split("T")[0]}
          onChange={(e) =>
            setDeclinedData((prev) => ({ ...prev, startDateTime: e.target.value, endDateTime: e.target.value }))
          }
        />
        <Select
          options={intervalTime}
          show={false}
          width={6}
          onSelectChange={startTimeChangeHandle}
          standardIdx={0}
          disabledLastIndex={true}
        ></Select>
        <Input id='endDate' width={6} type='date' value={declinedData.endDateTime.split("T")[0]} />
        <Select
          options={intervalTime}
          show={false}
          width={6}
          standardIdx={disabledIndex + runningTime}
          disabledLastIndex={true}
          onSelectChange={startTimeChangeHandle}
        ></Select>
      </TimeSuggestDiv>
      <ParticipantDiv>
        <RiUserFollowLine />
        Participants
        <RiUserForbidLine />
        Participants
      </ParticipantDiv>
      <ButtonDiv>
        <Button>save</Button>
        <Button color='black' $bgColor='black50' $hoverColor='black100' onClick={onClose}>
          cancel
        </Button>
      </ButtonDiv>
    </ModalContentLayout>
  );
}

const ModalContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-around;
`;

const ModalTitle = styled.div``;
const TimeSuggestTitle = styled.div``;
const TimeSuggestDiv = styled.div`
  display: flex;
`;
const ParticipantDiv = styled.div``;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
`;
