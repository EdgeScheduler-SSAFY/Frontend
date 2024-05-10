import { Color } from "@/shared/lib/styles/color";
import React from "react";
import styled from "styled-components";

interface recommendTypeSetButtonProps {
  selected: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const StyledButton = styled.button<recommendTypeSetButtonProps>`
  min-width: 8rem;
  min-height: 2.5rem;
  border: none;
  border-radius: 5px;
  padding-top: auto;
  padding-bottom: auto;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ selected }) =>
    selected ? Color("blue") : Color("black50")};
  color: ${({ selected }) => (selected ? "white" : `${Color("black")}`)};
  &:hover {
    cursor: pointer;
    background-color: ${({ selected }) =>
      selected ? Color("blue") : Color("black100")};
  }
`;
const RecommendTypeSetButton: React.FC<recommendTypeSetButtonProps> = ({
  selected,
  onClick,
  children,
}) => (
  <StyledButton selected={selected} onClick={onClick}>
    {children}
  </StyledButton>
);

export default RecommendTypeSetButton;
