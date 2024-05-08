"use client";
import styled from "styled-components";
import { CalendarHeader, MonthViewCalendar, WeekViewCalendar } from "@/widgets/schedule/index";
import { useState } from "react";
import { DayViewCalendar } from "@/widgets/schedule/index";

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
      startDateTime: new Date("2024-05-05T02:00:00"),
      endDateTime: new Date("2024-05-05T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T05:25:00"),
      endDateTime: new Date("2024-05-05T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T05:25:00"),
      endDateTime: new Date("2024-05-05T07:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T01:25:00"),
      endDateTime: new Date("2024-05-05T07:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T16:25:00"),
      endDateTime: new Date("2024-05-05T23:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T19:25:00"),
      endDateTime: new Date("2024-05-05T20:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T20:25:00"),
      endDateTime: new Date("2024-05-05T23:30:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T08:25:00"),
      endDateTime: new Date("2024-05-05T23:30:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "partially",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T09:00:00"),
      endDateTime: new Date("2024-05-06T12:00:00"),
      isPublic: true,
    },

    {
      scheduleId: 1,
      organizerId: 1,
      name: "3day7",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T09:00:00"),
      endDateTime: new Date("2024-05-07T14:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "3day8",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T09:00:00"),
      endDateTime: new Date("2024-05-08T14:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "3day1",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-20T09:00:00"),
      endDateTime: new Date("2024-05-21T14:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "3day10",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-05T09:00:00"),
      endDateTime: new Date("2024-05-10T14:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check all dayyyyyyyyyyyyyyyyy",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T00:00:00"),
      endDateTime: new Date("2024-05-10T23:59:59"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more checkkkkkkkkkkkkkkkkkkk",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T00:00:00"),
      endDateTime: new Date("2024-05-10T23:59:59"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T00:00:00"),
      endDateTime: new Date("2024-05-10T23:59:59"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-10T00:00:00"),
      endDateTime: new Date("2024-05-10T23:59:59"),
      isPublic: true,
    },
  ];
  const scheduleList2 = [
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T02:00:00"),
      endDateTime: new Date("2024-05-06T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T02:00:00"),
      endDateTime: new Date("2024-05-06T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T02:00:00"),
      endDateTime: new Date("2024-05-06T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T00:00:00"),
      endDateTime: new Date("2024-05-06T23:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T00:00:00"),
      endDateTime: new Date("2024-05-06T23:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T00:00:00"),
      endDateTime: new Date("2024-05-06T23:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDateTime: new Date("2024-05-06T00:00:00"),
      endDateTime: new Date("2024-05-06T23:00:00"),
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
      {view === "week" && (
        <WeekViewCalendar
          scheduleList={scheduleList}
          selectedDate={selectedDate}
        ></WeekViewCalendar>
      )}
      {view === "day" && (
        <DayViewCalendar schedules={scheduleList2} selectedDate={selectedDate}></DayViewCalendar>
      )}
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100;
  height: calc(100% - 50px);
`;
