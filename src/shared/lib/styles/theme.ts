import { DefaultTheme } from "styled-components";

export const colors = {
  black: "#2f2f2f",
  black10: "#f5f5f5",
  black50: "#ececec",
  black100: "#c4c4c4",
  black200: "#a8a8a8",
  black300: "#808080",
  black400: "#686868",
  black500: "#424242",
  black600: "#3c3c3c",
  blue: "#00adef",
  blue50: "#e6f7fd",
  blue100: "#b0e6fa",
  blue200: "#8ad9f8",
  blue300: "#54c8f4",
  blue400: "#33bdf2",
  blue600: "#009dd9",
  blue700: "#007baa",
  green: "#80cc28",
  green50: "#f2faea",
  green100: "#d8efbc",
  green200: "#c5e89c",
  green300: "#aadd6f",
  green400: "#99d653",
  green600: "#74ba24",
  green700: "#5b911c",
  orange: "#f1511b",
  orange50: "#feeee8",
  orange100: "#fbc9b8",
  orange200: "#f9af96",
  orange300: "#f68a66",
  orange400: "#f47449",
  orange600: "#db4a19",
  orange700: "#ab3a13",
  yellow: "#fbbc09",
  yellow50: "#fff8e6",
  yellow100: "#feeab3",
  yellow200: "#fde08e",
  yellow300: "#fcd25a",
  yellow400: "#fcc93a",
  yellow600: "#e4ab08",
  yellow700: "#b28506",
  white: "#ffffff",
};

export type ColorsTypes = typeof colors;

const theme: DefaultTheme = {
  colors,
};

export default theme;
