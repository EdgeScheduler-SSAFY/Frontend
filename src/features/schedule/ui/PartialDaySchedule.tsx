import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { DetailSchedule } from "@/features/schedule/index";
// 일부시간 일정 컴포넌트의 props
interface IPartialDayScheduleProps {
  title: string;
  date: Date;
}
//
export function PartialDaySchedule({ title, date }: IPartialDayScheduleProps) {
  // 일부시간 일정 상세보기 상태
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    // 일부시간 컴포넌트
    <Layout color="lightblue" onClick={() => setShowDetails(!showDetails)}>
      <Dot color="red"></Dot>
      <Text>
        {format(date, "HH:mm  ")}
        {title}
      </Text>
      {showDetails && <DetailSchedule close={() => setShowDetails(false)}></DetailSchedule>}
    </Layout>
  );
}
const Layout = styled.div<{ color: string }>`
  width: 100%;
  border-radius: 5px;
  text-align: left;
  padding: 0 5px;
  font-size: small;
  position: relative;
  cursor: pointer;
  &:hover {
    width: 100%;
    background-color: #f0f0f0;
  }
`;
const Dot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
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
