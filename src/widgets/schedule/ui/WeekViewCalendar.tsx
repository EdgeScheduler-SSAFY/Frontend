import React from "react";
import styled from "styled-components";
import { startOfWeek, getDate, addDays } from "date-fns";
// 주간 캘린더의 props
interface IWeekViewCalendarProps {
  selectedDate: Date;
}
// 요일배열
const WeekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
// 주간 캘린더 컴포넌트
export function WeekViewCalendar({ selectedDate }: IWeekViewCalendarProps) {
  const fistDayOfWeek = startOfWeek(selectedDate); // 선택된 주의 첫날
  console.log(getDate(fistDayOfWeek));
  return (
    <MainLayout>
      {/* 요일 */}
      <WeekDaysLayout>
        <WeekDayLayout></WeekDayLayout>
        {WeekDays.map((day, index) => (
          <WeekDayLayout key={day}>
            <div>{day}</div>
            <div>{getDate(addDays(fistDayOfWeek, index))}</div>
          </WeekDayLayout>
        ))}
      </WeekDaysLayout>
      {/* 캘린더 */}
      <CalanderLayout>
        <WeekLayout>
          <IndexsLayout>
            <IndexLayout>allday</IndexLayout>
            {Array.from({ length: 25 }, (_, index) => (
              <IndexLayout key={index}>{`${index}:00`}</IndexLayout>
            ))}
          </IndexsLayout>
          <DayLayout first={true}></DayLayout>
          <DayLayout></DayLayout>
          <DayLayout></DayLayout>
          <DayLayout></DayLayout>
          <DayLayout></DayLayout>
          <DayLayout></DayLayout>
          <DayLayout></DayLayout>
        </WeekLayout>
      </CalanderLayout>
    </MainLayout>
  );
}
const WeekDaysLayout = styled.div<{}>`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  text-align: center;
  text-shadow: 1px 1px 1px #e0e0e0;
`;
const WeekDayLayout = styled.div<{}>`
  display: grid;
  grid-template-rows: 1fr 2fr;
  text-align: center;
  text-shadow: 1px 1px 1px #e0e0e0;
`;
const MainLayout = styled.div`
  display: grid;
  grid-template-rows: 60px;
  width: 70vw;
  height: calc(100% - 75px);
  margin: 10px auto;
`;
const CalanderLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 0px;
  overflow-y: scroll;
`;
const WeekLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  /* overflow-y: scroll; */
`;

const DayLayout = styled.div<{ first?: boolean }>`
  ${(props) => (props.first ? `border-left: 1px solid #e0e0e0;` : "")}
  height: calc(40px * 24);
  border-right: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
`;
const IndexLayout = styled.div`
  border-bottom: 1px solid #e0e0e0;
  width: 800%;
  left: 50%;
  height: 40px;
  text-align: left;
`;
const IndexsLayout = styled.div`
  border-top: 1px solid #e0e0e0;
`;
