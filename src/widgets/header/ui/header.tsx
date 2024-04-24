"use client";
import Link from "next/link";
import styled, { DefaultTheme } from "styled-components";

import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";
import Image from "next/image";

export function Header() {
  return (
    <HeaderNav>
      <MainLogo>
        <StyledLink href="/">
          <Image src="/images/edgeScheduler.png" alt="edgeSchedulerLogo" height={50} width={50} />
          <LogoName color="blue">Edge&nbsp;</LogoName>
          <LogoName color="green">Sch</LogoName>
          <LogoName color="orange">edu</LogoName>
          <LogoName color="yellow">ler</LogoName>
        </StyledLink>
      </MainLogo>
      <NavLink>
        <StyledLink href="/schedule">schedule</StyledLink>
        <StyledLink href="/meeting">create meeting</StyledLink>
        <StyledLink href="/myPage/alarmLog">마이페이지</StyledLink>
      </NavLink>
      <LoginLink>
        <StyledLink href="/login">sign in</StyledLink>
      </LoginLink>
    </HeaderNav>
  );
}

const HeaderNav = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  box-shadow: 0 0px 5px 3px rgba(0, 0, 0, 0.2);
  height: 60px;
`;

const MainLogo = styled.div`
  flex: 3;
  font-weight: 900;
  font-size: larger;
`;

const LogoName = styled.span<{ color: ColorName }>`
  color: ${(props) => Color(props.color)};
`;

const NavLink = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex: 5;
`;
const LoginLink = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex: 2;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
`;
