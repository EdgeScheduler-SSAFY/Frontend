import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";

export default function AttendeeResponseNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const responseType = eventData.response;
  // sse 알림 닫는 함수
  const closeHandle = () => {
    onClose();
  };

  return (
    <AttendeeResponseLayout>
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.attendeeName}&nbsp;</div>
          <CategoryDiv responseType={responseType}>
            {responseType === "ACCEPTED" ? "accepted" : "declined"}
            &nbsp;
          </CategoryDiv>
          <div>an invitation to this event.</div>
        </NoticeTitleDetail>
        <CustomMdClose size={15} onClick={closeHandle} />
      </NoticeTitle>
      <TitleLineDiv />
      <InfoDiv>
        <TitleDiv>{eventData.scheduleName}</TitleDiv>
      </InfoDiv>
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

const CategoryDiv = styled.div<{ responseType: string }>`
  color: ${(props) => (props.responseType === "ACCEPTED" ? Color("green") : Color("orange"))};
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
const TimeDiv = styled.div``;
