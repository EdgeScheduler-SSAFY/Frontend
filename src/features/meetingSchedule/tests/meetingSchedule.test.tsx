import React from "react";
import { render, screen, waitFor } from "@/test-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MeetingSchedule from "@/app/meeting/meetingSchedule/page";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
describe("MeetingSchedulePage date change test", () => {
  test("render today Date", () => {
    render(<MeetingSchedule />);
    const date = new Date();
    const tmpDate =
      date.getFullYear() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getDate() +
      "(" +
      days[date.getDay()] +
      ")";
    const nowDate = screen.getByTestId("nowDate");
    expect(nowDate).toHaveTextContent(tmpDate);
  });
  test("Click next day button & Click prev day button", async () => {
    render(<MeetingSchedule />);
    const date = new Date();
    const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    const tmpDate =
      nextDate.getFullYear() +
      "." +
      (nextDate.getMonth() + 1) +
      "." +
      nextDate.getDate() +
      "(" +
      days[nextDate.getDay()] +
      ")";
    const nextDayButton = screen.getByTestId("goToNextDayButton");
    userEvent.click(nextDayButton);

    await waitFor(() => {
      const startDateElement = screen.getByTestId("startDate");
      expect(startDateElement).toHaveTextContent(tmpDate);
    });

    const prevDayButton = screen.getByTestId("goToPastDayButton");
    userEvent.click(prevDayButton);
    await waitFor(() => {
      const prevDate = new Date(date.getTime());
      const prevTmpDate =
        prevDate.getFullYear() +
        "." +
        (prevDate.getMonth() + 1) +
        "." +
        prevDate.getDate() +
        "(" +
        days[prevDate.getDay()] +
        ")";
      const startDateElement = screen.getByTestId("startDate");
      expect(startDateElement).toHaveTextContent(prevTmpDate);
    });
  }); // 다음날 버튼 눌렀을 때 날짜가 바뀌는지 확인, 다시 과거 버튼 눌렀을 때 제대로 바뀌는 지 체크
});
