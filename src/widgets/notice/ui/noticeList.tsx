"use client";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { MdOutlineMarkChatRead, MdOutlineMarkunread, MdOutlineDeleteSweep } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";

export function NoticeList({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const tmpAccessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcxNTU3NTUwM30.q_v6N2EIEmB0NVnYhnsAti3SQGcs_dfDOpPhhGsx5ZE";

  const getNoticeList = async () => {
    try {
      const res = await fetch("https://gateway.edgescheduler.co.kr/notification-service/notify/notifications/history", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tmpAccessToken}`,
        },
      });
      console.log(res.json());
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  const readAllClickHandle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 막기
    getNoticeList();
  };

  const removeAllClickHandle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 막기
    // 다음 작업 수행
  };

  const notificationBoxClickHandle = (e: React.MouseEvent) => {
    router.push("/myPage/notificationBox");
    onClose();
  };

  return (
    <NoticeBoxLayout>
      <NavLayout>
        <NoticeListButton onClick={readAllClickHandle}>
          <MdOutlineMarkChatRead size={13} />
          Read All
        </NoticeListButton>
        <NoticeListButton>
          <MdOutlineDeleteSweep size={15} onClick={removeAllClickHandle} />
          Remove All
        </NoticeListButton>
      </NavLayout>
      <NoticeListLayout></NoticeListLayout>
      <FooterLayout>
        <NoticeListButton onClick={notificationBoxClickHandle}>
          <MdOutlineMarkunread size={15} />
          Notification Box
        </NoticeListButton>
      </FooterLayout>
    </NoticeBoxLayout>
  );
}

const NoticeBoxLayout = styled.div`
  z-index: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 20rem;
  height: 26rem;
  box-shadow: 0 0 5px rgba(9, 30, 66, 0.31);
  background-color: white;
  right: 0.5rem;
  top: 1.6rem;
  border-radius: 10px;
`;

const NavLayout = styled.div`
  border-radius: 10px;
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 1rem;
`;
const NoticeListLayout = styled.div`
  overflow-y: scroll;
  width: 19rem;
  height: 24rem;
`;
const FooterLayout = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: end;
  border-radius: 10px;
  align-items: center;
  padding-right: 1rem;
`;

const NoticeListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: ${Color("black")};
  margin-right: 1.5rem;
  height: 60%;
  background: none;
  border: 1px solid ${Color("black400")};
  border-radius: 3px;
  transition: all 0.2s ease-in;
  &:hover {
    cursor: pointer;
    /* border: 1px solid ${Color("blue400")};
    color: ${Color("blue400")}; */
    background-color: ${Color("blue50")};
  }
`;
