import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
// 더보기 일정 컴포넌트의 props
interface IMoreScheduleProps {
  schdules: React.ReactNode[];
  count: number;
  date: Date;
}
// 하루에 일정이 3개 이상일때 더보기 일정 컴포넌트
export function MoreSchedule({ schdules, count, date }: IMoreScheduleProps) {
  // 더보기 일정 상태
  const [showMore, setShowMore] = useState<boolean>(false);
  // 외부영역 클릭 확인을위한 ref
  const ref = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 더보기 일정 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !document.getElementById("createScheduleModal")?.contains(event.target as Node) &&
        !document.getElementById("detailProposal")?.contains(event.target as Node) &&
        !document.getElementById("detailSchedule")?.contains(event.target as Node) &&
        !document.getElementById("proposalModal")?.contains(event.target as Node)
      ) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // 더보기 일정 레이아웃
    <MainLayout
      onClick={(e) => {
        setShowMore((prev) => !prev);
        e.stopPropagation();
      }}
    >
      {/* 몇게 더 있는지 보여줌 */}
      {count} more
      {/* 더보기를 보여주는 부분 */}
      {showMore && (
        <MoreDiv ref={ref}>
          <TextDiv>{format(date, "dd")}</TextDiv>
          <TextDiv>{format(date, "EEE")}</TextDiv>
          {schdules.map((schedule, index) => (
            <div key={index} onClick={(e) => e.stopPropagation()}>
              {React.isValidElement(schedule) && schedule.props
                ? React.cloneElement(schedule, { ...schedule.props, view: "more", width: 90 })
                : schedule}
            </div>
          ))}
        </MoreDiv>
      )}
    </MainLayout>
  );
}
const MainLayout = styled.div`
  width: 90%;
  height: 25%;
  font-size: small;
  text-align: left;
  position: relative;
  cursor: pointer;
`;

const MoreDiv = styled.div`
  background-color: white;
  padding: 15px;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  width: 150%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 100;
`;
const TextDiv = styled.div`
  text-align: center;
  margin-bottom: 5px;
`;
