import React from "react";
import styled from "styled-components";
import { Color } from "@/shared/lib/styles/color";
interface ITogleProps {
  $isOn: boolean;
  onToggle: () => void;
}
export function Togle({ $isOn, onToggle }: ITogleProps) {
  return (
    <MainLayout $isOn={$isOn} onClick={onToggle}>
      <Circle $isOn={$isOn}></Circle>
    </MainLayout>
  );
}
const MainLayout = styled.div<{ $isOn: boolean }>`
  width: 35px;
  height: 15px;
  /* border: 1px solid ${Color("black100")}; */
  padding: 2px;
  border-radius: 12px;
  transition: all 0.1s ease-in;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => (props.$isOn ? Color("blue300") : Color("black50"))};
  position: relative;
`;

const Circle = styled.div<{ $isOn: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: white;
  box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
  position: absolute;
  left: ${(props) => (props.$isOn ? "calc(100% - 18px);" : "3px")};
  transition: all 0.1s ease-in;
`;
