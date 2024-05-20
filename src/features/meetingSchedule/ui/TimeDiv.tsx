import { Color } from "@/shared/lib/styles/color";
import { timeDivProps } from "@/shared/lib/type";
import React from "react";
import styled from "styled-components";

const Tooltip = styled.div`
  position: absolute;
  z-index: 1;
  color: black;
  text-align: center;
  top: 20px;
  width: 200px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
  opacity: 0.5;
  transition: opacity 0.3s;
  visibility: hidden;
`;

const StyledDiv = styled.div<timeDivProps>`
  box-sizing: border-box;
  width: 1rem;
  height: 2rem;
  background-color: ${({ $type }) => {
    switch ($type) {
      case "AVAILABLE":
        return;
      case "UNAVAILABLE":
        return Color("orange200");
      case "AVAILABLE_IN_WORKING_HOURS":
        return Color("green100");
      case "BLOCKED":
        return Color("black100");
    }
  }};
  border-top: 2px solid ${Color("black200")};
  border-bottom: 2px solid ${Color("black200")};
  border-left: 2px solid ${Color("black200")};
  background-color: ${({ $timeindex, $startindex, $endindex, $type }) => {
    if ($timeindex < $endindex && $timeindex >= $startindex) {
      switch ($type) {
        case "AVAILABLE":
          return Color("blue200");
        case "UNAVAILABLE":
          return Color("orange300");
        case "AVAILABLE_IN_WORKING_HOURS":
          return Color("green300");
        case "BLOCKED":
          return Color("black100");
      }
    }
  }};
  position: relative;

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

const TimeDiv: React.FC<timeDivProps> = ({
  $timeindex,
  $type,
  $personindex,
  $startindex,
  $endindex,
  $isScheduled,
  $scheduleName,
}) => {
  return (
    <StyledDiv
      $personindex={$personindex}
      $timeindex={$timeindex}
      $startindex={$startindex}
      $endindex={$endindex}
      $type={$type}
      $isScheduled={$isScheduled}
      $scheduleName={$scheduleName}
    >
      {$isScheduled && <Tooltip>{$scheduleName}</Tooltip>}
    </StyledDiv>
  );
};

export default TimeDiv;
