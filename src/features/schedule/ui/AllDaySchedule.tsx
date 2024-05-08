import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Color } from "@/shared/lib/styles/color";
import { DetailSchedule } from "@/features/schedule/index";
type color = "blue" | "green" | "orange" | "yellow";

// 종일 일정 컴포넌트의 props
interface IAllDayScheduleProps {
  title: string;
  width: number; // 일정의 너비 비율 (날짜가 넘어가는 일정을 위해 추가)
}

// 종일 일정 컴포넌트
export function AllDaySchedule({ title, width }: IAllDayScheduleProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 더보기 일정 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowDetails(false);
      }
    };
    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDetails]);

  return (
    <MainLayout onClick={(e) => e.stopPropagation()}>
      <Layout width={width} color="blue" onClick={() => setShowDetails((prev) => !prev)}>
        <TextDiv>{title}</TextDiv>
      </Layout>
      {showDetails && <DetailSchedule close={() => setShowDetails(false)}></DetailSchedule>}
    </MainLayout>
  );
}
// 종일 일정 컴포넌트 스타일
const Layout = styled.div<{ color: color; width: number }>`
  width: ${(props) => props.width}%;
  background-color: ${(props) => Color(props.color)};
  border-radius: 5px;
  color: white;
  text-align: left;
  padding: 0px 5px;
  font-size: small;
  position: relative;
  &:hover {
    background-color: lightcoral;
  }
  margin: 1px 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const TextDiv = styled.div`
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const MainLayout = styled.div`
  width: 100%;
  text-align: left;
  font-size: small;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
