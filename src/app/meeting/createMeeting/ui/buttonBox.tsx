import styled from "styled-components";

import Button from "@/shared/ui/button";

export default function ButtonBox({ handleNext, handleCancel }) {
  return (
    <ButtonDiv>
      <Button onClick={handleNext}>next</Button>
      <Button
        color="black"
        $bgColor="black50"
        $hoverColor="black100"
        onClick={handleCancel}
      >
        cancel
      </Button>
    </ButtonDiv>
  );
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  padding: 1rem 10rem;
`;
