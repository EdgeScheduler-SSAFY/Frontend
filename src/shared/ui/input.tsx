import styled from "styled-components";
import { useState } from "react";
import { Noto_Sans_KR } from "next/font/google";
import { MdClear } from "react-icons/md";

import { Color } from "../lib/styles/color";
import { ColorName } from "../lib/type/types";

const noto = Noto_Sans_KR({
  subsets: ["latin"], // 또는 preload: false
});

interface InputProrps {
  id: string;
  width?: number;
  height?: number;
  placeholder?: string;
  type?: string;
  onClick?: () => void;
}

export default function Input(props: InputProrps) {
  // 검색어
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  // const handleClear = () => {
  //   setValue("");
  // };

  return <CustomInput {...props} className={noto.className} value={value} onChange={handleChange} id={props.id}></CustomInput>;
}

const CustomInput = styled.input<InputProrps>`
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

// const ClearButton = styled.span`
//   position: absolute;
//   right: 10px;
//   top: 55%;
//   transform: translateY(-55%);
//   cursor: pointer;
//   transition: all 0.2s ease-in-out;
// `;
