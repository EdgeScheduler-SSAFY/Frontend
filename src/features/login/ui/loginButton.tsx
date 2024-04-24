"use client";
import styled from "styled-components";
import Image from "next/image";

import { Color } from "@/shared/lib/styles/color";

export function LoginButton() {
  return (
    <LoginButtonLayout>
      <MSLogo>
        <Image src='/images/microsoftLogo.png' alt='microsoftLogo' height={40} width={40} />
      </MSLogo>
      <LoginText>Sign in with Microsoft</LoginText>
    </LoginButtonLayout>
  );
}

const LoginButtonLayout = styled.div`
  width: 20rem;
  height: 4rem;
  border: 1px solid ${Color("black100")};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${Color("black50")};
  }
`;

const MSLogo = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
`;
const LoginText = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  font-size: large;
  font-weight: 500;
`;
