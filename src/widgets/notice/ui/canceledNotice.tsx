"use client";
import React from "react";
import styled from "styled-components";
import { getDay } from "date-fns";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
import { dayList, MonthList } from "@/shared/lib/data";
import ConversionDateMini from "@/features/noticeList/model/conversionDateMini";

export default function CanceledNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const isMeetingDeleted = eventData.type === "MEETING_DELETED";

  // sse 알림 닫는 함수
  const closeHandle = () => {
    onClose();
  };

  return (
    <CanceledNoticeLayout>
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.organizerName}&nbsp;</div>
          <CategoryDiv>{isMeetingDeleted ? "canceled" : "updated"}&nbsp;</CategoryDiv>
          <div>{isMeetingDeleted ? "this event." : "an information to this event."}&nbsp;</div>
        </NoticeTitleDetail>
        <CustomMdClose size={15} onClick={closeHandle} />
      </NoticeTitle>
      <TitleLineDiv />
      <InfoDiv>
        <TitleDiv>
          {eventData.scheduleName}
          {isMeetingDeleted ? (
            ""
          ) : (
            <CategoryDiv>
              (
              {eventData.updatedFields.map((field: string, index: number) => {
                return index === eventData.updatedFields.length - 1 ? field : `${field}, `;
              })}
              )
            </CategoryDiv>
          )}
        </TitleDiv>

        <TimeDiv>
          <ConversionDateMini start={eventData.startTime} end={eventData.endTime} />
        </TimeDiv>
      </InfoDiv>
    </CanceledNoticeLayout>
  );
}

const CanceledNoticeLayout = styled.div`
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

const CategoryDiv = styled.div`
  color: ${Color("black100")};
  font-weight: 600;
  font-size: 11px;
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
  width: 18rem;
  padding-left: 1rem;
`;

const TitleDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TimeDiv = styled.div`
  font-size: 12px;
`;
