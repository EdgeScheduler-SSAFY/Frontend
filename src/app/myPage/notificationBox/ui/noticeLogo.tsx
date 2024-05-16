"use client";
import React, { useState } from "react";
import styled from "styled-components";

import { Color } from "@/shared/lib/styles/color";
import { NoticeLogoProps } from "@/shared/lib/type";
import { ColorName } from "@/shared/lib/type/types";

export default function NoticeLogo({ logoData }: { logoData: NoticeLogoProps }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  let backgroundColor: ColorName = "black100";

  switch (logoData.type) {
    case "MEETING_CREATED":
    case "MEETING_UPDATED_TIME":
      backgroundColor = "blue";
      break;
    case "ATTENDEE_RESPONSE":
      if (logoData.response === "ACCEPTED") backgroundColor = "green";
      else if (logoData.response === "DECLINED") backgroundColor = "orange";
      break;
    case "ATTENDEE_PROPOSAL":
      backgroundColor = "yellow";
      break;
    default:
      break;
  }

  return (
    <CalendarDiv>
      <DateDiv $backgroundColor={backgroundColor}>
        <div>{months[logoData.month - 1]}&nbsp;</div>
        <div>{logoData.day}</div>
      </DateDiv>
      <DayDiv>{days[logoData.date.getDay()]}</DayDiv>
    </CalendarDiv>
  );
}

const CalendarDiv = styled.div`
  width: 6rem;
  height: 5.5rem;
  border-radius: 10px;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  margin-right: 2rem;
`;

const DateDiv = styled.div<{ $backgroundColor: ColorName }>`
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  background-color: ${(props) => Color(props.$backgroundColor)};
  font-weight: 900;
  color: white;
`;

const DayDiv = styled.div`
  height: 2.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
  font-weight: 900;
`;
