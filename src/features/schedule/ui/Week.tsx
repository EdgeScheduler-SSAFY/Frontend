import React from "react";
import styled from "styled-components";
export function Week() {
  return (
    <WeekDayLaout>
      <div>SUN</div>
      <div>MON</div>
      <div>TUE</div>
      <div>WED</div>
      <div>THU</div>
      <div>FRI</div>
      <div>SAT</div>
    </WeekDayLaout>
  );
}
const WeekDayLaout = styled.div<{}>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  text-shadow: 1px 1px 1px #e0e0e0;
`;
