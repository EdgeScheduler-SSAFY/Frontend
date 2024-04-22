"use client";
import styled from "styled-components";

export default function MeetingScheduleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MSLayout>{children}</MSLayout>;
}

const MSLayout = styled.div`
  margin-left: 10rem;
  margin-right: 10rem;
  margin-top: 4rem;
`;
