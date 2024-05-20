import React, { useState } from "react";
import styled from "styled-components";

import { DetailSchedule } from "@/features/schedule/index";
import { schedule } from "@/widgets/schedule/model/type";
import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";
import { format } from "date-fns";

interface IDayForWeekProps {
  scheduleList: schedule[];
  triggerReload: () => void;
}

export function DayForWeek({ scheduleList, triggerReload }: IDayForWeekProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 모달 위치
  const handleDayClick = (event: React.MouseEvent) => {
    //클릭한곳의 위치를 바탕으로 모달 위치 정함
    const viewportWidth = window.innerWidth;
    const positionY = event.clientY;
    const positionX = event.clientX;
    const left = positionX > viewportWidth / 2 ? positionX - 450 : positionX;

    setModalPosition({ x: left, y: positionY });
    setShowDetails((prev) => !prev);
  };
  const [scheduleId, setScheduleId] = useState<number>(0);
  const [startDatetime, setStartDatetime] = useState<string>("");
  const [endDatetime, setEndDatetime] = useState<string>("");
  scheduleList.sort(
    (a: schedule, b: schedule) => a.startDatetime.getTime() - b.startDatetime.getTime()
  );

  let lastEndTimes: Date[] = []; // 마지막 시간
  let columns: number[] = []; // 열의수

  scheduleList.forEach((schedule, index) => {
    // 일정 순회
    let placed = false; // 배치여부
    for (let i = 0; i < lastEndTimes.length && !placed; i++) {
      //몇 번째 열에 배치할지 결정
      if (schedule.startDatetime >= lastEndTimes[i]) {
        //시작시간이 마지막 시간보다 크면
        lastEndTimes[i] = schedule.endDatetime; //마지막 시간을 종료시간으로 설정
        columns[index] = i; //열의수 설정
        placed = true; //배치완료
      }
    }
    //배치되지 않았을 경우
    if (!placed) {
      lastEndTimes.push(schedule.endDatetime); //마지막 시간에 종료시간 추가
      columns[index] = lastEndTimes.length - 1; //열의수 설정
    }
  });

  const containerHeight = 984;

  return (
    <MainLayout>
      {scheduleList.map((schedule, index) => {
        const startMinutes =
          schedule.startDatetime.getHours() * 60 + schedule.startDatetime.getMinutes(); //시작시간
        const endMinutes = schedule.endDatetime.getHours() * 60 + schedule.endDatetime.getMinutes(); //종료시간
        const duration = endMinutes - startMinutes; //기간(갈이)
        const top = (startMinutes / 1440) * containerHeight; // 시작 위치
        const height = (duration / 1440) * containerHeight; //높이
        const width = 80 - columns[index] * 10; // 너비
        const left = columns[index] * 10; // 왼쪽 위치

        return (
          <ScheduleDiv
            key={schedule.scheduleId}
            className="time-block"
            top={top}
            height={height}
            width={width}
            left={left}
            zindex={columns[index]}
            color={
              schedule.color === 0
                ? "blue"
                : schedule.color === 1
                ? "green"
                : schedule.color === 2
                ? "orange"
                : schedule.color === 3
                ? "yellow"
                : "black200" || "blue"
            }
            $hoverColor={
              schedule.color === 0
                ? "blue600"
                : schedule.color === 1
                ? "green600"
                : schedule.color === 2
                ? "orange600"
                : schedule.color === 3
                ? "yellow600"
                : "black400" || "blue"
            }
            onClick={(e) => {
              setStartDatetime(format(schedule.startDatetime, "yyyy-MM-dd'T'HH:mm:ss"));
              setEndDatetime(format(schedule.endDatetime, "yyyy-MM-dd'T'HH:mm:ss"));
              setScheduleId(schedule.scheduleId);
              handleDayClick(e);
              e.stopPropagation();
            }}
          >
            {schedule.name}
          </ScheduleDiv>
        );
      })}
      {/* 일정상세 */}
      {showDetails && (
        <DetailSchedule
          left={modalPosition.x}
          top={modalPosition.y}
          triggerReload={triggerReload}
          endDatetime={endDatetime}
          startDatetime={startDatetime}
          scheduleId={scheduleId}
          close={() => setShowDetails(false)}
        ></DetailSchedule>
      )}
    </MainLayout>
  );
}
const MainLayout = styled.div``;
const ScheduleDiv = styled.div<{
  top: number;
  height: number;
  left: number;
  width: number;
  zindex: number;
  color: ColorName;
  $hoverColor: ColorName;
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width * 0.8}%;
  z-index: ${(props) => props.zindex};
  background-color: ${(props) => Color(props.color || "black50")};
  border: 1px solid ${Color("black50")};
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: ${Color("white")};
  padding: 0 ${(props) => props.width / 10}%;
  &:hover {
    background-color: ${(props) => Color(props.$hoverColor || "black50")};
  }
`;
