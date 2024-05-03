"use client";
import React, { useState } from "react";
import styled from "styled-components";

import { Color } from "../lib/styles/color";
import { selectList } from "../lib/type/interfaces";

interface SelectProrps {
  width: number;
  id?: string;
  options: selectList[];
  show: boolean;
  onSelectChange: (value: number | string) => void;
}

export default function Select(props: SelectProrps) {
  const [selectFlag, setSelectFlag] = useState<boolean>(props.show);
  // 15 minutes(options[0].option)을 초기값으로 설정
  const [selectedValue, setSelectedValue] = useState<string>(props.options.length > 0 ? props.options[0].option : "");

  // 선택여부
  const toggleSelect = () => {
    setSelectFlag((prevFlag) => !prevFlag);
  };

  // 선택값
  const handleOptionClick = (value: number | string) => {
    // value에 해당하는 option 찾기
    const selectedOption = props.options.find((option) => option.value === value);
    if (selectedOption) {
      setSelectedValue(selectedOption.option); // option으로 설정
      setSelectFlag(false);
      props.onSelectChange(value);
    }
  };

  return (
    <SelectDiv id={props.id}>
      <SelectedDiv width={props.width} onClick={toggleSelect}>
        <SelectedValue>{selectedValue}</SelectedValue>
      </SelectedDiv>
      <SelectList width={props.width} $show={selectFlag}>
        {props.options.map((option) => (
          <SelectOption key={option.value} onClick={() => handleOptionClick(option.value)}>
            {option.option}
          </SelectOption>
        ))}
      </SelectList>
    </SelectDiv>
  );
}

const SelectDiv = styled.div`
  position: relative;
  width: 10rem;
  height: 2rem;
`;

const SelectedDiv = styled.div<{ width: number }>`
  width: ${(props) => (props.width ? `${props.width}rem` : "10rem")};
  border: solid 1px ${Color("black200")};
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  position: relative;
`;

const SelectedValue = styled.span`
  font-size: 14px;
  padding: 0.1rem 0.7rem;
  height: 2rem;
  display: flex;
  align-items: center;
`;

const SelectList = styled.ul<{ $show: boolean; width: number }>`
  overflow-y: auto; /* 세로 스크롤 적용 */
  display: ${(props) => (props.$show ? "block" : "none")};
  list-style-type: none;
  padding-left: 0;
  position: absolute;
  font-size: 14px;
  width: ${(props) => (props.width ? `${props.width}rem` : "10rem")};
  height: 8rem;
  z-index: 15;
  border: solid 1px ${Color("black200")};
  text-align: left;
  margin-top: 1px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 3px;
`;

const SelectOption = styled.li`
  height: 1.9rem;
  line-height: 1.9rem;
  margin: 0.05rem 0;
  padding-left: 0.7rem;
  cursor: pointer;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  &:hover {
    font-weight: 500;
    background-color: ${Color("blue50")};
    box-sizing: border-box;
  }
`;
