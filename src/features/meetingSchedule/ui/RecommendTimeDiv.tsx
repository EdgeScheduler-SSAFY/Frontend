import { Color } from "@/shared/lib/styles/color";
import { RecommendTimeDivProps } from "@/shared/lib/type";
import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div<RecommendTimeDivProps>`
  box-sizing: border-box;
  width: 1rem;
  height: 2rem;
  background-color: ${({ timeindex, startindex, endindex }) => {
    if (timeindex <= endindex && timeindex >= startindex) {
      return Color("green300");
    }
  }};
`;

const RecommendTimeDiv: React.FC<RecommendTimeDivProps> = ({
  timeindex,
  startindex,
  endindex,
}) => {
  return (
    <StyledDiv
      timeindex={timeindex}
      startindex={startindex}
      endindex={endindex}
    ></StyledDiv>
  );
};

export default RecommendTimeDiv;
