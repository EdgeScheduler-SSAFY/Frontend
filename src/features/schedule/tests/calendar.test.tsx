import React from "react";
import { render, screen, waitFor } from "@/test-utils";
import { CalendarHeader } from "@/widgets/schedule/index";
import "@testing-library/jest-dom";
import { format } from "date-fns";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";
import * as theme from "@/shared/lib/styles/theme";
// 캘린더헤더 잘 렌더링 되는지 확인
describe("calendar Header render well", () => {
  test("render calendar header", () => {
    const mockChangeDate = jest.fn();
    const mockChangeView = jest.fn();
    const mockSelectDate = jest.fn();
    const selectedDate = new Date("2024-05-03");
    render(
      <CalendarHeader
        changeDate={mockChangeDate}
        changeView={mockChangeView}
        selectDate={mockSelectDate}
        selectedDate={selectedDate}
        view="month"
      ></CalendarHeader>
    );
    const today = screen.getByText("today");
    expect(today).toBeInTheDocument();
    const month = screen.getByText("month");
    expect(month).toBeInTheDocument();
    const meet = screen.getByText("meet");
    expect(meet).toBeInTheDocument();
    const date = screen.getByText(format(new Date("2024-05-03"), "yyyy. M"));
    expect(date).toBeInTheDocument();
  });
});
// 캘린더헤더의 네브버튼 잘 렌더링 되고 미니 켈린더가 나오는지 확인
describe("calendar Header calendarNavButton test", () => {
  test("render minicalendar week", async () => {
    const mockChangeDate = jest.fn();
    const mockChangeView = jest.fn();
    const mockSelectDate = jest.fn();
    const selectedDate = new Date("2024-05-03");
    render(
      <CalendarHeader
        changeDate={mockChangeDate}
        changeView={mockChangeView}
        selectDate={mockSelectDate}
        selectedDate={selectedDate}
        view="week"
      ></CalendarHeader>
    );
    const CalendarNavButton = screen.getByTestId("CalendarNavButton");
    const date = screen.getByTestId("CalendarNavButton-date");
    expect(CalendarNavButton).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    userEvent.click(date);
    await waitFor(() => {
      const miniCalendar = screen.getByTestId("miniCalendar");
      expect(miniCalendar).toBeInTheDocument();
    });
  });
  // 캘린더헤더의 네브버튼 잘 렌더링 되고 미니 켈린더가 나오는지 확인
  test("render minicalendar month", async () => {
    const mockChangeDate = jest.fn();
    const mockChangeView = jest.fn();
    const mockSelectDate = jest.fn();
    const selectedDate = new Date("2024-05-03");
    render(
      <CalendarHeader
        changeDate={mockChangeDate}
        changeView={mockChangeView}
        selectDate={mockSelectDate}
        selectedDate={selectedDate}
        view="week"
      ></CalendarHeader>
    );
    const CalendarNavButton = screen.getByTestId("CalendarNavButton");
    const date = screen.getByTestId("CalendarNavButton-date");
    expect(CalendarNavButton).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    userEvent.click(date);
    await waitFor(() => {
      const miniCalendar = screen.getByTestId("miniCalendar");
      expect(miniCalendar).toBeInTheDocument();
    });
    const leftButton = screen.getByTestId("CalendarNavButton-left");
    const rightButton = screen.getByTestId("CalendarNavButton-right");
    expect(leftButton).toBeInTheDocument();
    expect(rightButton).toBeInTheDocument();
  });
  // 캘린더헤더의 네브버튼 잘 렌더링 되고 미니 켈린더가 나오는지 확인
  test("render minicalendar day", async () => {
    const mockChangeDate = jest.fn();
    const mockChangeView = jest.fn();
    const mockSelectDate = jest.fn();
    const selectedDate = new Date("2024-05-03");
    render(
      <CalendarHeader
        changeDate={mockChangeDate}
        changeView={mockChangeView}
        selectDate={mockSelectDate}
        selectedDate={selectedDate}
        view="day"
      ></CalendarHeader>
    );
    const CalendarNavButton = screen.getByTestId("CalendarNavButton");
    const date = screen.getByTestId("CalendarNavButton-date");
    expect(CalendarNavButton).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    userEvent.click(date);
    await waitFor(() => {
      const miniCalendar = screen.getByTestId("miniCalendar");
      expect(miniCalendar).toBeInTheDocument();
    });
  });
});
describe("view selecetor test", () => {
  test("view selecetor test", async () => {
    const mockChangeDate = jest.fn();
    const mockChangeView = jest.fn();
    const mockSelectDate = jest.fn();
    const selectedDate = new Date("2024-05-03");
    render(
      <CalendarHeader
        changeDate={mockChangeDate}
        changeView={mockChangeView}
        selectDate={mockSelectDate}
        selectedDate={selectedDate}
        view="month"
      ></CalendarHeader>
    );
    // month가 기본값이므로 month가 렌더링 되어야 함
    const month = screen.getByText("month");
    expect(month).toBeInTheDocument();
    userEvent.click(month);
    // month를 클릭하면 week와 day가 렌더링 되어야 함
    await waitFor(() => {
      const week = screen.getByText("week");
      expect(week).toBeInTheDocument();
      const day = screen.getByText("day");
      expect(day).toBeInTheDocument();
    });
  });
});
