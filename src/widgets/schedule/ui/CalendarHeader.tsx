import React, { useState } from "react";
import {
  CalendarNavButton,
  TodayButton,
  MeetingFilterButton,
  ChooseViewButtons,
} from "@/features/schedule/index";
import styled from "styled-components";
import { MiniCalendar, MiniCalendarMonth } from "@/shared/index";
import { format, startOfWeek, endOfWeek } from "date-fns";
// 캘린더 헤더 컴포넌트의 props
interface ICalendarHeaderProps {
  view: string; //현재 뷰
  changeView: (view: string) => void; //뷰 변경 함수
  selectedDate: Date; //선택된 날짜
  changeDate: (date: Date) => void; //날짜 변경 함수
  selectDate: (date: Date) => void; //날짜 선택 함수
}
//캘린더 헤더 컴포넌트
export function CalendarHeader({
  view,
  changeView,
  selectedDate,
  changeDate,
  selectDate,
}: ICalendarHeaderProps) {
  const [showMiniCalendar, setShowMiniCalendar] = useState<boolean>(false); //미니 캘린더 보여주기 여부
  const [seletedView, setSelectedView] = useState(view); //선택된 뷰
  return (
    <div>
      <HeaderLayout>
        <TodayButton selectDate={selectDate}></TodayButton>
        {/* 캘린더 컨트롤 네브 뷰에따라 렌더링 */}
        <CalendarNavButton
          selectedDate={
            view === "month"
              ? format(selectedDate, "yyyy. M")
              : view === "week"
              ? format(startOfWeek(selectedDate), "yyyy. M. d") +
                "~" +
                format(endOfWeek(selectedDate), "yyyy. M. d")
              : format(selectedDate, "yyyy. M. d")
          }
          onclick={() => setShowMiniCalendar(!showMiniCalendar)}
          leftClick={() =>
            view === "month"
              ? changeDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
              : view === "week"
              ? changeDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() - 7
                  )
                )
              : changeDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() - 1
                  )
                )
          }
          rightClick={() =>
            view === "month"
              ? changeDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
              : view === "week"
              ? changeDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() + 7
                  )
                )
              : changeDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate() + 1
                  )
                )
          }
        ></CalendarNavButton>
        <div></div>
        {/* 미팅 필터 버튼 */}
        <MeetingFilterButton></MeetingFilterButton>
        {/* 뷰 선택 버튼 */}
        <ChooseViewButtons
          view={seletedView}
          changeView={(view: string) => {
            setSelectedView(view);
            changeView(view);
          }}
        ></ChooseViewButtons>
      </HeaderLayout>
      {/* 미니 캘린더 week*/}
      {showMiniCalendar && seletedView === "week" && (
        <MiniCalendar
          selectDate={selectDate}
          selectedDate={selectedDate}
          close={() => setShowMiniCalendar(false)}
          view="week"
        ></MiniCalendar>
      )}
      {/* 미니 캘린더 day*/}
      {showMiniCalendar && seletedView === "day" && (
        <MiniCalendar
          selectDate={selectDate}
          selectedDate={selectedDate}
          close={() => setShowMiniCalendar(false)}
          view="day"
        ></MiniCalendar>
      )}
      {/* 미니 캘린더 month*/}
      {showMiniCalendar && seletedView === "month" && (
        <MiniCalendarMonth
          selectDate={selectDate}
          selectedDate={selectedDate}
          close={() => setShowMiniCalendar(false)}
        ></MiniCalendarMonth>
      )}
    </div>
  );
}
const HeaderLayout = styled.div`
  display: grid;
  padding: 20px 100px;
  border-bottom: solid 1px #e0e0e0;
  grid-template-columns: 1fr 1fr 9fr 1fr 1fr 1fr;
  position: relative;
`;
