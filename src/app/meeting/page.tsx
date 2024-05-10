"use client";
import Link from "next/link";
import styled from "styled-components";

export default function Meeting() {
  return (
    <MainLayout>
      <Linkdiv>
        <StyledLink href="/meeting/createMeeting">createMeeting</StyledLink>
        <StyledLink href="/meeting/meetingSchedule">meetingSchedule</StyledLink>
      </Linkdiv>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
`;

const Linkdiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
