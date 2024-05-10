import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { LuChevronLeftSquare, LuChevronRightSquare } from "react-icons/lu";
// 미니 캘린더 월 타입 props
interface IMonthViewCalendarProps {
  selectedDate: Date;
  close: () => void;
  selectDate: (date: Date) => void;
}
// 미니 캘린더 월 타입
export function MiniCalendarMonth({ selectedDate, close, selectDate }: IMonthViewCalendarProps) {
  const [selectedYear, setSelectedYear] = useState(selectedDate); // 선택된 년도
  // 월 클릭시
  const handleClick = (month: number) => {
    setSelectedYear(new Date(selectedYear.getFullYear(), month - 1));
    selectDate(new Date(selectedYear.getFullYear(), month - 1));
    close();
  };
  // 외부영역 클릭 확인을위한 ref
  const ref = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 미니 캘린더 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <CalendarLayout data-testid="miniCalendar" onClick={(e) => e.stopPropagation()} ref={ref}>
      {/* 미니캘린더 컨트롤 */}
      <NavLayout>
        <LuChevronLeftSquare
          onClick={() =>
            setSelectedYear(new Date(selectedYear.getFullYear(), selectedYear.getMonth() - 12))
          }
        ></LuChevronLeftSquare>
        <div>{format(selectedYear, "yyyy")}</div>
        <LuChevronRightSquare
          onClick={() =>
            setSelectedYear(new Date(selectedYear.getFullYear(), selectedYear.getMonth() + 12))
          }
        ></LuChevronRightSquare>
      </NavLayout>
      {/* 월 생성 */}
      <CalendarGrid>
        {Array.from({ length: 12 }, (_, i) => (
          <Month onClick={() => handleClick(i + 1)} key={i + 1}>
            {i + 1}
          </Month>
        ))}
      </CalendarGrid>
    </CalendarLayout>
  );
}
const CalendarLayout = styled.div`
  height: 280px;
  display: grid;
  grid-template-rows: 1fr 6fr;
  place-items: center;
  position: absolute;
  background-color: white;
  left: 80px;
  top: 115px;
  padding: 0 20px 20px 20px;
  border: solid 1px #e0e0e0;
  border-top: none;
  border-radius: 0 0 5px 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  padding: 20px 0;
`;

const Month = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
`;
const NavLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;
