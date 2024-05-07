import styled from "styled-components";

import Button from "@/shared/ui/button";

export default function ButtonBox() {
  return (
    <ButtonDiv>
    <Button>next</Button>
    <Button color='black' $bgColor='black50' $hoverColor='black100'>
      cancel
    </Button>
  </ButtonDiv>
  )
}

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  padding: 1rem 10rem;
`;