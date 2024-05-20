import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import {
  startOfWeek,
  endOfWeek,
  format,
  addDays,
  differenceInCalendarDays,
  setSeconds,
  setHours,
  setMinutes,
} from "date-fns";
import { DayForWeek, WeekAllday } from "@/features/schedule/index";
import { AllDaySchedule } from "@/features/schedule/index";
import { SeparateSchedule, CreateSchedule } from "@/features/schedule/index";
import { schedule } from "@/widgets/schedule/model/type";
import { is } from "date-fns/locale";
// 주간 캘린더의 props
interface IWeekViewCalendarProps {
  selectedDate: Date;
  scheduleList: schedule[];
  isWORKING?: boolean;
  triggerReload: () => void;
}
// 요일배열
const WeekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function WeekViewCalendar({
  selectedDate,
  scheduleList,
  isWORKING,
  triggerReload,
}: IWeekViewCalendarProps) {
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
  // 주간 캘린더 컴포넌트
  const startDate = startOfWeek(selectedDate); // 선택된 주의 첫날
  const [createDate, setCreateDate] = useState<Date>(); // 일정 생성 날짜
  const allDaySchedules: ReactNode[][] = Array(7)
    .fill(null)
    .map(() => []);
  const partialSchedules: schedule[][] = Array(7)
    .fill(null)
    .map(() => []);
  scheduleList.sort(
    (a: schedule, b: schedule) =>
      differenceInCalendarDays(b.endDatetime, b.startDatetime) -
      differenceInCalendarDays(a.endDatetime, a.startDatetime)
  );
  // 일정별 날짜별 일정 렌더링
  scheduleList.map((schedule: schedule) => {
    if (isWORKING && schedule.type !== "WORKING") return null;
    if (!isWORKING && schedule.type === "WORKING") return null;
    const start = format(schedule.startDatetime, "yyyy-MM-dd"); // 시작일
    const end = format(schedule.endDatetime, "yyyy-MM-dd"); // 종료일
    const endDate = schedule.endDatetime; // 종료일
    let currentDate = schedule.startDatetime; // 현재 날짜
    if (schedule.startDatetime < startDate || schedule.startDatetime > endOfWeek(selectedDate)) {
      return null;
    }
    // 시작일과 종료일이 다른 경우
    if (start !== end) {
      // 첫날이 partial event인지 확인
      const firstDayPartial =
        schedule.startDatetime.getHours() !== 0 || schedule.startDatetime.getMinutes() !== 0;
      if (firstDayPartial) {
        // 첫날의 partial 스케줄 추가
        partialSchedules[differenceInCalendarDays(currentDate, startDate)].push({
          ...schedule,
          endDatetime: setSeconds(setMinutes(setHours(schedule.startDatetime, 23), 59), 59),
        });
        currentDate = addDays(currentDate, 1);
      }
      // 마지막날이 partial event인지 확인
      const lastDayPartial =
        schedule.endDatetime.getHours() !== 23 || schedule.endDatetime.getMinutes() > 45;
      if (lastDayPartial && differenceInCalendarDays(endDate, startDate) < 7) {
        partialSchedules[differenceInCalendarDays(endDate, startDate)].push({
          ...schedule,
          startDatetime: setHours(setMinutes(setSeconds(schedule.startDatetime, 0), 0), 0),
        });
      }
      if (
        !(
          firstDayPartial &&
          lastDayPartial &&
          differenceInCalendarDays(schedule.endDatetime, schedule.startDatetime) === 1
        )
      ) {
        // 시작일부터 종료일까지 반복
        while (currentDate <= endDate && currentDate <= endOfWeek(selectedDate)) {
          // 시작일의 포맷
          const startFormat = format(currentDate, "yyyy-MM-dd");
          // 차이
          const dayDiff = differenceInCalendarDays(endDate, currentDate);
          const width = lastDayPartial ? 100 * (dayDiff - 1) + 90 : 100 * dayDiff + 90;
          // 차이만큼 길이를 계산해서 추가
          allDaySchedules[differenceInCalendarDays(currentDate, startDate)].push(
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
              width={width}
              key={`${schedule.scheduleId}-${startFormat}`}
              title={schedule.name}
            />
          );
          //하루 증가
          currentDate = addDays(currentDate, 1);
          // 첫날이후로 빈공간을 체우기 위한 SeparateSchedule 추가
          while (currentDate <= endDate && currentDate < endOfWeek(selectedDate)) {
            if (lastDayPartial && differenceInCalendarDays(currentDate, endDate) === 0) {
              break;
            }
            allDaySchedules[differenceInCalendarDays(currentDate, startDate)].push(
              <SeparateSchedule
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
                view="hide"
                title={schedule.name}
                width={100}
              ></SeparateSchedule>
            );
            currentDate = addDays(currentDate, 1);
          }
          return null;
        }
      }
    } else {
      // 시작일과 종료일이 같은 경우
      // 종일일정인지 확인
      const isAllDay =
        schedule.startDatetime.getHours() === 0 && schedule.endDatetime.getHours() === 23;
      isAllDay
        ? allDaySchedules[differenceInCalendarDays(currentDate, startDate)].push(
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
              width={90}
              key={schedule.scheduleId}
              title={schedule.name}
            />
          )
        : partialSchedules[differenceInCalendarDays(currentDate, startDate)].push(
            schedule as schedule
          );
    }
    return null;
  });
  const [more, setMore] = useState<boolean>(false);
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
      {/* 요일 */}
      <WeekDaysLayout>
        <WeekDayLayout></WeekDayLayout>
        {WeekDays.map((day, index) => (
          <WeekDayLayout key={day}>
            <div>{day}</div>
          </WeekDayLayout>
        ))}
      </WeekDaysLayout>
      {/* 종일 캘린더 */}
      {
        <WeekAllday
          isWORKING={isWORKING}
          more={more}
          changeMore={() => setMore((prev: boolean) => !prev)}
          date={startDate}
          schedules={allDaySchedules}
        ></WeekAllday>
      }
      {/* 시간 캘린더 */}
      <CalanderLayout>
        <WeekLayout>
          <IndexsLayout>
            {Array.from({ length: 24 }, (_, index) => (
              <IndexLayout key={index}>{`${index}:00`}</IndexLayout>
            ))}
          </IndexsLayout>
          {partialSchedules.map((scheduleList, index) => (
            <DayLayout
              data-testid={"day" + index}
              key={index} // 각 DayLayout에 고유한 key 제공
              first={index === 0} // 첫 번째 DayLayout에만 특별한 스타일 적용
              onClick={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const y = event.clientY - rect.top;
                const { hours, minutes } = getTimeFromPosition(y, 984);
                console.log(`Clicked Time: ${hours}:${minutes < 10 ? "0" + minutes : minutes}`);
                setCreateDate(
                  new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + index,
                    Number(hours),
                    Number(minutes),
                    0
                  )
                );
                handleDayClick(event);
              }}
            >
              <DayForWeek triggerReload={triggerReload} scheduleList={scheduleList}></DayForWeek>
            </DayLayout>
          ))}
        </WeekLayout>
        {showCreate && (
          <CreateSchedule
            left={modalPosition.x}
            top={modalPosition.y}
            triggerReload={triggerReload}
            isWORKING={isWORKING}
            type={isWORKING ? "WORKING" : "PERSONAL"}
            startDate={createDate || new Date()}
            close={() => setShowCreate(false)}
          ></CreateSchedule>
        )}
      </CalanderLayout>
    </MainLayout>
  );
}
const WeekDaysLayout = styled.div<{}>`
  display: grid;
  grid-template-columns: repeat(8, 1fr) 18px;
  text-align: center;
  text-shadow: 1px 1px 1px #e0e0e0;
`;
const WeekDayLayout = styled.div<{}>`
  display: grid;
  grid-template-rows: 1fr 2fr;
  text-align: center;
  text-shadow: 1px 1px 1px #e0e0e0;
`;
const MainLayout = styled.div<{ more: boolean }>`
  display: grid;
  grid-template-rows: ${(props) => (props.more ? "30px max-content" : "30px 70px")};
  width: 70vw;
  height: calc(100% - 75px);
  margin: 0 auto;
  padding: 0 0 10px 0;
`;
const CalanderLayout = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const WeekLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
`;

const DayLayout = styled.div<{ first?: boolean }>`
  width: 100%;
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
const IndexsLayout = styled.div`
  border-top: 1px solid #e0e0e0;
`;
