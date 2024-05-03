"use client";
import styled from "styled-components";
import { type dayT } from "@/features/schedule/model/types";
import { DayForMonth } from "@/features/schedule/index";
import { CalendarHeader, MonthViewCalendar, WeekViewCalendar } from "@/widgets/schedule/index";
import { useState } from "react";

const dummy: any = {
  date: new Date(),
  scheduleList: [
    {
      scheduleId: 1,
      organizerId: 1,
      name: "allday",
      type: "WORKING",
      color: 1,
      startDatetime: new Date("2024-05-03T00:00:00"),
      endDatetime: new Date("2024-05-03T23:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "partially",
      type: "WORKING",
      color: 1,
      startDatetime: new Date("2024-05-04T09:00:00"),
      endDatetime: new Date("2024-05-04T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "3day",
      type: "WORKING",
      color: 1,
      startDatetime: new Date("2024-05-05T09:00:00"),
      endDatetime: new Date("2024-05-15T14:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more checkkkkkkkkkkkkkkkkkkk",
      type: "WORKING",
      color: 1,
      startDatetime: new Date("2024-05-10T09:00:00"),
      endDatetime: new Date("2024-05-10T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check",
      type: "WORKING",
      color: 1,
      startDatetime: new Date("2024-05-10T09:00:00"),
      endDatetime: new Date("2024-05-10T12:00:00"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check all day",
      type: "WORKING",
      color: 1,
      startDatetime: new Date("2024-05-10T00:00:00"),
      endDatetime: new Date("2024-05-10T23:59:59"),
      isPublic: true,
    },
    {
      scheduleId: 1,
      organizerId: 1,
      name: "more check",
      type: "WORKING",
      color: 1,
      startDatetime: new Date("2024-05-10T09:00:00"),
      endDatetime: new Date("2024-05-10T12:00:00"),
      isPublic: true,
    },
  ],
};
export default function Schedule({ scheduleList = dummy.scheduleList }) {
  const [view, setView] = useState("month");
  const [selectedDate, setSelectedDate] = useState(new Date());
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
  width: 100;
  height: calc(100% - 50px);
  min-height: calc(100% - 50px);
`;
