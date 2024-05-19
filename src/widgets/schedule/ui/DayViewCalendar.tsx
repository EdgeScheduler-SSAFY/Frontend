import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import { format, differenceInCalendarDays, setSeconds, setMinutes, setHours } from "date-fns";
import { DayForWeek, AllDaySchedule, CreateSchedule } from "@/features/schedule/index";
import { schedule } from "@/widgets/schedule/model/type";

interface IDayViewCalendarProps {
  selectedDate: Date;
  scheduleList: schedule[];
  triggerReload: () => void;
}

export function DayViewCalendar({
  selectedDate,
  scheduleList,
  triggerReload,
}: IDayViewCalendarProps) {
  const [more, setMore] = useState<boolean>(false);

  scheduleList.sort(
    (a: any, b: any) =>
      differenceInCalendarDays(b.endDatetime, b.startDatetime) -
      differenceInCalendarDays(a.endDatetime, a.startDatetime)
  );
  const allDaySchedules: ReactNode[] = [];
  const partialSchedules: schedule[] = [];

  // 일정별 날짜별 일정 렌더링
  scheduleList.map((schedule: any) => {
    if (schedule.type === "WORKING") return null;
    const start = format(schedule.startDatetime, "yyyy-MM-dd"); // 시작일
    const end = format(schedule.endDatetime, "yyyy-MM-dd"); // 종료일
    // 시작일과 종료일이 다른 경우
    if (start !== end) {
      const firstDayPartial =
        schedule.startDatetime.getHours() !== 0 || schedule.startDatetime.getMinutes() !== 0;
      if (firstDayPartial && start === format(selectedDate, "yyyy-MM-dd")) {
        // 첫날의 partial 스케줄 추가
        partialSchedules.push({
          ...schedule,
          endDatetime: new Date(schedule.endDatetime.setHours(23, 59, 59, 999)),
        });
        return;
      }
      allDaySchedules.push(
        <AllDaySchedule
          triggerReload={triggerReload}
          color={
            schedule.color === 0
              ? "blue"
              : schedule.color === 1
              ? "green"
              : schedule.color === 2
              ? "orange"
              : schedule.color === 3
              ? "yellow"
              : "black50" || "blue"
          }
          endDatetime={format(schedule.startDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
          startDatetime={format(schedule.endDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
          scheduleId={schedule.scheduleId}
          width={100}
          key={`${schedule.id}`}
          title={schedule.name}
        ></AllDaySchedule>
      );
    } else {
      // 시작일과 종료일이 같은 경우
      // 종일일정인지 확인
      const isAllDay =
        schedule.startDatetime.getHours() === 0 && schedule.endDatetime.getHours() === 23;
      isAllDay
        ? allDaySchedules.push(
            <AllDaySchedule
              triggerReload={triggerReload}
              color={
                schedule.color === 0
                  ? "blue"
                  : schedule.color === 1
                  ? "green"
                  : schedule.color === 2
                  ? "orange"
                  : schedule.color === 3
                  ? "yellow"
                  : "black50" || "blue"
              }
              endDatetime={format(schedule.endDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
              startDatetime={format(schedule.startDatetime, "yyyy-MM-dd'T'HH:mm:ss")}
              scheduleId={schedule.scheduleId}
              width={100}
              key={schedule.id}
              title={schedule.name}
            />
          )
        : partialSchedules.push(schedule as schedule);
    }
    return null;
  });

  const [showCreate, setShowCreate] = useState<boolean>(false); //일정 생성 모달 보여주기 여부
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 모달 위치
  const handleDayClick = (event: React.MouseEvent) => {
    //클릭한곳의 위치를 바탕으로 모달 위치 정함
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const positionY = event.clientY;
    const positionX = event.clientX;
    const top = positionY > viewportHeight / 2 ? positionY - 400 : positionY;
    const left = positionX > viewportWidth / 2 ? positionX - 450 : positionX;

    setModalPosition({ x: left, y: top });
    setShowCreate((prev) => !prev);
  };
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
              handleDayClick(event);
            }}
          >
            <DayForWeek triggerReload={triggerReload} scheduleList={partialSchedules}></DayForWeek>
          </DayLayout>
        </CalanderLayout>
      </WeekLayout>
      {showCreate && (
        <CreateSchedule
          left={modalPosition.x}
          top={modalPosition.y}
          type="PERSONAL"
          startDate={createDate || new Date()}
          close={() => setShowCreate(false)}
          triggerReload={triggerReload}
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
  margin: 0 auto;
  padding: 0 0 10px 0;
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
  grid-template-rows: 40px;
`;
