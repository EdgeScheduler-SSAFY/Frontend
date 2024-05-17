"use client";
import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { fetchWithInterceptor } from "@/shared/index";

import { GoogleLoginButton } from "@/features/login/index";
import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      fetchWithInterceptor("https://user-service.edgescheduler.co.kr/auth/me")
        .then((res) => res.json())
        .then((data) => {
          router.push("/main/schedule");
        })
        .catch(() => {});
    }
  }, []);
  return (
    <MainLayout>
      <MainLogo>
        <LogoName color="blue">Edge&nbsp;</LogoName>
        <LogoName color="green">Sch</LogoName>
        <LogoName color="orange">edu</LogoName>
        <LogoName color="yellow">ler</LogoName>
      </MainLogo>
      <GoogleLoginButton />
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const MainLogo = styled.div`
  font-weight: 900;
  font-size: 4rem;
`;

const LogoName = styled.span<{ color: ColorName }>`
  color: ${(props) => Color(props.color)};
`;
