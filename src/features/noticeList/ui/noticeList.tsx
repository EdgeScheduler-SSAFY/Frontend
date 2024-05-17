"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { MdOutlineMarkChatRead, MdOutlineMarkunread } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
import { PostNoticeReadAll } from "../api/postNoticeReadAll";
import { GetNoticeList } from "../api/getNoticeList";
import CreatedNoticeBtn from "./createdNoticeBtn";
import ResponseNoticeBtn from "./responseNoticeBtn";
import CanceledNoticeBtn from "./canceledNoticeBtn";
import UpdatedTimeNoticeBtn from "./updatedTimeNoticeBtn";
import ProposalNoticeBtn from "./proposalNoticeBtn";

const renderNotificationComponent = (notification: any) => {
  switch (notification.type) {
    case "MEETING_CREATED":
      return <CreatedNoticeBtn data={notification} />;
    case "MEETING_DELETED":
      return <CanceledNoticeBtn data={notification} />;
    case "MEETING_UPDATED_FIELDS":
      return <CanceledNoticeBtn data={notification} />;
    case "MEETING_UPDATED_TIME":
      return <UpdatedTimeNoticeBtn data={notification} />;
    case "ATTENDEE_RESPONSE":
      return <ResponseNoticeBtn data={notification} />;
    case "ATTENDEE_PROPOSAL":
      return <ProposalNoticeBtn data={notification} />;
    default:
      return null;
  }
};

export function NoticeList({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [noticeList, setNoticeList] = useState<any[]>([]);
  const [noticeIds, setNoticeIds] = useState<string[]>([]);
  const [layoutKey, setLayoutKey] = useState(0);

  const fetchData = async () => {
    try {
      const responseData = await GetNoticeList();
      setNoticeList(responseData);
      setNoticeIds(responseData.map((notice: any) => notice.id));
    } catch (error) {
      console.log(error);
    }
  };

  const readAllClickHandle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 막기
    await PostNoticeReadAll(noticeIds);
    fetchData();
  };

  const notificationBoxClickHandle = (e: React.MouseEvent) => {
    router.push("/main/myPage/notificationBox");
    onClose();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLayoutKey((prevKey) => prevKey + 1);
  }, [noticeList]);

  return (
    <NoticeBoxLayout>
      <NavLayout>
        <NoticeListButton onClick={readAllClickHandle}>
          <MdOutlineMarkChatRead size={13} />
          Read All
        </NoticeListButton>
        <NoticeListButton onClick={notificationBoxClickHandle}>
          <MdOutlineMarkunread size={15} />
          Notification Box
        </NoticeListButton>
      </NavLayout>
      <NoticeListLayout key={layoutKey}>
        {noticeList &&
          noticeList.map((notification: any) => (
            <div key={notification.id}>{renderNotificationComponent(notification)}</div>
          ))}
      </NoticeListLayout>
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
  width: 22rem;
  height: 26rem;
  box-shadow: 0 0 5px rgba(9, 30, 66, 0.31);
  background-color: white;
  right: 0.5rem;
  top: 1.6rem;
  border-radius: 10px;
`;

const NavLayout = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: end;
  border-radius: 10px;
  align-items: center;
  padding-right: 1rem;
`;

const NoticeListLayout = styled.div`
  overflow-y: scroll;
  width: 20.5rem;
  height: 24rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
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
