import Button from "./button";
import styled from "styled-components";

import { ProposalButtonProps } from "@/shared/lib/type";

export function ProposalButton({
  buttonClicked,
  onClickAttend,
  onClickAbsence,
  width,
  height,
  fontSize,
}: ProposalButtonProps) {
  return (
    <ButtonDiv>
      <Button
        id='ATTENDED'
        color={buttonClicked === "ATTENDED" ? "green" : "black200"}
        $bgColor={buttonClicked === "ATTENDED" ? "green50" : "white"}
        $hoverColor='green50'
        $hoverTextColor='green'
        onClick={buttonClicked === "ATTENDED" ? undefined : onClickAttend}
        width={width}
        height={height}
        fontSize={fontSize}
        $zIndex={10}
        $borderColor={buttonClicked === "ATTENDED" ? "green" : "black200"}
      >
        attend
      </Button>
      <Button
        id='DECLINED'
        color={buttonClicked === "DECLINED" ? "orange" : "black200"}
        $bgColor={buttonClicked === "DECLINED" ? "orange50" : "white"}
        $hoverColor='orange50'
        $hoverTextColor='orange'
        onClick={buttonClicked === "DECLINED" ? undefined : onClickAbsence}
        width={width}
        height={height}
        fontSize={fontSize}
        $zIndex={10}
        $borderColor={buttonClicked === "DECLINED" ? "orange" : "black200"}
      >
        absence
      </Button>
    </ButtonDiv>
  );
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
`;
