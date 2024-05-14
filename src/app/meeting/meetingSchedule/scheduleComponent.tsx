"use client";
import { styled } from "styled-components";
import Image from "next/image";
import { people, person } from "./dummyData";
import React, { useEffect, useRef, useState } from "react";
import { Color } from "@/shared/lib/styles/color";
import {
  PersonalScheduleInformation,
  ScheduleComponentProps,
  userList,
  vipDidProps,
} from "@/shared/lib/type";
import TimeDiv from "@/features/meetingSchedule/ui/TimeDiv";
import TimeStampDiv from "@/features/meetingSchedule/ui/TimeStampDiv";
import RecommendTimeDiv from "@/features/meetingSchedule/ui/RecommendTimeDiv";
import useMeetStore, { MeetState } from "@/store/meetStore";

const allDayTime: boolean[] = Array(112).fill(false);

const startTime: number[] = [0, 4, 6, 8, 8, 12];
const RecommendTime: boolean[] = Array(112).fill(false);

export default function ScheduleComponent({
  setParentStartIndex,
  setParentEndIndex,
  dayCount,
  recommendedTime,
  schedulesAndAvailabilities,
}: ScheduleComponentProps) {
  let fixedIndex = -1;

  const { startDatetime, endDatetime, runningtime, memberList } = useMeetStore(
    (state: MeetState) => state
  );
  console.log(startDatetime);
  console.log("recommendedTime", recommendedTime);
  console.log("schedulesAndAvailabilities", schedulesAndAvailabilities);

  const [startIndex, setStartIndex] = useState<number>(-2);
  const [endIndex, setEndIndex] = useState<number>(-2);
  // 첫지점과 끝지점을 통해 scope 설정에 이용할 예정

  const [timeDivGroupRef, timeDivGroupleftX] = [
    useRef<HTMLDivElement | null>(null),
    useRef(0),
  ];

  const handleMouseMove = (event: MouseEvent) => {
    const nowPosition = event.clientX + timeDivGroupRef.current!.scrollLeft;
    let tmpIndex: number = Math.floor(
      (nowPosition - timeDivGroupleftX.current) / 16
    );
    let timeIndex: number;
    if (tmpIndex < 0) {
      timeIndex = dayCount * 96 + 0;
    } else if (tmpIndex > 111) {
      timeIndex = dayCount * 96 + 111;
    } else {
      timeIndex = dayCount * 96 + tmpIndex;
    } // 범위 밖으로 나가면 초기값 혹은 끝값 바꿔줌

    if (timeIndex >= fixedIndex) {
      updateEndIndex(timeIndex);
    } // 초기위치보다 오른쪽이면 endIndex변경
    if (timeIndex <= fixedIndex) {
      updateStartIndex(timeIndex);
    } // 초기위치보다 왼쪽이면 startIndex변경
  }; // 마우스 무브 이벤트 추가 테스트용
  const handleMouseUp = (evnet: MouseEvent) => {
    window.removeEventListener("mousemove", handleMouseMove);
  }; // 마우스 업 이벤트(클릭 뗄시 발생) mousemove이벤트 삭제용
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const nowPositionX = event.clientX + timeDivGroupRef.current!.scrollLeft;
    fixedIndex =
      dayCount * 96 +
      Math.floor((nowPositionX - timeDivGroupleftX.current) / 16);
    updateStartIndex(fixedIndex);
    updateEndIndex(fixedIndex);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp, { once: true });

    // mouseUp은 cleanup 함수 성질이기에 한번만 실행하면 효력을 다하므로 once : true 추가
  }; // 마우스 클릭 중 시 발생

  useEffect(() => {
    if (timeDivGroupRef.current) {
      timeDivGroupleftX.current =
        timeDivGroupRef.current.getBoundingClientRect().left;
    }
  }, [timeDivGroupRef, timeDivGroupleftX]);

  const updateStartIndex = (timeIndex: number) => {
    setStartIndex(timeIndex);
    setParentStartIndex(timeIndex);
  };
  const updateEndIndex = (timeIndex: number) => {
    setEndIndex(timeIndex);
    setParentEndIndex(timeIndex + 1);
  };
  return (
    <MainLayout>
      <PeopleLayout>
        <PersonTitleLayout>
          Participants
          <PersonInfo>
            <NecDiv>
              <NecessaryDiv></NecessaryDiv>
              required&nbsp;&nbsp;
            </NecDiv>
            <NecDiv>
              <NotNecDiv></NotNecDiv>
              optional
            </NecDiv>
          </PersonInfo>
        </PersonTitleLayout>
        {memberList.map(
          (member: { user: userList; isRequired: boolean }, index: number) => {
            return (
              <PersonLayout key={index} $isRequired={member.isRequired}>
                <PersonImagePart>
                  <Image
                    src="/images/profile.webp"
                    width="30"
                    height="30"
                    alt="image"
                    style={{ borderRadius: "50%" }}
                  />
                </PersonImagePart>
                <PersonNamePart>
                  <div> {member.user.name}</div>
                  <PersonRelateTeamDiv>
                    {" "}
                    {member.user.department}
                  </PersonRelateTeamDiv>
                </PersonNamePart>
                <PersonTimePart>
                  <div>{member.user.zoneId}</div>
                </PersonTimePart>
              </PersonLayout>
            );
          }
        )}
      </PeopleLayout>
      <TimeTableLayout
        data-testid="timeTableLayout"
        onMouseDown={(event) => handleMouseDown(event)}
        ref={timeDivGroupRef}
      >
        <RecommendTimeScheduleLayout>
          {RecommendTime.map((v: boolean, timeIndex: number) => {
            return (
              <RecommendTimeDiv
                key={timeIndex}
                timeindex={timeIndex}
                startindex={startIndex}
                endindex={endIndex}
              />
            );
          })}
        </RecommendTimeScheduleLayout>
        {schedulesAndAvailabilities.map(
          (
            personalScheduleInformation: PersonalScheduleInformation,
            personindex: number
          ) => {
            return (
              <PersonTime key={personindex}>
                <TimeDivGroup>
                  {personalScheduleInformation.availability
                    .slice(dayCount * 96, dayCount * 96 + 112)
                    .map((v: string, timeindex: number) => {
                      return (
                        <TimeDiv
                          key={timeindex}
                          $type={
                            personalScheduleInformation.availability[timeindex]
                          }
                          $personindex={personindex}
                          $timeindex={timeindex}
                          $startindex={startIndex}
                          $endindex={endIndex}
                        />
                      );
                    })}
                </TimeDivGroup>

                <TimeStampGroup>
                  {allDayTime.map((v: boolean, timeIndex: number) => {
                    if (timeIndex % 4 === 0) {
                      return (
                        <TimeStampDiv
                          key={timeIndex}
                          personindex={personindex}
                          timeindex={timeIndex}
                        >
                          {(startTime[personindex] +
                            Math.floor(timeIndex / 4) +
                            24) %
                            24}
                        </TimeStampDiv>
                      );
                    } else {
                      return (
                        <TimeStampDiv
                          key={timeIndex}
                          personindex={personindex}
                          timeindex={timeIndex}
                        ></TimeStampDiv>
                      );
                    }
                  })}
                </TimeStampGroup>
              </PersonTime>
            );
          }
        )}
      </TimeTableLayout>

      <RecommendTimeLayout>
        {recommendedTime.map((value, index) => {
          return (
            <div key={index}>{`${value.startIndex} ${value.endIndex}`}</div>
          );
        })}
      </RecommendTimeLayout>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  display: flex;
  width: full;
`;

const PeopleLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  text-align: center;
  border: 1px solid black;
  border-right: none;
  font-size: small;
`;
const TimeTableLayout = styled.div`
  width: full;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  overflow-x: auto;
  border-left: none;
`;

const PersonTime = styled.div`
  width: 112rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const PersonTitleLayout = styled.div`
  min-height: 3rem;
  max-height: 3rem;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PersonLayout = styled.div<isRequiredDiv>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 0.5rem;
  margin-bottom: 10px;
  background-color: ${({ $isRequired }) =>
    $isRequired ? Color("yellow100") : Color("blue50")};
`;

const RecommendTimeScheduleLayout = styled.div`
  display: flex;
  padding-left: 3px;
  height: 3rem;
  width: 112rem;
  background-color: ${Color("black50")};
`;

const RecommendTimeLayout = styled.div`
  display: flex;
`;

const TimeDivGroup = styled.div`
  display: flex;
  box-sizing: border-box;
  border-right: 2px solid ${Color("black200")};
  margin-left: 3px;
`;

const TimeStampGroup = styled.div`
  display: flex;
  height: 1rem;
  font-size: x-small;
  margin-left: 3px;
`;

const PersonInfo = styled.div`
  display: flex;
  /* flex-direction: column; */
  position: absolute;
  bottom: 1px;
  right: 5px;
  z-index: 1;
`;
const NecessaryDiv = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${Color("yellow100")};
  margin-right: 3px;
`;

const NotNecDiv = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${Color("blue100")};
  margin-right: 3px;
`;

const NecDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PersonImagePart = styled.div`
  width: 20%;
`;

const PersonNamePart = styled.div`
  width: 40%;
  text-align: left;
  padding-left: 3px;
`;

const PersonTimePart = styled(PersonNamePart)`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: x-small;
  position: relative;
  bottom: -5px;
`;

const PersonRelateTeamDiv = styled.div`
  font-size: small;
`;
