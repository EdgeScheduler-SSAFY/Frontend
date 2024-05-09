import React from "react";
import { render, screen, waitFor } from "@/test-utils";
import { DayViewCalendar } from "@/widgets/schedule/index";
import "@testing-library/jest-dom";
import { format, startOfWeek } from "date-fns";
import userEvent from "@testing-library/user-event";

// 캘린더 잘 렌더링 되는지 확인
describe("day view calendar render well", () => {
  const today = new Date();
  const startDate = startOfWeek(today);
  test("render calendar", async () => {
    render(
      <DayViewCalendar
        selectedDate={new Date()}
        schedules={[
          {
            scheduleId: 1,
            organizerId: 1,
            name: "all day",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              0,
              0,
              0
            ),
            endDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              23,
              59,
              59
            ),
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "all day",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              0,
              0,
              0
            ),
            endDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              23,
              59,
              59
            ),
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "all day",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              0,
              0,
              0
            ),
            endDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              23,
              59,
              59
            ),
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "partial",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate(),
              5,
              0,
              0
            ),
            endDateTime: new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              startDate.getDate() + 1,
              23,
              59,
              59
            ),
          },
        ]}
      ></DayViewCalendar>
    );
    const time = screen.getByText("12:00");
    expect(time).toBeInTheDocument();
    const date = screen.getAllByText(format(new Date(), "d"));
    expect(date.length).toBeGreaterThan(0);
    const allday = screen.getAllByText("all day");
    expect(allday.length).toBeGreaterThan(0);
    const partialday = screen.getByText("partial");
    expect(partialday).toBeInTheDocument();
    const more = screen.getByText("more");
    expect(more).toBeInTheDocument();
    const day = screen.getByTestId("day");
    expect(day).toBeInTheDocument();
    day.style.height = "984px";
    userEvent.click(day);
    await waitFor(() => {
      const detailSchedule = screen.getByTestId("create schedule");
      expect(detailSchedule).toBeInTheDocument();
    });
    userEvent.click(partialday);
    await waitFor(() => {
      const detailSchedule = screen.getByTestId("detail schedule");
      expect(detailSchedule).toBeInTheDocument();
    });
  });
});
