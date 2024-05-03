import React from "react";
import styled from "styled-components";
import { type dayT } from "@/features/schedule/index";
import { MoreSchedule } from "@/features/schedule/index";
// 한달의 날짜별 일정 컴포넌트의 props
interface IDayForMonthProps {
  day: dayT;
  index: number;
}

export function DayForMonth({ day, index }: IDayForMonthProps) {
  // 날짜별 일정 렌더링
  const renderSchedules = () => {
    // 일정이 없을 경우
    if (!day.schedules) {
      return null;
    }
    // 일정이 3개 이하일 경우
    if (day.schedules && day.schedules.length < 4) {
      return (
        <ChildrenLayout>
          {day.schedules.map((schedule, index) => (
            <div key={index}>{schedule}</div>
          ))}
        </ChildrenLayout>
      );
    }
    // 일정이 3개 이상일 경우
    if (day.schedules && day.schedules.length > 3) {
      return (
        <ChildrenLayout>
          {day.schedules.slice(0, 2).map((schedule, index) => (
            <div key={index}>{schedule}</div>
          ))}
          <MoreSchedule
            date={day.date}
            count={day.schedules.length - 2}
            schdules={day.schedules}
          ></MoreSchedule>
        </ChildrenLayout>
      );
    }
    // 일정 렌더링
    return day.schedules;
  };
  // 날짜별 일정 렌더링
  return (
    <DayBox index={index}>
      <Day>{day.date.getDate()}</Day>
      {renderSchedules()}
    </DayBox>
  );
}
const DayBox = styled.div<{ index: number }>`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 2fr;
  border-right: 1px solid #e0e0e0;
  ${(props) => (props.index === 1 ? `border-radius: 0 10px 0 0; ` : "")}
  ${(props) => (props.index === 2 ? `border-radius: 0 0 10px 0 ; ` : "")}
`;

const Day = styled.div`
  text-align: center;
  padding-right: 10px;
`;

const ChildrenLayout = styled.div`
  display: grid;
  width: 80%;
  grid-template-rows: 1fr 1fr 1fr;
`;
