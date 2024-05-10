"use client";
import React from "react";
import { worldTime } from "@/shared/lib/data";
import SelectLocalTime from "@/shared/ui/selectLocalTime";
import Link from "next/link";
import styled from "styled-components";
import { fetchWithInterceptor } from "@/shared";
import { selectList } from "@/shared/lib/type";

export default function MyPageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const worldTimeChangeHandle = (option: selectList) => {
    fetchWithInterceptor(
      "https://user-service.edgescheduler.co.kr/members/my/timezone",
      {
        method: "PUT",
        body: JSON.stringify({ region: option.option, zoneId: option.value }),
      }
    ).then((res) => {
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
          <StyledLink href="/myPage/updateInfo">Update Information</StyledLink>
          <StyledLink href="/myPage/alarmLog">Alarm Log</StyledLink>
          <div>
            Change my LocalTime
            <SelectLocalTime
              id="worldTime"
              options={worldTime}
              width={16}
              margin={1}
              onSelectChange={worldTimeChangeHandle}
            ></SelectLocalTime>
          </div>
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
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const ContentLayout = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
