"use client";
import React, { useEffect } from "react";
import { fetchWithInterceptor } from "@/shared/index";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import StyledComponentsRegistry from "@/../lib/registry";
import styled, { ThemeProvider } from "styled-components";
import { Header } from "@/widgets/header/index";
import { Footer } from "@/widgets/footer/index";
import GlobalStyle from "@/shared/lib/styles/globalStyle";
import * as theme from "@/shared/lib/styles/theme";

const noto = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={noto.className}>
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyle theme={theme} />
          <StyledComponentsRegistry>
            <Main>{children}</Main>
            <div id="globalModal"></div>
            <div id="clickModal"></div>
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}

const Main = styled.main`
  height: 100%;
`;
