import Button from "./button";
import styled from "styled-components";

import { ProposalButtonProps } from "@/shared/lib/type";

export function ProposalButton({ buttonClicked, onClickAttend, onClickAbsence, width, height, fontSize }: ProposalButtonProps ) {
  return (
    <ButtonDiv>
    <Button
      id='ATTENDED'
      color={buttonClicked === "ATTENDED" ? "white" : "black"}
      $bgColor={buttonClicked === "ATTENDED" ? "blue" : "black50"}
      $hoverColor='blue'
      onClick={onClickAttend}
      width={width}
      height={height}
      fontSize={fontSize}
    >
      attend
    </Button>
    <Button
      id='DECLINED'
      color={buttonClicked === "DECLINED" ? "white" : "black"}
      $bgColor={buttonClicked === "DECLINED" ? "black100" : "black50"}
      $hoverColor='blue'
      onClick={onClickAbsence}
      width={width}
      height={height}
      fontSize={fontSize}
    >
      absence
    </Button>
  </ButtonDiv>
  )
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
`;
