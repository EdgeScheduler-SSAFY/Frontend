import { timeStampProps } from "@/shared/lib/type";
import styled from "styled-components";

const StyledDiv = styled.div<timeStampProps>`
  box-sizing: border-box;
  width: 1rem;
  height: 26px;
`;

const TimeStampDiv: React.FC<timeStampProps> = ({
  timeindex,
  personindex,
  children,
}) => {
  return (
    <StyledDiv personindex={personindex} timeindex={timeindex}>
      {children}
    </StyledDiv>
  );
};

export default TimeStampDiv;
