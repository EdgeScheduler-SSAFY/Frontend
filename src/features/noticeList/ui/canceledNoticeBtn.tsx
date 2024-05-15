"use client";
import React, { useState } from "react";
import styled from "styled-components";

import { Color } from "@/shared/lib/styles/color";
import { PatchNoticeRead } from "../api/patchNoticeRead";
import ConversionDateMini from "../model/conversionDateMini";
import useNoticeStore from "@/store/noticeStore";

export default function CanceledNoticeBtn({ data }: { data: any }) {
  const noticeCount = useNoticeStore((state) => state.noticeCount);
  const setNoticeCount = useNoticeStore((state) => state.setNoticeCount);
  const isMeetingDeleted = data.type === "MEETING_DELETED";
  const [isRead, setIsRead] = useState<boolean>(data.isRead);

  const isReadHandle = async (isRead: boolean, id: string) => {
    if (!isRead) {
      try {
        await PatchNoticeRead(id);
        setIsRead(true);
        setNoticeCount(noticeCount - 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <CanceledNoticeLayout
      $isRead={isRead}
      onClick={() => {
        isReadHandle(isRead, data.id);
      }}
    >
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{data.organizerName}&nbsp;</div>
          <CategoryDiv>{isMeetingDeleted ? "canceled" : "updated"}&nbsp;</CategoryDiv>
          <div>{isMeetingDeleted ? "this event." : "an information to this event."}&nbsp;</div>
        </NoticeTitleDetail>
      </NoticeTitle>
      <TitleLineDiv />
      <NoticeContent>
        <InfoDiv>
          <TitleDiv>
            {data.scheduleName}{" "}
            {isMeetingDeleted ? (
              ""
            ) : (
              <CategoryDiv>
                (
                {data.updatedFields.map((field: string, index: number) => {
                  return index === data.updatedFields.length - 1 ? field : `${field}, `;
                })}
                )
              </CategoryDiv>
            )}
          </TitleDiv>

          <TimeDiv>
            <ConversionDateMini start={data.startTime} end={data.endTime} />
          </TimeDiv>
        </InfoDiv>
      </NoticeContent>
    </CanceledNoticeLayout>
  );
}

const CanceledNoticeLayout = styled.div<{ $isRead: boolean }>`
  width: 17rem;
  height: 4rem;
  border: 2px solid ${Color("black100")};
  border-radius: 10px;
  background-color: ${(props) => (props.$isRead ? Color("black50") : "white")};
  font-size: 13px;
  margin-bottom: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${Color("black50")};
  }
`;

const NoticeTitle = styled.div`
  font-size: 11px;
  width: 17rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-top: 0.3rem;
`;

const NoticeTitleDetail = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryDiv = styled.div`
  color: ${Color("black100")};
  font-weight: 600;
  font-size: 11px;
`;

const TitleLineDiv = styled.hr`
  width: 90%;
  margin: 0.2rem 1rem;
  border: 0.5px solid ${Color("black100")};
`;

const NoticeContent = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
`;

const InfoDiv = styled.div`
  width: 14rem;
  height: 100%;
  margin-left: 1.2rem;
`;

const TitleDiv = styled.div`
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TimeDiv = styled.div`
  font-size: 12px;
`;
