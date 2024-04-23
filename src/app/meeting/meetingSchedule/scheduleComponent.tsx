import styled from "styled-components";
import { Color } from "@/shared/lib/styles/color";

const people: string[] = [
  "yonghwan",
  "junggwan",
  "sehee",
  "eunpyeong",
  "johnsu",
  "hyungtaek",
];
const vip: boolean[] = [true, true, true, true, false, false];
const checkedTime: number[][] = [];
const allDayTime: boolean[] = Array(96).fill(false);
//checkedTime 이 0이면 그냥 시간, 1이면 불가능한 시간, 2이면 업무 시간
const startTime: number[] = [0, 4, 6, 8, 8, 12];

interface vipDivProps {
  vipPerson: boolean;
}

interface timeDivProps {
  selected: number;
}

people.forEach((value: string, index: number) => {
  let arr = [];
  for (let i = 0; i < 96; i++) {
    if (Math.floor(i / 8) == 1) {
      arr.push(2);
    } else {
      arr.push(0);
    }
    // 여기에 추천받은 시간이면 true가 뜨도록 할 것.
  }
  checkedTime.push(arr);
});

checkedTime[0][3] = 1;
checkedTime[0][4] = 1;
checkedTime[0][5] = 1;

checkedTime[3][44] = 1;
checkedTime[3][45] = 1;
checkedTime[3][46] = 1;
//

export default function ScheduleComponent() {
  return (
    <MainLayout>
      <PeopleLayout>
        <PersonTitleLayout>참석자</PersonTitleLayout>
        {people.map((value: string, index: number) => {
          return (
            <PersonLayout key={index} vipPerson={vip[index]}>
              {value}
            </PersonLayout>
          );
        })}
      </PeopleLayout>
      <TimeTableLayout>
        <PersonTitleTimeLayout></PersonTitleTimeLayout>
        {checkedTime.map((checkTimes: number[], index: number) => {
          return (
            <PersonTime key={index}>
              <TimeDivGroup>
                {checkTimes.map((checkTime: number, timeIndex: number) => {
                  return (
                    <TimeDiv
                      key={timeIndex}
                      selected={checkedTime[index][timeIndex]}
                    ></TimeDiv>
                  );
                })}
              </TimeDivGroup>
              <TimeStampGroup>
                {allDayTime.map((v: boolean, timeIndex: number) => {
                  if (timeIndex % 4 == 0) {
                    return (
                      <TimeStamp key={timeIndex}>
                        {(startTime[index] + Math.floor(timeIndex / 4) + 24) %
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
  min-width: 10rem;
  text-align: center;
  border: 1px solid black;
`;
const TimeTableLayout = styled.div`
  width: full;
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  overflow-x: auto;
`;

const PersonTime = styled.div`
  width: 96rem;
  height: 3rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const PersonTitleLayout = styled.div`
  min-height: 2rem;
  font-weight: bold;
`;

const PersonLayout = styled.div<vipDivProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  margin-bottom: 10px;
  background-color: ${({ vipPerson }) =>
    vipPerson ? Color("orange200") : Color("blue200")};
`;

const PersonTitleTimeLayout = styled.div`
  min-height: 2rem;
  width: 96rem;
  background-color: ${Color("blue300")};
`;
const TimeDiv = styled.div<timeDivProps>`
  width: 1rem;
  height: 2rem;
  border: 0.5px solid gray;
  background-color: ${({ selected }) =>
    selected === 2 ? Color("green300") : selected === 1 ? "red" : ""};
`;

const TimeDivGroup = styled.div`
  display: flex;
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
