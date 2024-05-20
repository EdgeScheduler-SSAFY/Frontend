import { Color } from "@/shared/lib/styles/color";
import { RecommendTimeDivProps, RecommendeTime } from "@/shared/lib/type";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div<RecommendTimeDivProps>`
  box-sizing: border-box;
  width: 1rem;
  height: 3rem;
  background-color: ${({ $dayCount, $timeindex, $recommendedTimes }) => {
    const isRecommended = $recommendedTimes.some(
      (recommendTime: RecommendeTime) => {
        return (
          $timeindex + $dayCount * 96 < recommendTime.endIndex &&
          $timeindex + $dayCount * 96 >= recommendTime.startIndex
        );
      }
    );
    return isRecommended ? Color("green300") : "black100";
  }};
`;

const RecommendTimeDiv: React.FC<RecommendTimeDivProps> = ({
  $dayCount,
  $timeindex,
  $recommendedTimes,
}) => {
  return (
    <StyledDiv
      $dayCount={$dayCount}
      $timeindex={$timeindex}
      $recommendedTimes={$recommendedTimes}
    ></StyledDiv>
  );
};

export default RecommendTimeDiv;
