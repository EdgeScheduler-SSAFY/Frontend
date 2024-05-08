import React, { useState } from "react";
import styled from "styled-components";

import { DetailSchedule } from "@/features/schedule/index";
import { schedule } from "@/widgets/schedule/model/type";
import { Color } from "@/shared/lib/styles/color";

interface IDayForWeekProps {
  schedules: schedule[];
}

export function DayForWeek({ schedules }: IDayForWeekProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  schedules.sort(
    (a: schedule, b: schedule) => a.startDateTime.getTime() - b.startDateTime.getTime()
  );

  let lastEndTimes: Date[] = []; // 마지막 시간
  let columns: number[] = []; // 열의수

  schedules.forEach((schedule, index) => {
    // 일정 순회
    let placed = false; // 배치여부
    for (let i = 0; i < lastEndTimes.length && !placed; i++) {
      //몇 번째 열에 배치할지 결정
      if (schedule.startDateTime >= lastEndTimes[i]) {
        //시작시간이 마지막 시간보다 크면
        lastEndTimes[i] = schedule.endDateTime; //마지막 시간을 종료시간으로 설정
        columns[index] = i; //열의수 설정
        placed = true; //배치완료
      }
    }
    //배치되지 않았을 경우
    if (!placed) {
      lastEndTimes.push(schedule.endDateTime); //마지막 시간에 종료시간 추가
      columns[index] = lastEndTimes.length - 1; //열의수 설정
    }
  });

  const containerHeight = 984;

  return (
    <MainLayout>
      {schedules.map((schedule, index) => {
        const startMinutes =
          schedule.startDateTime.getHours() * 60 + schedule.startDateTime.getMinutes(); //시작시간
        const endMinutes = schedule.endDateTime.getHours() * 60 + schedule.endDateTime.getMinutes(); //종료시간
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
            onClick={(e) => {
              setShowDetails((prev) => !prev);
              e.stopPropagation();
            }}
          >
            {columns[index]}
          </ScheduleDiv>
        );
      })}
      {showDetails && <DetailSchedule close={() => setShowDetails(false)}></DetailSchedule>}
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
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}%;
  width: ${(props) => props.width * 0.8}%;
  z-index: ${(props) => props.zindex};
  background-color: ${Color("blue")};
  border: 1px solid ${Color("black50")};
  border-radius: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 ${(props) => props.width / 10}%;
  &:hover {
    background-color: ${Color("blue300")};
  }
`;
const MoreLayout = styled.div`
  width: 90%;
  height: 25%;
  font-size: small;
  text-align: left;
`;
