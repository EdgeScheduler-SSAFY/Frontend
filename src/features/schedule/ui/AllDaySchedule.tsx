import { useState } from "react";
import styled from "styled-components";
import { Color } from "@/shared/lib/styles/color";
type color = "blue" | "green" | "red" | "yellow";

// 종일 일정 컴포넌트의 props
interface IAllDayScheduleProps {
  title: string;
  width: number; // 일정의 너비 비율 (날짜가 넘어가는 일정을 위해 추가)
}

// 종일 일정 컴포넌트
export function AllDaySchedule({ title, width }: IAllDayScheduleProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <Layout width={width} color="blue" onClick={() => setShowDetails(!showDetails)}>
      {title}
    </Layout>
  );
}
// 종일 일정 컴포넌트 스타일
const Layout = styled.div<{ color: color; width: number }>`
  width: ${(props) => props.width}%;
  background-color: ${(props) => Color(props.color)};
  border-radius: 5px;
  color: white;
  text-align: left;
  padding: 0 5px;
  font-size: small;
  position: relative;
`;
