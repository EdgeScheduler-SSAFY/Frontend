import React, { useState } from "react";
import styled from "styled-components";
import { type dayT, CreateSchedule, MoreSchedule } from "@/features/schedule/index";
import { format } from "date-fns";
// 한달의 날짜별 일정 컴포넌트의 props
interface IDayForMonthProps {
  day: dayT;
  index: number;
  triggerReload: () => void;
}
export const renderSchedules = (day: dayT, more: boolean) => {
  // 일정이 없을 경우
  if (!day.schedules) {
    return null;
  }
  // 일정이 2개 이하일 경우
  if (day.schedules && day.schedules.length < 3) {
    return (
      <ChildrenLayout more={more}>
        {day.schedules.map((schedule, index) => (
          <div key={index}>{schedule}</div>
        ))}
      </ChildrenLayout>
    );
  }
  // 일정이 2개 이상일 경우 + more
  if (more && day.schedules && day.schedules.length > 2) {
    return (
      <ChildrenLayout more={more}>
        {day.schedules.slice(0, 2).map((schedule, index) => (
          <div key={index}>{schedule}</div>
        ))}
        <MoreSchedule
          date={day.date}
          count={day.schedules.length - 2}
          schdules={day.schedules}
        ></MoreSchedule>
      </ChildrenLayout>
    );
  }
  // 일정이 2개 이상일 경우 + more
  if (!more && day.schedules && day.schedules.length > 2) {
    return (
      <ChildrenLayout more={more}>
        {day.schedules.map((schedule, index) => (
          <div key={index}>{schedule}</div>
        ))}
      </ChildrenLayout>
    );
  }
  // 일정 렌더링
  return day.schedules;
};

export function DayForMonth({ day, index, triggerReload }: IDayForMonthProps) {
  const [showCreate, setShowCreate] = useState<boolean>(false); //일정 생성 모달 보여주기 여부
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 모달 위치
  const handleDayClick = (event: React.MouseEvent) => {
    //클릭한곳의 위치를 바탕으로 모달 위치 정함
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const positionY = event.clientY;
    const positionX = event.clientX;
    const top = positionY > viewportHeight / 2 ? positionY - 400 : positionY;
    const left = positionX > viewportWidth / 2 ? positionX - 450 : positionX;

    setModalPosition({ x: left, y: top });
    setShowCreate((prev) => !prev);
  };
  // 날짜별 일정 렌더링
  return (
    <DayDiv index={index} onClick={handleDayClick}>
      <Day>{day.date.getDate() === 1 ? format(day.date, "MMM.d") : day.date.getDate()}</Day>
      {renderSchedules(day, true)}
      <div onClick={(e) => e.stopPropagation()}>
        {/* 일정생성 */}
        {showCreate && (
          <CreateSchedule
            triggerReload={triggerReload}
            type="PERSONAL"
            startDate={day.date}
            close={() => setShowCreate(false)}
            left={modalPosition.x}
            top={modalPosition.y}
          ></CreateSchedule>
        )}
      </div>
    </DayDiv>
  );
}
const DayDiv = styled.div<{ index: number }>`
  width: 100%;
  display: grid;
  grid-template-rows: 1fr 2fr;
  border-right: 1px solid #e0e0e0;
  ${(props) => (props.index === 1 ? `border-radius: 0 10px 0 0; ` : "")}
  ${(props) => (props.index === 2 ? `border-radius: 0 0 10px 0 ; ` : "")}
`;

const Day = styled.div`
  text-align: center;
  padding-right: 10px;
`;

const ChildrenLayout = styled.div<{ more: boolean }>`
  ${(props) => (props.more ? "grid-template-rows: 1fr 1fr 1fr" : "grid-auto-rows: 1fr")};
  display: grid;
  width: 100%;
`;
