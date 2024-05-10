"use client"
import styled from "styled-components";
import { Color } from "../lib/styles/color";
import { ColorName } from "../lib/type/types";

interface ButtonProps {
  width?: number;
  height?: number;
  color?: ColorName;
  $bgColor?: ColorName;
  $hoverColor?: ColorName;
  fontSize?: number;
  children: string;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return <CustomButton {...props}>{props.children}</CustomButton>;
}

const CustomButton = styled.button<ButtonProps>`
  border: none;
  margin: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  width: ${(props) => (props.width ? `${props.width}rem` : "6.5rem")};
  height: ${(props) => (props.height ? `${props.height}rem` : "2.8rem")};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}rem` : "1rem")};
  background-color: ${(props) => (props.$bgColor ? props.$bgColor : Color("blue"))};
  color: ${(props) => (props.color ? Color(props.color) : "white")};
  &:hover {
    /* box-shadow: 0 0.5em 0.5em -0.4em ${(props) => (props.color ? props.color : Color("blue600"))}; */
    background-color: ${(props) => (props.$hoverColor ? Color(props.$hoverColor) : Color("blue600"))};
  }
`;
