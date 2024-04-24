"use client";
import Link from "next/link";
import styled from "styled-components";

export default function MyPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MainLayout>
      <MyPageLink>
        <StyledLink href='/myPage/updateInfo'>update information</StyledLink>
        <StyledLink href='/myPage/alarmLog'>alarm log</StyledLink>
      </MyPageLink>
      {children}
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
`;

const MyPageLink = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
