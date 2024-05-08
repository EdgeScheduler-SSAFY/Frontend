"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Color } from "../lib/styles/color";
import { selectList } from "../lib/type";

interface SelectProrps {
  width: number;
  id?: string;
  options: selectList[];
  standardIdx?: number;
  disabledIndex?: number;
  show: boolean;
  onSelectChange: (value: number | string) => void;
}

export default function Select(props: SelectProrps) {
  const [selectFlag, setSelectFlag] = useState<boolean>(props.show);
  // 초기값 설정
  const [selectedValue, setSelectedValue] = useState<string>(
    props.options.length > 0 && props.standardIdx !== undefined
      ? props.options[props.standardIdx].option
      : props.options[0].option
  );
  // 선택여부
  const toggleSelect = () => {
    setSelectFlag((prevFlag) => !prevFlag);
  };

  const isDisabled = (index: number) => {
    if (props.disabledIndex === undefined) return false;
    return index <= props.disabledIndex;
  };
  // 선택값
  const handleOptionClick = (value: number | string) => {
    // value에 해당하는 option 찾기
    const selectedOption = props.options.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setSelectedValue(selectedOption.option); // option으로 설정
      setSelectFlag(false);
      props.onSelectChange(value);
    }
  };

  // 외부 영역 클릭하면 닫히도록 구현
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setSelectFlag(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef}>
      <SelectDiv id={props.id} width={props.width}>
        <SelectedDiv width={props.width} onClick={toggleSelect}>
          <SelectedValue>{selectedValue}</SelectedValue>
        </SelectedDiv>
        <SelectList width={props.width} $show={selectFlag}>
          {props.options.map((option, index) => (
            <SelectOption
              key={option.value}
              onClick={
                isDisabled(index)
                  ? undefined
                  : () => handleOptionClick(option.value)
              }
              $disabled={isDisabled(index)}
            >
              {option.option}
            </SelectOption>
          ))}
        </SelectList>
      </SelectDiv>
    </div>
  );
}

const SelectDiv = styled.div<{ width: number }>`
  position: relative;
  width: ${(props) => (props.width ? `${props.width}rem` : "10rem")};
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

const SelectOption = styled.li<{ $disabled: boolean }>`
  background-color: ${({ $disabled }) =>
    $disabled ? Color("black50") : "none"};
  height: 1.9rem;
  line-height: 1.9rem;
  margin: 0.05rem 0;
  padding-left: 0.7rem;
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  &:hover {
    font-weight: 500;
    background-color: ${({ $disabled }) =>
      $disabled ? Color("black50") : Color("blue50")};
    box-sizing: border-box;
  }
`;
