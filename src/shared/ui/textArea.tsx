import styled from "styled-components";
import { Noto_Sans_KR } from "next/font/google";

import { Color } from "../lib/styles/color";
import { ColorName } from "../lib/type/types";

const noto = Noto_Sans_KR({
  subsets: ["latin"], // 또는 preload: false
});

interface TextAreaProrps {
  width?: number;
  height?: number;
  placeholder?: string;
  type?: string;
  onClick?: () => void;
  resize?: string;
}

export default function TextArea(props: TextAreaProrps) {
  return <CustomTextArea {...props} className={noto.className}></CustomTextArea>;
}

const CustomTextArea = styled.textarea<TextAreaProrps>`
  resize: ${(props) => (props.resize ? props.resize : "none")};
  width: ${(props) => (props.width ? `${props.width}rem` : "70%")};
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
