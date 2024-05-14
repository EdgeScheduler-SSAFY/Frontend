"use client";
import styled from "styled-components";
import { CalendarHeader, MonthViewCalendar, WeekViewCalendar } from "@/widgets/schedule/index";
import { useState, useEffect } from "react";
import { startOfMonth, startOfWeek, endOfMonth, endOfWeek, format } from "date-fns";
import { DayViewCalendar } from "@/widgets/schedule/index";
import { getSchedulesByDate } from "@/features/schedule/index";
import { schedule } from "@/widgets/schedule/model/type";

export default function Schedule() {
  const [view, setView] = useState("month"); //뷰 상태
  const [selectedDate, setSelectedDate] = useState(new Date()); //선택된 날짜 초기값 오늘
  const [selectDateProps, setSelectDateProps] = useState<Date>(selectedDate); //넘겨주는 날짜
  const [scheduleList, setScheduleList] = useState<schedule[]>([]); // 스케줄 목록
  const [isLoading, setIsLoading] = useState(true); //로딩 상태
  const [trigger, setTrigger] = useState(false); //

  useEffect(() => {
    setIsLoading(true); //로딩중
    let startDatetime = new Date(selectedDate);
    let endDatetime = new Date(selectedDate);
    //뷰에 따라 날짜 설정
    if (view === "month") {
      startDatetime = startOfWeek(startOfMonth(selectedDate));
      endDatetime = endOfWeek(endOfMonth(selectedDate));
    }
    if (view === "week") {
      startDatetime = startOfWeek(selectedDate);
      endDatetime = endOfWeek(selectedDate);
    }
    if (view === "day") {
      startDatetime = new Date(selectedDate);
      endDatetime = new Date(selectedDate);
      startDatetime.setHours(0, 0, 0);
      endDatetime.setHours(23, 59, 59);
    }
    //api 호출
    const fetchData = async () => {
      try {
        const response = await getSchedulesByDate({
          startDatetime: format(startDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
          endDatetime: format(endDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
        });
        if (Array.isArray(response.scheduleList)) {
          const schedules = response.scheduleList.map((schedule: schedule) => ({
            ...schedule,
            startDatetime: new Date(schedule.startDatetime),
            endDatetime: new Date(schedule.endDatetime),
          }));
          setScheduleList(schedules);
        } else {
          console.log("Received data is not an array:", response.scheduleList);
          setScheduleList([]);
        }
        setSelectDateProps(selectedDate);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setScheduleList([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [view, selectedDate, trigger]);

  return (
    <MainLayout>
      {/* 캘린더 헤더 */}
      <CalendarHeader
        selectDate={setSelectedDate}
        changeDate={setSelectedDate}
        selectedDate={selectDateProps}
        view={view}
        changeView={setView}
      ></CalendarHeader>
      {/* 뷰에따라 캘린더 렌더링 */}
      {!isLoading && view === "month" && (
        <MonthViewCalendar
          scheduleList={scheduleList}
          selectedDate={selectDateProps}
          triggerReload={() => setTrigger((prev) => !prev)}
        ></MonthViewCalendar>
      )}
      {!isLoading && view === "week" && (
        <WeekViewCalendar
          scheduleList={scheduleList}
          selectedDate={selectDateProps}
          triggerReload={() => setTrigger((prev) => !prev)}
        ></WeekViewCalendar>
      )}
      {!isLoading && view === "day" && (
        <DayViewCalendar
          scheduleList={scheduleList}
          selectedDate={selectDateProps}
          triggerReload={() => setTrigger((prev) => !prev)}
        ></DayViewCalendar>
      )}
      {isLoading && <div></div>}
    </MainLayout>
  );
}

const MainLayout = styled.div`
  height: calc(100% - 50px);
`;
