import React from "react";
import styled from "styled-components";
import { renderSchedules } from "@/features/schedule/index";
import { addDays } from "date-fns";

interface IWeekAlldayProps {
  date: Date;
  schedules: React.ReactNode[][] | null;
  more: boolean;
  changeMore: () => void;
}

export function WeekAllday({ date, schedules, changeMore, more }: IWeekAlldayProps) {
  console.log(schedules);
  return (
    <MainLayout>
      <AlldayMoreDiv>
        <div>allday</div>
        {schedules && schedules.some((schedule) => schedule.length >= 3) && (
          <div onClick={changeMore}>more</div>
        )}
      </AlldayMoreDiv>
      {Array.from({ length: 7 }, (_, index) => (
        <div key={index}>
          <TextDiv key={index}>{addDays(date, index).getDate()}</TextDiv>
          {schedules && renderSchedules({ date, schedules: schedules[index] }, false)}
        </div>
      ))}
    </MainLayout>
  );
}
const MainLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr) 18px;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
`;
const TextDiv = styled.div`
  text-align: center;
`;
const AlldayMoreDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1.5fr;
`;
