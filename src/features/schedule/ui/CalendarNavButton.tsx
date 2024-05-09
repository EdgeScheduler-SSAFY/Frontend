import React from "react";
import { LuChevronLeftSquare, LuChevronRightSquare } from "react-icons/lu";
import styled from "styled-components";

interface ICalendarNavButtonProps {
  leftClick: () => void; // 왼쪽 버튼 클릭 이벤트
  rightClick: () => void; // 오른쪽 버튼 클릭 이벤트
  onclick: () => void; // 날짜 클릭 이벤트
  selectedDate: String; // 선택된 날짜
}
// 날짜 컨트롤 nav 컴포넌트
export function CalendarNavButton({
  leftClick,
  rightClick,
  onclick,
  selectedDate,
}: ICalendarNavButtonProps) {
  return (
    <>
      {/* 왼쪽 버튼 오른쪽 버튼 날짜 */}
      <NavContainer data-testid="CalendarNavButton">
        <Button>
          <LuChevronLeftSquare
            data-testid="CalendarNavButton-left"
            size={20}
            onClick={leftClick}
          ></LuChevronLeftSquare>
        </Button>
        <Button>
          <LuChevronRightSquare
            data-testid="CalendarNavButton-right"
            size={20}
            onClick={rightClick}
          ></LuChevronRightSquare>
        </Button>
        <DateLayout data-testid="CalendarNavButton-date" onClick={onclick}>
          {selectedDate}
        </DateLayout>
      </NavContainer>
    </>
  );
}

const NavContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr max-content;
  padding: 0 1rem;
  font-size: 1rem;
  color: #333;
`;
const DateLayout = styled.div`
  margin: 0 1rem;
  cursor: pointer;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0px 5px;
`;
