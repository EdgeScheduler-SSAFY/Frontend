import React from "react";
import styled from "styled-components";
import { AllDaySchedule } from "@/features/schedule/index";

// 하루이상의 일정의 빈곳을 채우는 컴포넌트의 props
interface ISeparateScheduleProps {
  view: string;
  title: string;
  width: number;
}
// 하루이상의 일정의 빈곳을 채우는 컴포넌트
export function SeparateSchedule({ view, title, width }: ISeparateScheduleProps) {
  // 더보기시에는 일정을 보여주고 아닐때는 빈곳을 채움
  return view === "more" ? (
    <AllDaySchedule title={title} width={width}></AllDaySchedule>
  ) : (
    <Layout></Layout>
  );
}
const Layout = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  text-align: left;
  padding: 0 5px;
  font-size: small;
  z-index: -1;
  position: relative;
`;
const MoreLayout = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
  text-align: left;
  padding: 0 5px;
  font-size: small;
  z-index: -1;
  position: relative;
`;
