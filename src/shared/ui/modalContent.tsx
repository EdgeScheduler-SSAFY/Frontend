import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RiUserFollowLine, RiUserForbidLine, RiSearchLine } from "react-icons/ri";

import { intervalTime } from "@/shared/lib/data";
import { DeclineMeetingData, RetrieveData } from "@/shared/lib/type";
import TextArea from "@/shared/ui/textArea";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import Select from "@/shared/ui/select";
import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";

export default function ModalContent({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const runningTime = 60 / 15; // 임시
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [disabledIndex, setDisabledIndex] = useState<number>(0);
  const [declinedData, setDeclinedData] = useState<DeclineMeetingData>({
    status: "DECLINED",
    reason: "",
    startDatetime: eventData.startTime,
    endDatetime: eventData.endTime,
  });

  const [retreiveData, setRetreiveData] = useState<RetrieveData>({
    retrieverId: 5,
    scheduleId: eventData.scheduleId,
    startDatetime: declinedData.startDatetime,
    endDatetime: declinedData.endDatetime,
  }); // 임시

  const tmpAccessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcxNTU3NTUwM30.q_v6N2EIEmB0NVnYhnsAti3SQGcs_dfDOpPhhGsx5ZE";

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, []); // 토큰 저장

  // 시작날짜 값이 변결될 때 실행될 함수
  const startDateHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startTime = declinedData.startDatetime.split("T")[1]; // 기존 시작 시간
    const selectedIndex = intervalTime.findIndex((option) => option.value === startTime);
    setDeclinedData({
      ...declinedData,
      startDatetime: `${e.target.value}T${startTime}`,
      endDatetime: `${e.target.value}T${intervalTime[selectedIndex + runningTime].value}`,
    });
    setRetreiveData({
      ...retreiveData,
      startDatetime: `${e.target.value}T${startTime}`,
      endDatetime: `${e.target.value}T${intervalTime[selectedIndex + runningTime].value}`,
    });
  };

  // 시작시간 값이 변경될 때 실행될 함수
  const startTimeChangeHandle = (value: number | string) => {
    const startDate = declinedData.startDatetime.split("T")[0]; // 기존 시작 날짜
    const selectedIndex = intervalTime.findIndex((option) => option.value === value);
    // setDisabledIndex 함수에 이전 상태값을 기반으로 업데이트하는 콜백 함수 전달
    setDisabledIndex(() => {
      setDeclinedData({
        ...declinedData,
        startDatetime: `${startDate}T${value}`,
        // 종료 시간 계산
        endDatetime: `${startDate}T${intervalTime[selectedIndex + runningTime].value}`,
      });
      setRetreiveData({
        ...retreiveData,
        startDatetime: `${startDate}T${value}`,
        // 종료 시간 계산
        endDatetime: `${startDate}T${intervalTime[selectedIndex + runningTime].value}`,
      });
      return selectedIndex;
    });
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
      onClose();
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  const searchAvailableAttendds = async (scheduleId: number) => {
    try {
      const res = await fetch(
        `https://gateway.edgescheduler.co.kr/schedule-service/schedules/calculate-time-availability-with-proposal`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tmpAccessToken}`,
          },
          body: JSON.stringify(retreiveData),
        });
      console.log(res.json());
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  useEffect(() => {
    console.log(retreiveData);
  }, [retreiveData]);

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
          value={declinedData.startDatetime.split("T")[0]}
          onChange={(e) => startDateHandle(e)}
        />
        <Select
          options={intervalTime}
          show={false}
          width={6}
          onSelectChange={startTimeChangeHandle}
          standardIdx={0}
          disabledLastIndex={intervalTime.length - runningTime}
        ></Select>
        <LineDiv>-</LineDiv>
        <EndDateDiv id='endDate'>{declinedData.endDatetime.split("T")[0]}</EndDateDiv>
        <EndTimeDiv>{intervalTime[disabledIndex + runningTime].option}</EndTimeDiv>
        <SearchBtn onClick={() => searchAvailableAttendds(eventData.scheduleId)}>
          <RiSearchLine size={20} />
        </SearchBtn>
      </TimeSuggestDiv>
      <ParticipantDiv>
        <PossibleDiv>
          <ParticipantTitleDiv color='green'>
            <RiUserFollowLine />
            &nbsp; Possible
          </ParticipantTitleDiv>
          <ParticipantListDiv>
            <div>Participants</div>
          </ParticipantListDiv>
        </PossibleDiv>
        <ImpossibleDiv>
          <ParticipantTitleDiv color='orange'>
            <RiUserForbidLine />
            &nbsp; Impossible
          </ParticipantTitleDiv>
          <ParticipantListDiv>
            <div>Participants</div>
          </ParticipantListDiv>
        </ImpossibleDiv>
      </ParticipantDiv>
      <ButtonDiv>
        <Button width={5} onClick={() => addMeetingDeclined(eventData.scheduleId)}>
          save
        </Button>
        <Button width={5} color='black' $bgColor='black50' $hoverColor='black100' onClick={onClose}>
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
  padding: 0.5rem 0.7rem;
`;

const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
const TimeSuggestTitle = styled.div`
  margin: 0.5rem 0;
  font-size: 14px;
`;
const TimeSuggestDiv = styled.div`
  width: 98%;
  display: flex;
  justify-content: space-between;
`;

const LineDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ParticipantDiv = styled.div`
  width: 100%;
  font-size: 14px;
  display: flex;
`;

const ParticipantTitleDiv = styled.div<{ color: ColorName }>`
  margin: 0.5rem 0;
  font-size: 14px;
  color: ${(props) => Color(props.color)};
`;

const PossibleDiv = styled.div`
  width: 45%;
  margin-right: 1rem;
`;

const ImpossibleDiv = styled.div`
  width: 45%;
`;
const ParticipantListDiv = styled.div`
  height: 7rem;
  border: solid 1px ${Color("black200")};
`;

const ButtonDiv = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: end;
`;

const EndDateDiv = styled.div`
  width: 6rem;
  height: 2rem;
  border: solid 1px ${Color("black200")};
  padding: 0.1rem 0.7rem;
  border-radius: 3px;
  font-size: 14px;
  display: flex;
  align-items: center;
  font-weight: 400;
  letter-spacing: 0.5px;
`;
const EndTimeDiv = styled.div`
  width: 4.5rem;
  height: 2rem;
  border: solid 1px ${Color("black200")};
  border-radius: 3px;
  padding: 0.1rem 0.7rem;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const SearchBtn = styled.button`
  background: none;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: ${Color("black")};
  align-items: center;
  display: flex;
  transition: all 0.2s ease-in;
  background-color: ${Color("black50")};
  &:hover {
    background-color: ${Color("blue100")};
  }
`;
