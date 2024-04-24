"use client";
import styled from "styled-components";
import { Color } from "@/shared/lib/styles/color";

export function Footer() {
  return <FooterNav>Copyright © 2024. SSAFY 자율 S201</FooterNav>;
}
const FooterNav = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* margin-top: auto; */
  background-color: ${Color('black50')};
  height: 50px;
`;
