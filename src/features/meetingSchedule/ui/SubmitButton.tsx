// ui/recommendTypeSetButton.tsx
import { Color } from "@/shared/lib/styles/color";
import React from "react";
import styled from "styled-components";

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const StyledButton = styled.button<SubmitButtonProps>`
  min-width: 8rem;
  min-height: 2.5rem;
  border: none;
  border-radius: 5px;
  padding-top: auto;
  padding-bottom: auto;
  font-size: 14px;
  font-weight: 600;
  background-color: ${Color("green400")};
  &:hover {
    cursor: pointer;
    background-color: ${Color("green600")};
  }
`;
const SubmitButton: React.FC<SubmitButtonProps> = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

export default SubmitButton;
