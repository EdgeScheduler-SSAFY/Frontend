import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";

export default function AttendeeResponseNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  // sse 알림 닫는 함수
  const closeHandle = () => {
    onClose();
  };

  return (
    <AttendeeResponseLayout>
 <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.organizerName}&nbsp;</div>
          <CategoryDiv>sent a request&nbsp;</CategoryDiv>
          <div>to attend the meeting.</div>
        </NoticeTitleDetail>
        <CustomMdClose size={15} onClick={closeHandle} />
      </NoticeTitle>
      <TitleLineDiv />
    </AttendeeResponseLayout>
  );
}

const AttendeeResponseLayout = styled.div`
  width: 20rem;
  height: 5rem;
  border: 2px solid ${Color("black100")};
  border-radius: 10px;
  background-color: white;
  font-size: 14px;
`;

const NoticeTitle = styled.div`
  font-size: 11px;
  width: 18rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-top: 0.5rem;
`;

const CategoryDiv = styled.div`
  color: ${Color("blue")};
  font-weight: 600;
`;


const NoticeTitleDetail = styled.div`
  display: flex;
  align-items: center;
`;

const CustomMdClose = styled(MdClose)`
  cursor: pointer;
`;

const TitleLineDiv = styled.hr`
  width: 90%;
  margin: 0.3rem 1rem;
  border: 0.5px solid ${Color("black100")};
`;
