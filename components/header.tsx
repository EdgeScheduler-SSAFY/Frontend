"use client";
import Link from "next/link";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderNav>
      <MainLogo>
        <StyledLink href="/">Edge Scheduler</StyledLink>
      </MainLogo>
      <NavLink>
        <StyledLink href="/schedule">일정관리</StyledLink>
        <StyledLink href="/meeting">회의생성</StyledLink>
        <StyledLink href="/myPage/alarmLog">마이페이지</StyledLink>
      </NavLink>
      <LoginLink>
        <StyledLink href="/login">로그인</StyledLink>
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
  text-decoration: none;
`;