import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa6";

interface IChooseViewButtonsProps {
  view: string; // 현재 view
  changeView: (view: string) => void; // view 변경 함수
}
// view 선택 버튼
export function ChooseViewButtons({ view, changeView }: IChooseViewButtonsProps) {
  // view 선택 버튼 확장 여부
  const [expanded, setExpanded] = useState(false);
  // view 선택 버튼 클릭 시
  const handleButtonClick = (selectedView: string) => {
    changeView(selectedView); // view 변경
    setExpanded(false); // 확장 여부 변경
  };
  // view 선택 버튼 렌더링
  return (
    <ButtonsLayout onClick={() => setExpanded(!expanded)}>
      <View>{view}</View>
      <Arrow>
        <FaAngleDown size={10} />
      </Arrow>
      {/* 확장 시 view 선택 버튼 렌더링 */}
      {expanded && (
        <ToggleLayout>
          <div onClick={() => handleButtonClick("month")}>month</div>
          <div onClick={() => handleButtonClick("week")}>week</div>
          <div onClick={() => handleButtonClick("day")}>day</div>
        </ToggleLayout>
      )}
    </ButtonsLayout>
  );
}

const ButtonsLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding-left: 5px;
`;
const ToggleLayout = styled.div`
  display: grid;
  position: absolute;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: white;
  top: 30px;
  padding: 10px 20px 10px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const View = styled.div`
  width: 50px;
`;
const Arrow = styled.div`
  height: 25px;
  margin: 0 auto;
`;
