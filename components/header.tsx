"use client";
import Link from "next/link";
import styled, { DefaultTheme } from "styled-components";

import { Color } from "@/components/color";
import { ColorName } from "@/src/app/type/types";
import Image from "next/image";

export default function Header() {
  return (
    <HeaderNav>
      <MainLogo>
        <StyledLink href='/'>
          <Image src='/images/edgeScheduler.png' alt='edgeSchedulerLogo' height={50} width={50} />
          <LogoName color='blue'>Edge&nbsp;</LogoName>
          <LogoName color='green'>Sch</LogoName>
          <LogoName color='orange'>edu</LogoName>
          <LogoName color='yellow'>ler</LogoName>
        </StyledLink>
      </MainLogo>
      <NavLink>
        <StyledLink href='/schedule'>일정관리</StyledLink>
        <StyledLink href='/meeting'>회의생성</StyledLink>
        <StyledLink href='/myPage/alarmLog'>마이페이지</StyledLink>
      </NavLink>
      <LoginLink>
        <StyledLink href='/login'>로그인</StyledLink>
      </LoginLink>
    </HeaderNav>
  );
}

const HeaderNav = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  border-bottom: 1px solid;
  height: 50px;
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
