"use client";
import styled from "styled-components";

import { Color } from "@/shared/lib/styles/color";
import AlarmLogo from "./alarmLogo";
import AlramInfo from "./alarmInfo";

export default function AlarmBox() {
  return (
    <AlarmBoxDiv>
      <AlarmLogo />
      <AlramInfo />
    </AlarmBoxDiv>
  );
}
const AlarmBoxDiv = styled.div`
  border: 1px solid ${Color("black200")};
  display: flex;
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  width: 55rem;
  justify-content: center;
`;
