import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  differenceInCalendarDays,
} from "date-fns";
import styled from "styled-components";
import {
  DayForMonth,
  AllDaySchedule,
  PartialDaySchedule,
  SeparateSchedule,
} from "@/features/schedule/index";
import { Week } from "@/features/schedule/index";

// 월별 캘린더의 props
interface IMonthViewCalendarProps {
  selectedDate: Date;
  scheduleList: any;
}
// 월별 캘린더 컴포넌트
export function MonthViewCalendar({ selectedDate, scheduleList }: IMonthViewCalendarProps) {
  const firstDayOfMonth = startOfMonth(selectedDate); // 선택된 달의 첫날
  const lastDayOfMonth = endOfMonth(selectedDate); // 선택된 달의 마지막날
  const startDate = startOfWeek(firstDayOfMonth); // 선택된 달의 첫주의 첫날
  const endDate = endOfWeek(lastDayOfMonth); // 선택된 달의 마지막주의 마지막날
  let currentDate = startDate; // 현재 날짜
  // 날짜 배열 선언
  const dates: { [key: string]: React.ReactNode[] } = {};
  // 날짜 배열 채우기
  while (currentDate <= endDate) {
    dates[format(currentDate, "yyyy-MM-dd")] = [];
    currentDate = addDays(currentDate, 1);
  }
  scheduleList.sort(
    (a: any, b: any) =>
      differenceInCalendarDays(b.endDateTime, b.startDateTime) -
      differenceInCalendarDays(a.endDateTime, a.startDateTime)
  );
  // api 연결전 임시 조건 삭제 예정
  if (selectedDate.getMonth() === 4) {
    // 일정별 날짜별 일정 렌더링
    scheduleList.map((schedule: any) => {
      const start = format(schedule.startDateTime, "yyyy-MM-dd"); // 시작일
      const end = format(schedule.endDateTime, "yyyy-MM-dd"); // 종료일
      const startDate = new Date(schedule.startDateTime); // 시작일
      const endDate = new Date(schedule.endDateTime); // 종료일
      let currentDate = schedule.startDateTime; // 현재 날짜
      // 시작일과 종료일이 다른 경우
      if (start !== end) {
        // 시작일부터 종료일까지 반복
        while (currentDate <= endDate) {
          // 시작한날의 의 끝을 currentEnd로 설정
          let currentEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
          // currentEmd가 종료일보다 큰 경우 종료일로 설정
          if (currentEnd > endDate) {
            currentEnd = endDate;
          }
          // 시작일의 포맷
          const startFormat = format(currentDate, "yyyy-MM-dd");
          // 차이
          const dayDiff = differenceInCalendarDays(currentEnd, currentDate);
          // 2번째 시작부터 시작일이 배열에 없으면 추가
          if (!dates[startFormat]) {
            dates[startFormat] = [];
          }
          // 차이만큼 길이를 계산해서 추가
          dates[startFormat].push(
            <AllDaySchedule
              width={dayDiff * 125 + 100}
              key={`${schedule.id}-${startFormat}`}
              title={schedule.name}
            />
          );
          //하루 증가
          currentDate = addDays(currentDate, 1);
          // 첫날이후로 빈공간을 체우기 위한 SeparateSchedule 추가
          while (currentDate <= currentEnd) {
            // 배열에 없으면 추가
            if (!dates[format(currentDate, "yyyy-MM-dd")]) {
              dates[format(currentDate, "yyyy-MM-dd")] = [];
            }
            dates[format(currentDate, "yyyy-MM-dd")].push(
              <SeparateSchedule view="hide" title={schedule.name} width={100}></SeparateSchedule>
            );
            currentDate = addDays(currentDate, 1);
          }
        }
      } else {
        // 시작일과 종료일이 같은 경우
        // 종일일정인지 확인
        const isAllDay =
          schedule.startDateTime.getHours() === 0 && schedule.endDateTime.getHours() === 23;
        dates[format(currentDate, "yyyy-MM-dd")].push(
          isAllDay ? (
            // 종일일정인 경우
            <AllDaySchedule width={100} key={schedule.id} title={schedule.name} />
          ) : (
            // 종일일정이 아닌 경우
            <PartialDaySchedule key={schedule.id} title={schedule.name} date={currentDate} />
          )
        );
      }
      return null;
    });
  }
  return (
    <CalanderLayout>
      {/* 요일 */}
      <Week></Week>
      {/* 닐찌뱔 렌더링 */}
      {Object.keys(dates).map((date, index) =>
        index % 7 === 0 ? (
          <WeekLayout
            length={Object.keys(dates).length}
            index={index}
            height={100 / (Object.keys(dates).length / 7) + "%"}
            key={date}
          >
            {Object.keys(dates)
              .slice(index, index + 7)
              .map((subDate, subIndex) => (
                <DayForMonth
                  key={subDate}
                  // 날짜와 일정을 전달
                  day={{ date: new Date(subDate), schedules: dates[subDate] }}
                  // 테두리를 위한 props
                  index={
                    index * 7 + subIndex === 6
                      ? 1
                      : index + subIndex === Object.keys(dates).length - 1
                      ? 2
                      : 0
                  }
                ></DayForMonth>
              ))}
          </WeekLayout>
        ) : null
      )}
    </CalanderLayout>
  );
}
const CalanderLayout = styled.div<{}>`
  display: grid;
  width: 70vw;
  height: calc(100% - 150px);
  margin: 10px auto;
  grid-template-rows: 40px;
`;

const WeekLayout = styled.div<{ height: string; index: number; length: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 10vw);
  text-align: right;
  border-bottom: 1px solid #e0e0e0;
  border-left: 1px solid #e0e0e0;

  ${(props) =>
    props.index === 0
      ? `border-top: 1px solid #e0e0e0;
      border-radius: 10px 10px 0 0;`
      : ""}

  ${(props) =>
    props.index === props.length - 7
      ? `
      border-radius: 0 0 10px 10px;`
      : ""}
`;
