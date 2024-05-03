import React from "react";
import styled from "styled-components";
import { type dayT } from "@/features/schedule/index";

interface IDayForWeekProps {
  day: dayT;
  index: number;
}
export function DayForWeek({ day, index }: IDayForWeekProps) {
  const renderSchedules = () => {
    if (!day.schedules) {
      return null;
    }

    if (Array.isArray(day.schedules) && day.schedules.length < 4) {
      return day.schedules.map((schedule, index) => <div key={index}>{schedule}</div>);
    }

    if (Array.isArray(day.schedules) && day.schedules.length > 4) {
      return (
        <ChildrenLayout>
          {day.schedules.slice(0, 2).map((schedule, index) => (
            <div key={index}>{schedule}</div>
          ))}
        </ChildrenLayout>
      );
    }

    return day.schedules;
  };
  return (
    <div>
      <DayBox index={index}>
        <Day>{day.date.getDate()}</Day>
        {renderSchedules()}
      </DayBox>
    </div>
  );
}
const DayBox = styled.div<{ index: number }>`
  border-right: 1px solid #e0e0e0;
  ${(props) => (props.index === 1 ? `border-radius: 0 10px 0 0; ` : "")}
  ${(props) => (props.index === 2 ? `border-radius: 0 0 10px 0 ; ` : "")}
  height: 100%;
`;

const Day = styled.div`
  text-align: center;
  padding-right: 10px;
  padding-top: 5px;
`;
const ChildrenLayout = styled.div`
  display: grid;
  width: 80%;
  height: 75%;
  grid-template-rows: 1fr 1fr 1fr;
`;
