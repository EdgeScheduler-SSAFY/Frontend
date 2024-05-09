"use client";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Color } from "../lib/styles/color";
import { selectList } from "../lib/type";
import useUserStore, { userState } from "@/store/userStore";

interface SelectLocalTimeProps {
  width: number;
  id?: string;
  options: selectList[];
  margin: number;
  onSelectChange: (value: string | number) => void;
}

export default function SelectLocalTime(props: SelectLocalTimeProps) {
  // 초기값 설정

  const { localValue, setLocalValue } = useUserStore((state: userState) => ({
    localValue: state.localValue,
    setLocalValue: state.setLocalValue,
  }));
  const [selectFlag, setSelectFlag] = useState<boolean>(false);
  const [local, setLocal] = useState<string>("Albania");
  // 보여지는 이름
  const [value, setValue] = useState<string | number>(localValue);
  //실제 값

  // value에 해당하는 option 찾기
  useEffect(() => {
    const selectedOption = props.options.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setLocal(selectedOption.option);
    }
  }, [props.options, value]);

  const toggleSelect = () => {
    setSelectFlag((prevFlag) => !prevFlag);
  };
  // dropdown 열고닫기

  const handleOptionClick = (option: selectList) => {
    // value에 해당하는 option 찾기
    setValue(option.value);
    setSelectFlag(false);
    props.onSelectChange(option.value);
  }; // 핸들 옵션 클릭

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
    <SelectLayout margin={props.margin} ref={selectRef}>
      <SelectDiv id={props.id} width={props.width}>
        <SelectedDiv width={props.width} onClick={toggleSelect}>
          <SelectedValue>{local}</SelectedValue>
        </SelectedDiv>
        <SelectList width={props.width} $show={selectFlag}>
          {props.options.map((option, index) => (
            <SelectOption key={index} onClick={() => handleOptionClick(option)}>
              {option.option}
            </SelectOption>
          ))}
        </SelectList>
      </SelectDiv>
    </SelectLayout>
  );
}

const SelectLayout = styled.div<{ margin: number }>`
  margin-top: ${(props) => `${props.margin}rem`};
`;
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
  cursor: pointer;
`;

const SelectOption = styled.li`
  height: 1.9rem;
  line-height: 1.9rem;
  margin: 0.05rem 0;
  padding-left: 0.7rem;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  &:hover {
    font-weight: 500;
    box-sizing: border-box;
  }
`;
