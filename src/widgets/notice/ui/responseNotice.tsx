"use client";
import React from "react";
import styled from "styled-components";
import { getDay } from "date-fns";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";
import { PatchNoticeRead } from "@/features/noticeList/api/patchNoticeRead";
import ConversionDateMini from "@/features/noticeList/model/conversionDateMini";

export default function ResponseNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const responseColor: ColorName = eventData.response === "ACCEPTED" ? "green" : "orange";

  // sse 알림 닫는 함수
  const closeHandle = () => {
    onClose();
  };

  return (
    <ResponseNoticeLayout>
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.attendeeName}&nbsp;</div>
          <CategoryDiv $responseColor={responseColor}>{eventData.response.toLowerCase()}&nbsp;</CategoryDiv>
          <div>to attend the meeting.</div>
        </NoticeTitleDetail>
        <CustomMdClose size={15} onClick={closeHandle} />
      </NoticeTitle>
      <TitleLineDiv />
      <InfoDiv>
        <TitleDiv>{eventData.scheduleName}</TitleDiv>
        <TimeDiv>
          <ConversionDateMini start={eventData.startTime} end={eventData.endTime} />
        </TimeDiv>
      </InfoDiv>
    </ResponseNoticeLayout>
  );
}

const ResponseNoticeLayout = styled.div`
  width: 20rem;
  height: 5rem;
  border: 2px solid ${Color("black100")};
  border-radius: 10px;
  background-color: white;
  font-size: 14px;
  margin-bottom: 0.5rem;
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

const CategoryDiv = styled.div<{ $responseColor: ColorName }>`
  color: ${(props) => Color(props.$responseColor)};
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

const InfoDiv = styled.div`
  width: 14rem;
  padding-left: 1rem;
`;

const TitleDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
const TimeDiv = styled.div`
  font-size: 12px;
`;
