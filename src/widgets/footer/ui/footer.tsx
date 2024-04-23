"use client";
import styled from "styled-components";

export default function Footer() {
  return <FooterNav>Copyright © 2024. SSAFY 자율 S201</FooterNav>;
}

const FooterNav = styled.footer`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid;
  height: 40px;
`;
