import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import { format, differenceInCalendarDays } from "date-fns";
import { DayForWeek, AllDaySchedule, CreateSchedule } from "@/features/schedule/index";
import { schedule } from "@/widgets/schedule/model/type";

interface IDayViewCalendarProps {
  selectedDate: Date;
  schedules: schedule[];
}

export function DayViewCalendar({ selectedDate, schedules }: IDayViewCalendarProps) {
  const [more, setMore] = useState<boolean>(false);
  schedules.sort(
    (a: any, b: any) =>
      differenceInCalendarDays(b.endDateTime, b.startDateTime) -
      differenceInCalendarDays(a.endDateTime, a.startDateTime)
  );
  const allDaySchedules: ReactNode[] = [];
  const partialSchedules: schedule[] = [];

  if (selectedDate.getMonth() === 4) {
    // 일정별 날짜별 일정 렌더링
    schedules.map((schedule: any) => {
      const start = format(schedule.startDateTime, "yyyy-MM-dd"); // 시작일
      const end = format(schedule.endDateTime, "yyyy-MM-dd"); // 종료일
      // 시작일과 종료일이 다른 경우
      if (start !== end) {
        // 시작일부터 종료일까지 반복
        allDaySchedules.push(
          <AllDaySchedule width={100} key={`${schedule.id}`} title={schedule.name}></AllDaySchedule>
        );
      } else {
        // 시작일과 종료일이 같은 경우
        // 종일일정인지 확인
        const isAllDay =
          schedule.startDateTime.getHours() === 0 && schedule.endDateTime.getHours() === 23;
        isAllDay
          ? allDaySchedules.push(
              <AllDaySchedule width={100} key={schedule.id} title={schedule.name} />
            )
          : partialSchedules.push(schedule as schedule);
      }
      return null;
    });
  }
  const [showCreate, setShowCreate] = useState<boolean>(false); //일정 생성 모달 보여주기 여부
  const [createDate, setCreateDate] = useState<Date>(); // 일정 생성 날짜
  const getTimeFromPosition = (y: number, height: number) => {
    const totalMinutes = (y / height) * 1440; // 1440은 하루의 총 분 수
    const roundedMinutes = Math.round(totalMinutes / 15) * 15; // 15분 단위로 반올림
    const hours = Math.floor(roundedMinutes / 60);
    const minutes = roundedMinutes % 60;
    console.log(hours, minutes);
    return { hours, minutes }; // 시간 포맷팅
  };
  return (
    <MainLayout more={more}>
      <DayDiv>
        <div>
          <Text>{format(selectedDate, "EEE")}</Text>
          <Text>{format(selectedDate, "d")}</Text>
        </div>
      </DayDiv>
      <AlldayScheduleLayout>
        <AlldayMoreDiv>
          <div>allday</div>
          {allDaySchedules && allDaySchedules.length >= 3 && (
            <div onClick={() => setMore((prev) => !prev)}>more</div>
          )}
        </AlldayMoreDiv>
        <div>
          {allDaySchedules.map((schedule, index) => (
            <div key={index}>{schedule}</div>
          ))}
        </div>
      </AlldayScheduleLayout>
      <WeekLayout>
        <IndexsLayout>
          {Array.from({ length: 24 }, (_, index) => (
            <IndexLayout key={index}>{`${index}:00`}</IndexLayout>
          ))}
        </IndexsLayout>
        <CalanderLayout>
          <DayLayout
            first={true}
            data-testid="day"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const y = event.clientY - rect.top;
              const { hours, minutes } = getTimeFromPosition(y, 984);
              console.log(`Clicked Time: ${hours}:${minutes < 10 ? "0" + minutes : minutes}`);
              setCreateDate(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate(),
                  Number(hours),
                  Number(minutes),
                  0
                )
              );
              setShowCreate((prev) => !prev);
            }}
          >
            <DayForWeek schedules={partialSchedules}></DayForWeek>
          </DayLayout>
        </CalanderLayout>
      </WeekLayout>
      {showCreate && (
        <CreateSchedule
          startDate={createDate || new Date()}
          close={() => setShowCreate(false)}
        ></CreateSchedule>
      )}
    </MainLayout>
  );
}

const MainLayout = styled.div<{ more?: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.more ? "50px max-content" : "50px 65px")};
  width: 70vw;
  height: calc(100% - 75px);
  margin: 10px auto;
`;
const DayDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  border-bottom: 1px solid #e0e0e0;
`;
const Text = styled.div`
  text-align: center;
`;
const CalanderLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 0px;
`;
const IndexsLayout = styled.div`
  border-top: 1px solid #e0e0e0;
`;
const DayLayout = styled.div<{ first?: boolean }>`
  ${(props) => (props.first ? `border-left: 1px solid #e0e0e0;` : "")}
  height: calc(41px * 24);
  border-right: 1px solid #e0e0e0;
  border-top: 1px solid #e0e0e0;
  position: relative;
`;
const IndexLayout = styled.div`
  border-bottom: 1px solid #e0e0e0;
  width: 800%;
  left: 50%;
  height: 40px;
  text-align: left;
`;
const WeekLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 7fr;
  overflow-y: auto;
  overflow-x: hidden;
`;
const AlldayScheduleLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 20px;
  border-bottom: 1px solid #e0e0e0;
  overflow: hidden;
`;
const AlldayMoreDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1.5fr;
`;
