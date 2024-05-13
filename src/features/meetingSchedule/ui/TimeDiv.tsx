import { Color } from "@/shared/lib/styles/color";
import { timeDivProps } from "@/shared/lib/type";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div<timeDivProps>`
  box-sizing: border-box;
  width: 1rem;
  height: 2rem;
  background-color: ${({ $type }) => {
  switch ($type) {
    case "AVAILABLE" : return;
    case "UNAVAILABLE" : return Color("orange200");
    case "AVAILABLE_IN_WORKING_HOURS" : return Color("green100");
    case "BLOCKED" : return Color("black100");
  }
}};
  border-top: 2px solid ${Color("black200")};
  border-bottom: 2px solid ${Color("black200")};
  border-left: 2px solid ${Color("black200")};
  background-color: ${({ $timeindex, $startindex, $endindex, $type }) => {
    if ($timeindex <= $endindex && $timeindex >= $startindex) {
      switch ($type) {
      case "AVAILABLE" : return ;
    case "UNAVAILABLE" : return Color("orange300");
    case "AVAILABLE_IN_WORKING_HOURS" : return Color("green300");
    case "BLOCKED" : return Color("black100");
      }
    }
  }};
`;

const TimeDiv: React.FC<timeDivProps> = ({
  $timeindex,
  $type,
  $personindex,
  $startindex,
  $endindex,
}) => {
  return (
    <StyledDiv
      $personindex={$personindex}
      $timeindex={$timeindex}
      $startindex={$startindex}
      $endindex={$endindex}
      $type={$type}
    ></StyledDiv>
  );
};

export default TimeDiv;
