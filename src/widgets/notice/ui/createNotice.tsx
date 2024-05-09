import styled, { keyframes } from "styled-components";
import { getDay } from "date-fns";
import { MdClose } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";

export default function CreateNotice({ eventData, onClose }: { eventData: any; onClose: () => void }) {
  const dayList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MonthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [startDate, startTime] = eventData.startTime.split("T");
  const [endDate, endTime] = eventData.endTime.split("T");
  const [year, month, date] = startDate.split("-");
  const day = getDay(new Date(startDate));

  const closeHandle = () => {
    onClose();
  };

  return (
    <CreateNoticeLayout>
      <NoticeTitle>
        <NoticeTitleDetail>
          <div>{eventData.organizerName}&nbsp;</div>
          <CategoryDiv>sent a request&nbsp;</CategoryDiv>
          <div>to attend the meeting.</div>
        </NoticeTitleDetail>
        <CustomMdClose size={15} onClick={closeHandle} />
      </NoticeTitle>
      <TitleLineDiv />
      <NoticeContent>
        <ScheduleDiv>
          <MonthDiv>{MonthList[parseInt(month) - 1]}</MonthDiv>
          <DateDiv>{date}</DateDiv>
          <DotLineDiv />
          <DayDiv>{dayList[day]}</DayDiv>
        </ScheduleDiv>
        <LineDiv />
        <InfoDiv>
          <TitleDiv>{eventData.scheduleName}</TitleDiv>
          <TimeDiv>
            {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
          </TimeDiv>
        </InfoDiv>
      </NoticeContent>
    </CreateNoticeLayout>
  );
}

const CreateNoticeLayout = styled.div`
  width: 20rem;
  height: 8rem;
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

const NoticeTitleDetail = styled.div`
  display: flex;
  align-items: center;
`;

const CustomMdClose = styled(MdClose)`
  cursor: pointer;
`;

const CategoryDiv = styled.div`
  color: ${Color("blue")};
  font-weight: 600;
`;

const TitleLineDiv = styled.hr`
  width: 90%;
  margin: 0.3rem 1rem;
  border: 0.5px solid ${Color("black100")};
`;
const NoticeContent = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;
`;

const ScheduleDiv = styled.div`
  width: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const MonthDiv = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const DateDiv = styled.div`
  font-size: 16px;
  font-weight: 900;
`;

const DotLineDiv = styled.hr`
  width: 80%;
  margin: 0;
  border: 0.5px dashed ${Color("black100")};
`;

const DayDiv = styled.div``;

const LineDiv = styled.div`
  width: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 10px;
  background-color: ${Color("blue")};
`;

const InfoDiv = styled.div``;

const TitleDiv = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
const TimeDiv = styled.div``;
