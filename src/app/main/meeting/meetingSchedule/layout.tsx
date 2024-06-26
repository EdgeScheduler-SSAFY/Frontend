"use client";
import styled from "styled-components";
import React from "react";

export default function MeetingScheduleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MSLayout>{children}</MSLayout>;
}

const MSLayout = styled.div`
  width: full;
  min-height: calc(100% - 50px);
`;
