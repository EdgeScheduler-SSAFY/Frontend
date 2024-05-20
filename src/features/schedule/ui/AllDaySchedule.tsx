import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Color } from "@/shared/lib/styles/color";
import { DetailSchedule } from "@/features/schedule/index";
import { ColorName } from "@/shared/lib/type/types";

// 종일 일정 컴포넌트의 props
interface IAllDayScheduleProps {
  title: string;
  width: number; // 일정의 너비 비율 (날짜가 넘어가는 일정을 위해 추가)
  scheduleId: number; // 일정 아이디
  startDatetime: string; // 일정 시작 날짜
  endDatetime: string; // 일정 종료 날짜
  color: ColorName; // 일정 색상
  triggerReload: () => void;
}

// 종일 일정 컴포넌트
export function AllDaySchedule({
  title,
  width,
  scheduleId,
  startDatetime,
  endDatetime,
  color,
  triggerReload,
}: IAllDayScheduleProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 }); // 모달 위치
  const handleDayClick = (event: React.MouseEvent) => {
    //클릭한곳의 위치를 바탕으로 모달 위치 정함
    const viewportWidth = window.innerWidth;
    const positionY = event.clientY;
    const positionX = event.clientX;
    const top = positionY;
    const left = positionX > viewportWidth / 2 ? positionX - 450 : positionX;

    setModalPosition({ x: left, y: top });
    setShowDetails((prev) => !prev);
  };
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
      <Layout
        width={width}
        color={color}
        onClick={handleDayClick}
        $hoverColor={(color + "300") as ColorName}
      >
        <TextDiv>{title}</TextDiv>
      </Layout>
      {/* 상세보기 */}
      {showDetails && (
        <DetailSchedule
          key={scheduleId}
          left={modalPosition.x}
          top={modalPosition.y}
          scheduleId={scheduleId}
          close={() => setShowDetails(false)}
          startDatetime={startDatetime}
          endDatetime={endDatetime}
          triggerReload={triggerReload}
        ></DetailSchedule>
      )}
    </MainLayout>
  );
}
// 종일 일정 컴포넌트 스타일
const Layout = styled.div<{ color: ColorName; width: number; $hoverColor: ColorName }>`
  width: ${(props) => props.width}%;
  background-color: ${(props) => Color(props.color)};
  border-radius: 5px;
  color: white;
  text-align: left;
  padding: 0px 5px;
  font-size: small;
  position: relative;
  &:hover {
    background-color: ${(props) => Color(props.$hoverColor)};
  }
  margin: 1px 0px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
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
