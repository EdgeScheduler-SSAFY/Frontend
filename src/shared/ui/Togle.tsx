import React from "react";
import styled from "styled-components";
import { Color } from "@/shared/lib/styles/color";
interface ITogleProps {
  isOn: boolean;
  onToggle: () => void;
}
export function Togle({ isOn, onToggle }: ITogleProps) {
  return (
    <MainLayout isOn={isOn} onClick={onToggle}>
      <Circle isOn={isOn}></Circle>
    </MainLayout>
  );
}
const MainLayout = styled.div<{ isOn: boolean }>`
  width: 35px;
  height: 15px;
  border: 1px solid ${Color("black100")};
  padding: 2px;
  border-radius: 12px;
  background-color: ${(props) => (props.isOn ? Color("blue") : "white")};
  position: relative;
`;
const Circle = styled.div<{ isOn: boolean }>`
  width: 15px;
  height: 15px;
  border-radius: 10px;
  background-color: white;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  right: ${(props) => (props.isOn ? 0 : "white")};
`;
