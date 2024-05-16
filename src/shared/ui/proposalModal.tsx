import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RiUserFollowLine, RiUserForbidLine, RiSearchLine } from "react-icons/ri";
import Image from "next/image";

import { intervalTime } from "@/shared/lib/data";
import { DeclineMeetingData, RetrieveData, MemberList } from "@/shared/lib/type";
import TextArea from "@/shared/ui/textArea";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import SelectTime from "@/shared/ui/selectTime";
import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";
import { Togle, fetchWithInterceptor } from "@/shared/index";

export default function ProposalModal({
  eventData,
  onClose,
}: {
  eventData: any;
  onClose: () => void;
}) {
  console.log(eventData);
  const runningTime = eventData.runningTime / 15;
  const [disabledIndex, setDisabledIndex] = useState<number>(0);

  const [isSuggestTime, setIsSuggestTime] = useState<boolean>(false); // 종일 여부
  const [declinedData, setDeclinedData] = useState<DeclineMeetingData>({
    status: "DECLINED",
    reason: "",
    startDatetime: eventData.startTime || eventData.updatedStartTime,
    endDatetime: eventData.endTime || eventData.updatedEndTime,
  });

  const [retreiveData, setRetreiveData] = useState<RetrieveData>({
    scheduleId: eventData.scheduleId,
    startDatetime: declinedData.startDatetime,
    endDatetime: declinedData.endDatetime,
  });

  const [availableMember, setAvailableMember] = useState<MemberList[]>([]);
  const [unAvailableMember, setunAvailableMember] = useState<MemberList[]>([]);

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
      await fetchWithInterceptor(
        `https://gateway.edgescheduler.co.kr/schedule-service/schedules/1/members/attendance`,
        {
          method: "POST",
          body: JSON.stringify(declinedData),
        }
      );
      onClose();
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  const searchAvailableAttendds = async () => {
    try {
      const res = await fetchWithInterceptor(
        `https://gateway.edgescheduler.co.kr/schedule-service/schedules/calculate-time-availability-with-proposal`,
        {
          method: "POST",
          body: JSON.stringify(retreiveData),
        }
      );
      const participantList = await res.json();
      console.log(participantList);
      setunAvailableMember(participantList.unavailableMembers);
      setAvailableMember(participantList.availableMembers);
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
        placeholder="Please enter the reason for your absence OR suggesting the another time."
        width={30}
        value={declinedData.reason}
        onChange={(e) => setDeclinedData({ ...declinedData, reason: e.target.value })}
      />
      <TimeSuggestTitle>
        Suggest another time{" "}
        <Togle
          $isOn={isSuggestTime}
          onToggle={() => {
            setIsSuggestTime((prev) => !prev);
          }}
        />
      </TimeSuggestTitle>
      {isSuggestTime && (
        <SuggestLayout>
          <TimeSuggestDiv>
            <Input
              id="startDate"
              width={5}
              type="date"
              value={declinedData.startDatetime.split("T")[0]}
              onChange={(e) => startDateHandle(e)}
            />
            <SelectTime
              options={intervalTime}
              show={false}
              width={7}
              onSelectChange={startTimeChangeHandle}
              standardIdx={0}
              disabledLastIndex={intervalTime.length - runningTime}
            ></SelectTime>
            <LineDiv>-</LineDiv>
            <EndDateDiv id="endDate">{declinedData.endDatetime.split("T")[0]}</EndDateDiv>
            <EndTimeDiv>{intervalTime[disabledIndex + runningTime].option}</EndTimeDiv>
            <SearchBtn onClick={() => searchAvailableAttendds()}>
              <RiSearchLine size={20} />
            </SearchBtn>
          </TimeSuggestDiv>
          <ParticipantDiv>
            <PossibleDiv>
              <ParticipantTitleDiv color="green">
                <RiUserFollowLine />
                &nbsp; Possible
              </ParticipantTitleDiv>
              <ParticipantListDiv>
                {availableMember &&
                  availableMember.map((member) => (
                    <EachMemberDiv key={member.memberId}>
                      <ProfileImage
                        src="/images/profile.webp"
                        alt="프로필사진"
                        width={30}
                        height={30}
                      />
                      <MemberNameLayout>
                        {member.memberName}
                        {member.isRequired && <RequiredDiv>required</RequiredDiv>}
                      </MemberNameLayout>
                    </EachMemberDiv>
                  ))}
              </ParticipantListDiv>
            </PossibleDiv>
            <ImpossibleDiv>
              <ParticipantTitleDiv color="orange">
                <RiUserForbidLine />
                &nbsp; Impossible
              </ParticipantTitleDiv>
              <ParticipantListDiv>
                {unAvailableMember &&
                  unAvailableMember.map((member) => (
                    <EachMemberDiv key={member.memberId}>
                      <ProfileImage
                        src="/images/profile.webp"
                        alt="프로필사진"
                        width={30}
                        height={30}
                      />
                      <MemberNameLayout>
                        {member.memberName}
                        {member.isRequired && <RequiredDiv>required</RequiredDiv>}
                      </MemberNameLayout>
                    </EachMemberDiv>
                  ))}
              </ParticipantListDiv>
            </ImpossibleDiv>
          </ParticipantDiv>
        </SuggestLayout>
      )}
      <ButtonDiv>
        <Button width={5} onClick={() => addMeetingDeclined(eventData.scheduleId)}>
          save
        </Button>
        <Button width={5} color="black" $bgColor="black50" $hoverColor="black100" onClick={onClose}>
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

const SuggestLayout = styled.div`
  width: 100%;
`;
const TimeSuggestTitle = styled.div`
  width: 38%;
  margin: 0.5rem 0;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 7.5rem;
  border: solid 1px ${Color("black200")};
  border-radius: 3px;
  padding: 0.5rem;
  overflow-y: scroll;
`;

const ButtonDiv = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: end;
`;

const EndDateDiv = styled.div`
  width: 5rem;
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

const EachMemberDiv = styled.div`
  font-size: 13px;
  margin: 0.25rem 0;
  border-radius: 5px;
  padding: 0.1rem 0.5rem;
  display: flex;
  align-items: center;
  background-color: ${Color("black10")};
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  margin-right: 0.3rem;
`;

const MemberNameLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const RequiredDiv = styled.div`
  color: ${Color("blue")};
`;
