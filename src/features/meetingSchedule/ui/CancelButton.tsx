import { Color } from "@/shared/lib/styles/color";
import React from "react";
import styled from "styled-components";

interface SubmitButtonProps {
  children: React.ReactNode;
}

const StyledButton = styled.button<SubmitButtonProps>`
  min-width: 8rem;
  min-height: 2.5rem;
  border: none;
  border-radius: 5px;
  padding-top: auto;
  padding-bottom: auto;
  background-color: ${Color("orange400")};
  font-size: 14px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: ${Color("orange600")};
  }
`;
const CancelButton: React.FC<SubmitButtonProps> = ({ children }) => (
  <StyledButton>{children}</StyledButton>
);

export default CancelButton;
