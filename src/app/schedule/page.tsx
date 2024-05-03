"use client";
import styled from "styled-components";
import { CalendarHeader, MonthViewCalendar, WeekViewCalendar } from "@/widgets/schedule/index";
import { useState } from "react";

export default function Schedule() {
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scheduleList = [
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-03T00:00:00Z"),
      endDateTime: new Date("2024-05-03T23:00:00Z"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "partially",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-04T09:00:00Z"),
      endDateTime: new Date("2024-05-04T12:00:00Z"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "3day",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T09:00:00Z"),
      endDateTime: new Date("2024-05-15T14:00:00Z"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more checkkkkkkkkkkkkkkkkkkk",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T09:00:00Z"),
      endDateTime: new Date("2024-05-10T12:00:00Z"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T09:00:00Z"),
      endDateTime: new Date("2024-05-10T12:00:00Z"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check all day",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T00:00:00Z"),
      endDateTime: new Date("2024-05-10T23:59:59Z"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T09:00:00Z"),
      endDateTime: new Date("2024-05-10T12:00:00Z"),
      isPublic: true,
    },
  ];
  return (
    <MainLayout>
      <CalendarHeader
        selectDate={setSelectedDate}
        changeDate={setSelectedDate}
        selectedDate={selectedDate}
        view={view}
        changeView={setView}
      ></CalendarHeader>
      {view === "month" && (
        <MonthViewCalendar
          scheduleList={scheduleList}
          selectedDate={selectedDate}
        ></MonthViewCalendar>
      )}
      {view === "week" && <WeekViewCalendar selectedDate={selectedDate}></WeekViewCalendar>}
    </MainLayout>
  );
}

const MainLayout = styled.div`
  height: calc(100% - 50px);
  min-height: calc(100% - 50px);
`;
