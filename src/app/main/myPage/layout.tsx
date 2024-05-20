"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { worldTime } from "@/shared/lib/data";
import SelectLocalTime from "@/shared/ui/selectLocalTime";
import { fetchWithInterceptor } from "@/shared";
import { selectList } from "@/shared/lib/type";
import { Color } from "@/shared/lib/styles/color";

export default function MyPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentPath = usePathname();

  const worldTimeChangeHandle = (option: selectList) => {
    fetchWithInterceptor("https://user-service.edgescheduler.co.kr/members/my/timezone", {
      method: "PUT",
      body: JSON.stringify({ region: option.option, zoneId: option.value }),
    }).then((res) => {
      if (res.status === 200) {
        alert("Timezone changed successfully.");
      } else {
        alert("Failed to change timezone.");
      }
    });
    console.log(option);
    // 여기서 바로 api 요청 보내서 처리할 예정.
  };
  return (
    <MainLayout>
      <SubLayout>
        <MyPageLink>
          <StyledLink href="/main/myPage/updateInfo" $active={/updateInfo/.test(currentPath as string)}>
            Update Information
          </StyledLink>
          <StyledLink href="/main/myPage/notificationBox" $active={/notificationBox/.test(currentPath as string)}>
            Notification Box
          </StyledLink>
          <LocalChangeDiv>
            🌏Change my LocalTime
            <SelectLocalTime
              id="worldTime"
              options={worldTime}
              width={16}
              margin={1}
              onSelectChange={worldTimeChangeHandle}
            ></SelectLocalTime>
          </LocalChangeDiv>
        </MyPageLink>
        <ContentLayout>{children}</ContentLayout>
      </SubLayout>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
`;

const SubLayout = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2.5rem;
`;

const MyPageLink = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  justify-content: start;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
`;

const ContentLayout = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)<{ $active: boolean }>`
  text-decoration: none;
  color: ${(props) => (props.$active ? Color("blue") : Color("black"))};
  &:hover {
    cursor: pointer;
    color: ${Color("blue")};
  }
`;

const LocalChangeDiv = styled.div`
  margin-top: 2rem;
`;
