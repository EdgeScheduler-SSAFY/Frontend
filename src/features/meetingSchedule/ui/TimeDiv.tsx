import { Color } from "@/shared/lib/styles/color";
import { timeDivProps } from "@/shared/lib/type";
import styled from "styled-components";

const StyledDiv = styled.div<timeDivProps>`
  box-sizing: border-box;
  width: 1rem;
  height: 2rem;
  background-color: ${({ selected }) =>
    selected === 2
      ? Color("green50")
      : selected === 1
      ? Color("orange50")
      : ""};
  border-top: 2px solid ${Color("black200")};
  border-bottom: 2px solid ${Color("black200")};
  border-left: 2px solid ${Color("black200")};
  background-color: ${({ timeindex, startindex, endindex, selected }) => {
    if (timeindex <= endindex && timeindex >= startindex) {
      switch (selected) {
        case 1:
          return Color("orange300");
        case 2:
          return Color("blue300");
        default:
          return Color("blue100");
      }
    }
  }};
`;

const TimeDiv: React.FC<timeDivProps> = ({
  timeindex,
  startindex,
  endindex,
  selected,
  personindex,
}) => {
  return (
    <StyledDiv
      personindex={personindex}
      timeindex={timeindex}
      startindex={startindex}
      endindex={endindex}
      selected={selected}
    ></StyledDiv>
  );
};

export default TimeDiv;
