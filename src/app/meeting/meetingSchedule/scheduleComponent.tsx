"use client";
import styled from "styled-components";
import Image from "next/image";
import { people, person } from "./dummyData";
import { useEffect, useState } from "react";
import { Color } from "@/shared/lib/styles/color";

const vip: boolean[] = [true, true, true, true, false, false];
const checkedTime: number[][] = [];
const allDayTime: boolean[] = Array(96).fill(false);
//checkedTime 이 0이면 그냥 시간, 1이면 불가능한 시간, 2이면 업무 시간
const startTime: number[] = [0, 4, 6, 8, 8, 12];
const RecommendTime: boolean[] = Array(96).fill(false);

interface vipDivProps {
  vipperson: boolean;
} //필수 사람 선택용

interface timeDivProps {
  selected: number;
  timeindex: number;
  startIndex: number;
  endIndex: number;
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함

people.forEach((person: person, index: number) => {
  let arr: number[] = []; // 사람별 되는 시간 더미데이터
  for (let i = 0; i < 96; i++) {
    if (Math.floor(i / 8) == 1) {
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

export default function ScheduleComponent() {
  let fixedIndex = -1;
  const [startIndex, setStartIndex] = useState<null | number>(null);
  const [endIndex, setEndIndex] = useState<null | number>(null);
  // 첫지점과 끝지점을 통해 scope 설정에 이용할 예정
  const handleMouseMove = (event: MouseEvent) => {
    const targetDiv = event.target as HTMLDivElement;
    let timeIndex = targetDiv.getAttribute("timeIndex");
    if (timeIndex && Number(timeIndex) >= fixedIndex) {
      setEndIndex(Number(timeIndex));
    } // 초기위치보다 오른쪽이면 endIndex변경
    if (timeIndex && Number(timeIndex) <= fixedIndex) {
      setStartIndex(Number(timeIndex));
    } // 초기위치보다 왼쪽이면 startIndex변경
  }; // 마우스 무브 이벤트 추가 테스트용
  const handleMouseUp = (evnet: MouseEvent) => {
    window.removeEventListener("mousemove", handleMouseMove);
    console.log("마우스업");
  }; // 마우스 업 이벤트(클릭 뗄시 발생) mousemove이벤트 삭제용

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log(`마우스다운`);
    const targetDiv = event.target as HTMLDivElement;
    if (targetDiv.getAttribute("timeIndex")) {
      fixedIndex = Number(targetDiv.getAttribute("timeIndex"));
      setStartIndex(fixedIndex);
      setEndIndex(fixedIndex);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp, { once: true });
    }

    // mouseUp은 cleanup 함수 성질이기에 한번만 실행하면 효력을 다하므로 once : true 추가
  }; // 마우스 클릭 중 시 발생

  useEffect(() => {
    console.log("startIndex " + startIndex + "endIndex " + endIndex);
  }, [startIndex, endIndex]);

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
            <PersonLayout key={index} vipperson={vip[index]}>
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
      <TimeTableLayout onMouseDown={(event) => handleMouseDown(event)}>
        <RecommendTimeSchedule />
        {checkedTime.map((checkTimes: number[], personIndex: number) => {
          return (
            <PersonTime key={personIndex}>
              <TimeDivGroup>
                {checkTimes.map((checkTime: number, timeIndex: number) => {
                  return (
                    <TimeDiv
                      key={timeIndex}
                      selected={checkedTime[personIndex][timeIndex]}
                      timeindex={timeIndex}
                      startIndex={startIndex ?? -1}
                      endIndex={endIndex ?? -1}
                    ></TimeDiv>
                  );
                })}
              </TimeDivGroup>
              <TimeStampGroup>
                {allDayTime.map((v: boolean, timeIndex: number) => {
                  if (timeIndex % 4 == 0) {
                    return (
                      <TimeStamp key={timeIndex}>
                        {(startTime[personIndex] +
                          Math.floor(timeIndex / 4) +
                          24) %
                          24}
                      </TimeStamp>
                    );
                  } else {
                    return <TimeStamp key={timeIndex}></TimeStamp>;
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
  width: 96rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const PersonTitleLayout = styled.div`
  min-height: 3rem;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PersonLayout = styled.div<vipDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  padding: 0 0.5rem;
  margin-bottom: 10px;
  background-color: ${({ vipperson }) =>
    vipperson ? Color("yellow100") : Color("blue50")};
`;

const RecommendTimeSchedule = styled.div`
  min-height: 3rem;
  width: 96rem;
  background-color: ${Color("black50")};
`;
const TimeDiv = styled.div<timeDivProps>`
  width: 1rem;
  height: 2rem;
  border: 0.5px solid ${Color("black100")};
  background-color: ${({ selected }) =>
    selected === 2
      ? Color("green50")
      : selected === 1
      ? Color("orange50")
      : ""};
  border-top: 1px solid ${Color("blue200")};
  border-left: ${({ timeindex, startIndex }) =>
    timeindex === startIndex ? "5px solid blue" : ""};
  border-right: ${({ timeindex, endIndex }) =>
    timeindex === endIndex ? "5px solid blue" : ""};
`;

const TimeDivGroup = styled.div`
  display: flex;
  padding-left: 3px;
`;

const TimeStampGroup = styled.div`
  display: flex;
  width: 96rem;
  height: 1rem;
  font-size: small;
`;

const TimeStamp = styled.div`
  width: 1rem;
  height: 1rem;
`;

const PersonInfo = styled.div`
  display: flex;
  /* flex-direction: column; */
  position: absolute;
  bottom: 1px;
  right: 5px;
  font-size: x-small;
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
