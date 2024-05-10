"use client";
import { styled } from "styled-components";
import Image from "next/image";
import { people, person } from "./dummyData";
import React, { useEffect, useRef, useState } from "react";
import { Color } from "@/shared/lib/styles/color";
import { ScheduleComponentProps, isRequiredDiv } from "@/shared/lib/type";
import TimeDiv from "@/features/meetingSchedule/ui/TimeDiv";
import TimeStampDiv from "@/features/meetingSchedule/ui/TimeStampDiv";
import RecommendTimeDiv from "@/features/meetingSchedule/ui/RecommendTimeDiv";

const vip: boolean[] = [true, true, true, true, false, false];
const checkedTime: number[][] = [];
const allDayTime: boolean[] = Array(112).fill(false);
//checkedTime 이 0이면 그냥 시간, 1이면 불가능한 시간, 2이면 업무 시간
const startTime: number[] = [0, 4, 6, 8, 8, 12];
const RecommendTime: boolean[] = Array(112).fill(false);

people.forEach((person: person, index: number) => {
  let arr: number[] = []; // 사람별 되는 시간 더미데이터
  for (let i = 0; i < 112; i++) {
    if (Math.floor(i / 8) === 1) {
      arr.push(2);
    } else {
      arr.push(0);
    }
    // 여기에 추천받은 시간이면 true가 뜨도록 할 것.
  }
  checkedTime.push(arr);
}); // 더미 데이터 생성

checkedTime[0][3] = 1;
checkedTime[0][4] = 1;
checkedTime[0][5] = 1;

checkedTime[3][44] = 1;
checkedTime[3][45] = 1;
checkedTime[3][46] = 1;
//더미 데이터 생성
RecommendTime[44] = true;
RecommendTime[45] = true;
RecommendTime[46] = true;

export default function ScheduleComponent({
  setParentStartIndex,
  setParentEndIndex,
}: ScheduleComponentProps) {
  let fixedIndex = -1;
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
      timeIndex = 0;
    } else if (tmpIndex > 111) {
      timeIndex = 111;
    } else {
      timeIndex = tmpIndex;
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
    fixedIndex = Math.floor((nowPositionX - timeDivGroupleftX.current) / 16);
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
        {people.map((person: person, index: number) => {
          return (
            <PersonLayout key={index} $isRequired={vip[index]}>
              <PersonImagePart>
                <Image
                  src={person.image}
                  width="30"
                  height="30"
                  alt="image"
                  style={{ borderRadius: "50%" }}
                />
              </PersonImagePart>
              <PersonNamePart>
                <div> {person.name}</div>
                <PersonRelateTeamDiv> {person.relatedTeam}</PersonRelateTeamDiv>
              </PersonNamePart>
              <PersonTimePart>
                <div>{person.nowTime}</div>
                <div>{`${person.country}/${person.city}`}</div>
              </PersonTimePart>
            </PersonLayout>
          );
        })}
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
        {checkedTime.map((checkTimes: number[], personindex: number) => {
          return (
            <PersonTime key={personindex}>
              <TimeDivGroup>
                {checkTimes.map((checkTime: number, timeIndex: number) => {
                  return (
                    <TimeDiv
                      key={timeIndex}
                      selected={checkedTime[personindex][timeIndex]}
                      personindex={personindex}
                      timeindex={timeIndex}
                      startindex={startIndex}
                      endindex={endIndex}
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
        })}
      </TimeTableLayout>
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
  min-width: 12rem;
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
