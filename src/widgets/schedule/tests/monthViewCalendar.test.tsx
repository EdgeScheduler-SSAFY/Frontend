import React from "react";
import { render, screen, waitFor } from "@/test-utils";
import { MonthViewCalendar } from "@/widgets/schedule/index";
import "@testing-library/jest-dom";
import { format } from "date-fns";
import userEvent from "@testing-library/user-event";
// 캘린더헤더 잘 렌더링 되는지 확인
describe("month view calendar render well", () => {
  const today = new Date();
  test("render calendar", async () => {
    render(
      <MonthViewCalendar
        selectedDate={new Date()}
        scheduleList={[
          {
            scheduleId: 1,
            organizerId: 1,
            name: "all day",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0),
            endDateTime: new Date(today.getFullYear(), today.getMonth(), 1, 23, 0, 0),
            isPublic: true,
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "partial",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(today.getFullYear(), today.getMonth(), 2, 5, 25, 0),
            endDateTime: new Date(today.getFullYear(), today.getMonth(), 2, 23, 0, 0),
            isPublic: true,
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "days",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(today.getFullYear(), today.getMonth(), 3, 1, 0, 0),
            endDateTime: new Date(today.getFullYear(), today.getMonth(), 5, 23, 0, 0),
            isPublic: true,
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "more1",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(today.getFullYear(), today.getMonth(), 6, 0, 0, 0),
            endDateTime: new Date(today.getFullYear(), today.getMonth(), 6, 23, 0, 0),
            isPublic: true,
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "more2",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(today.getFullYear(), today.getMonth(), 6, 0, 0, 0),
            endDateTime: new Date(today.getFullYear(), today.getMonth(), 6, 23, 0, 0),
            isPublic: true,
          },
          {
            scheduleId: 1,
            organizerId: 1,
            name: "more3",
            type: "WORKING",
            color: 1,
            startDateTime: new Date(today.getFullYear(), today.getMonth(), 6, 0, 0, 0),
            endDateTime: new Date(today.getFullYear(), today.getMonth(), 6, 23, 0, 0),
            isPublic: true,
          },
        ]}
      ></MonthViewCalendar>
    );
    const date = screen.getAllByText(format(new Date(), "d"));
    expect(date.length).toBeGreaterThan(0);
    const allday = screen.getByText("all day");
    expect(allday).toBeInTheDocument();
    const partialday = screen.getByText("05:25 partial");
    expect(partialday).toBeInTheDocument();
    const days = screen.getAllByText("days");
    expect(days.length).toBeGreaterThan(0);
    const more = screen.getByText("1 more");
    expect(more).toBeInTheDocument();
    userEvent.click(more);
    await waitFor(() => {
      const more = screen.getByText("more3");
      expect(more).toBeInTheDocument();
    });
    userEvent.click(date[0]);
    await waitFor(() => {
      const createSchedule = screen.getByTestId("create schedule");
      expect(createSchedule).toBeInTheDocument();
    });
    userEvent.click(allday);
    await waitFor(() => {
      const detailSchedule = screen.getByTestId("detail schedule");
      expect(detailSchedule).toBeInTheDocument();
    });
  });
});
