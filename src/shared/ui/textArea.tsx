"use client";
import styled from "styled-components";
import { Noto_Sans_KR } from "next/font/google";

import { Color } from "../lib/styles/color";

const noto = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface TextAreaProrps {
  width?: number;
  height?: number;
  placeholder?: string;
  type?: string;
  resize?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: TextAreaProrps) {
  return <CustomTextArea className={noto.className} {...props}></CustomTextArea>;
}

const CustomTextArea = styled.textarea<TextAreaProrps>`
  resize: ${(props) => (props.resize ? props.resize : "none")};
  width: ${(props) => (props.width ? `${props.width}rem` : "77%")};
  height: ${(props) => (props.height ? `${props.height}rem` : "4rem")};
  padding: 0.5rem 0.7rem;
  font-size: 14px;
  border: 1px solid ${Color("black200")};
  border-radius: 3px;
  transition: all 0.2s ease-in;
  &:focus {
    outline: none;
    background-color: ${Color("blue50")};
  }
`;
