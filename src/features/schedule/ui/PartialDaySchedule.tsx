import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { DetailSchedule } from "@/features/schedule/index";
import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";
// 일부시간 일정 컴포넌트의 props
interface IPartialDayScheduleProps {
  title: string;
  date: Date;
  scheduleId: number;
  startDatetime: string;
  endDatetime: string;
  color: ColorName;
  triggerReload: () => void;
}
//
export function PartialDaySchedule({
  title,
  date,
  scheduleId,
  endDatetime,
  startDatetime,
  color,
  triggerReload,
}: IPartialDayScheduleProps) {
  // 일부시간 일정 상세보기 상태
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    // 일부시간 컴포넌트
    <Layout
      color="lightblue"
      onClick={(e) => {
        setShowDetails(!showDetails);
        e.stopPropagation();
      }}
    >
      <Dot color={color}></Dot>
      <Text>
        {format(date, "HH:mm  ")}
        {title}
      </Text>
      {showDetails && (
        <DetailSchedule
          triggerReload={triggerReload}
          endDatetime={endDatetime}
          startDatetime={startDatetime}
          scheduleId={scheduleId}
          close={() => setShowDetails(false)}
        ></DetailSchedule>
      )}
    </Layout>
  );
}
const Layout = styled.div<{ color: string }>`
  width: 100%;
  border-radius: 5px;
  text-align: left;
  font-size: small;
  position: relative;
  cursor: pointer;
  &:hover {
    width: 100%;
    background-color: #f0f0f0;
  }
`;
const Dot = styled.div<{ color: ColorName }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => Color(props.color || "black50")};
  position: absolute;
  left: 5px;
  top: 7px;
`;
const Text = styled.div`
  width: 8vw;
  height: 100%;
  position: relative;
  left: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
