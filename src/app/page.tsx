"use client";
import styled from "styled-components";

export default function Home() {
  return <MainLayout>메인페이지</MainLayout>;
}

const MainLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
`;