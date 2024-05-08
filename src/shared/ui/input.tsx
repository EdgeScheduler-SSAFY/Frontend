"use client";
import styled from "styled-components";
import { Noto_Sans_KR } from "next/font/google";

import { Color } from "../lib/styles/color";

const noto = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface InputProps {
  id: string;
  width?: number;
  height?: number;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  return (
    <CustomInput
      className={noto.className}
      {...props}
      value={props.value}
      onChange={props.onChange}
      id={props.id}
    ></CustomInput>
  );
}

const CustomInput = styled.input<InputProps>`
  width: ${(props) => (props.width ? `${props.width}rem` : "10rem")};
  height: ${(props) => (props.height ? `${props.height}rem` : "2rem")};
  padding: 0.1rem 0.7rem;
  font-size: 14px;
  border: 1px solid ${Color("black200")};
  border-radius: 3px;
  transition: all 0.2s ease-in;
  &:focus {
    outline: none;
    background-color: ${Color("blue50")};
  }
`;
