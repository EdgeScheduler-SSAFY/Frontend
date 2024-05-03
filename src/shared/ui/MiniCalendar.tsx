import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, format } from "date-fns";
import { LuChevronLeftSquare, LuChevronRightSquare } from "react-icons/lu";
import { Color } from "../lib/styles/color";
// 미니 캘린더 뷰 타입
type CalendarView = "day" | "week" | "none";
// 미니 캘린더 컴포넌트의 props
interface IMiniCalendarProps {
  selectedDate: Date; // 선택된 날짜
  close: () => void; // 모달 닫기 함수
  selectDate: (date: Date) => void; // 날짜 선택시 실행되는 함수
  view: CalendarView; // 현재 뷰(day, week,none)
}
// 미니 캘린더 컴포넌트
export function MiniCalendar({ selectedDate, close, selectDate, view }: IMiniCalendarProps) {
  const [selected, setSelected] = useState(selectedDate); // 선택된 날짜
  const firstDayOfMonth = startOfMonth(selected); // 선택된 달의 첫날
  const lastDayOfMonth = endOfMonth(selected); // 선택된 달의 마지막날
  const startDate = startOfWeek(firstDayOfMonth); // 선택된 달의 첫주의 첫날
  const endDate = endOfWeek(lastDayOfMonth); // 선택된 달의 마지막주의 마지막날
  const [selectedWeek, setSelectedWeek] = useState(startOfWeek(selected)); // 선택된 주
  const dates: Date[] = []; // 날짜 배열

  let currentDate = startDate; // 현재 날짜
  // 날짜 배열 채우기
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }
  // 날짜 선택시 실행되는 함수
  const handleDayClick = (date: Date) => {
    selectDate(date);
    close();
  };
  // 외부 영역 클릭 확인을위한 ref
  const ref = useRef<HTMLDivElement>(null);
  // 외부 영역 클릭시 미니 캘린더 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //렌더링
  const renderDay = () => {
    return dates.map((date, index) =>
      //  일주일 단위로 렌더링
      index % 7 === 0 ? (
        // 일주일 첫번째 날인 경우
        // 선택된 주 확인하는 로직
        // 뷰가 week일때만
        date.getDate() !== selectedWeek.getDate() ||
        date.getFullYear() !== selectedWeek.getFullYear() ||
        date.getMonth() !== selectedWeek.getMonth() ||
        view !== "week" ? (
          // 선택된 주가 아닌 경우
          <CalendarGridX key={format(date, "yyyy-MM-dd")}>
            {/* 선택된 달인지 확인 */}
            {dates.slice(index, index + 7).map((subDate) =>
              selected.getMonth() !== subDate.getMonth() ? (
                <SubMonthDay onClick={() => handleDayClick(subDate)}>
                  {format(subDate, "d")}
                </SubMonthDay>
              ) : //view가 day인 경우 선택된 날짜인지 확인
              view === "day" &&
                subDate.getDate() === selectedDate.getDate() &&
                subDate.getFullYear() === selectedDate.getFullYear() &&
                subDate.getMonth() === selectedDate.getMonth() ? (
                <SelectedDay
                  onClick={() => handleDayClick(subDate)}
                  key={format(subDate, "yyyy-MM-dd")}
                >
                  {format(subDate, "d")}
                </SelectedDay>
              ) : (
                <Day onClick={() => handleDayClick(subDate)} key={format(subDate, "yyyy-MM-dd")}>
                  {format(subDate, "d")}
                </Day>
              )
            )}
          </CalendarGridX>
        ) : (
          // 선택된 주인 경우
          <SelectedCalendarGridX key={format(date, "yyyy-MM-dd")}>
            {/* 선택된 달인지 확인 */}
            {dates.slice(index, index + 7).map((subDate) =>
              selected.getMonth() !== subDate.getMonth() ? (
                <SubMonthDay onClick={() => handleDayClick(subDate)}>
                  {format(subDate, "d")}
                </SubMonthDay>
              ) : (
                <Day onClick={() => handleDayClick(subDate)} key={format(subDate, "yyyy-MM-dd")}>
                  {format(subDate, "d")}
                </Day>
              )
            )}
          </SelectedCalendarGridX>
        )
      ) : null
    );
  };
  return (
    <CalendarLayout onClick={(e) => e.stopPropagation()} ref={ref} data-testid="miniCalendar">
      \{/* 미니캘린더 네브 */}
      <NavLayout>
        <ArrowLayout>
          <LuChevronLeftSquare
            onClick={() => setSelected(new Date(selected.getFullYear(), selected.getMonth() - 1))}
          ></LuChevronLeftSquare>
        </ArrowLayout>
        <div>{format(selected, "yyyy.M")}</div>
        <ArrowLayout>
          <LuChevronRightSquare
            onClick={() => setSelected(new Date(selected.getFullYear(), selected.getMonth() + 1))}
          ></LuChevronRightSquare>
        </ArrowLayout>
      </NavLayout>
      {/* 미니켈린더 요일 */}
      <CalendarGridX>
        <WeekDay>sun</WeekDay>
        <WeekDay>mon</WeekDay>
        <WeekDay>tue</WeekDay>
        <WeekDay>wed</WeekDay>
        <WeekDay>thu</WeekDay>
        <WeekDay>fri</WeekDay>
        <WeekDay>sat</WeekDay>
      </CalendarGridX>
      <CalendarGridY>{renderDay()}</CalendarGridY>
    </CalendarLayout>
  );
}
const CalendarLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 5fr;
  place-items: center;
  position: absolute;
  background-color: white;
  left: 84px;
  top: 115px;
  padding: 0 20px 20px 20px;
  border: solid 1px #e0e0e0;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const CalendarGridY = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
`;
const CalendarGridX = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 5px;
  text-align: center;
`;
const SelectedCalendarGridX = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${Color("blue100")};
  border-radius: 5px;
  gap: 5px;
  padding: 5px;
  text-align: center;
`;
const Day = styled.div`
  width: 35px;
  margin: 3px;
  cursor: pointer;
`;
const SelectedDay = styled.div`
  width: 35px;
  color: ${Color("blue300")};
  border: 3px solid ${Color("blue300")};
  cursor: pointer;
`;
const SubMonthDay = styled.div`
  color: #999;
  width: 35px;
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const ArrowLayout = styled.div`
  cursor: pointer;
`;
const WeekDay = styled.div`
  width: 35px;
  margin: 3px;
`;
