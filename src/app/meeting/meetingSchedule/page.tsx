"use client";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { LuChevronLeftSquare, LuChevronRightSquare } from "react-icons/lu";

import ScheduleComponent from "./scheduleComponent";
import { Color } from "@/shared/lib/styles/color";
import RecommendTypeSetButton from "@/features/meetingSchedule/ui/RecommendTypeSetButton";
import CancelButton from "@/features/meetingSchedule/ui/CancelButton";
import SubmitButton from "@/features/meetingSchedule/ui/SubmitButton";
import useMeetStore, { MeetState } from "@/store/meetStore";
import { fetchWithInterceptor } from "@/shared";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function MeetingSchedule() {
  const { startDatetime, endDatetime, runningtime, memberList } = useMeetStore(
    (state: MeetState) => state
  );

  console.log(startDatetime, endDatetime, runningtime, memberList);

  const todayDate = new Date();
  const [date, setDate] = useState<Date>(todayDate);
  const [startDate, setStartDate] = useState<string>(
    date.getFullYear() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getDate() +
      "(" +
      days[date.getDay()] +
      ")"
  );
  const [endDate, setEndDate] = useState<string>(startDate);
  const [selectedOption, setSelectedOption] = useState(0);
  const [startIndex, setStartIndex] = useState<number>(-2);
  const [startTime, setStartTime] = useState<string>("AM 00:00");
  const [endTime, setEndTime] = useState<string>("AM 01:00");
  const [endIndex, setEndIndex] = useState<number>(-2);

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };
  const handleGoToPastDay = () => {
    let pastDate = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    let startOfNowDate = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate()
    );
    if (pastDate >= startOfNowDate) {
      let tmpDate =
        pastDate.getFullYear() +
        "." +
        (pastDate.getMonth() + 1) +
        "." +
        pastDate.getDate() +
        "(" +
        days[pastDate.getDay()] +
        ")";
      setDate(pastDate);
      setStartDate(tmpDate);
      setEndDate(tmpDate);
    }
  };

  const handleGoToNextDay = () => {
    let nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    let tmpDate =
      nextDate.getFullYear() +
      "." +
      (nextDate.getMonth() + 1) +
      "." +
      nextDate.getDate() +
      "(" +
      days[nextDate.getDay()] +
      ")";
    setDate(nextDate);
    setStartDate(tmpDate);
    setEndDate(tmpDate);
  };

  useEffect(() => {
    if (startIndex >= 0) {
      changeDate(date, startIndex) &&
        setStartDate(changeDate(date, startIndex));
      setStartTime(changeTime(startIndex));
    }
  }, [startIndex, date]);

  useEffect(() => {
    if (endIndex >= 0) {
      changeDate(date, endIndex) && setEndDate(changeDate(date, endIndex));
      setEndTime(changeTime(endIndex));
    }
  }, [endIndex, date]);

  const changeDate = (date: Date, timeIndex: number) => {
    if (timeIndex > 95) {
      const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      const tmpDate =
        nextDate.getFullYear() +
        "." +
        (nextDate.getMonth() + 1) +
        "." +
        nextDate.getDate() +
        "(" +
        days[nextDate.getDay()] +
        ")";
      return tmpDate;
    } else {
      const tmpDate =
        date.getFullYear() +
        "." +
        (date.getMonth() + 1) +
        "." +
        date.getDate() +
        "(" +
        days[date.getDay()] +
        ")";
      return tmpDate;
    }
  };
  const changeTime = (timeIndex: number) => {
    let nowTime = "";
    if (timeIndex < 96 && timeIndex >= 48) {
      nowTime += "PM ";
    } else {
      nowTime += "AM ";
    }
    if (
      (timeIndex >= 0 && timeIndex < 4) ||
      (timeIndex >= 48 && timeIndex < 52) ||
      (timeIndex >= 96 && timeIndex < 100)
    ) {
      nowTime += "12:";
    } else {
      nowTime += Math.floor((timeIndex % 96) / 4) + ":";
    }
    if (timeIndex % 4 === 0) {
      nowTime += "00";
    } else {
      nowTime += (timeIndex % 4) * 15;
    }
    return nowTime;
  };

  useEffect(() => {
    
    const recData = async() => {
      try {
        const res = await fetchWithInterceptor("https://gateway.edgescheduler.co.kr//schedule-service/schedules/members/calculate-time-availability", {
      method: "POST", 
      body: JSON.stringify({
        organizerId: null,
        startDatetime: startDatetime,
        endDatetime: endDatetime,
        runningTime: runningtime,
        memberList: memberList
      }),
    });
    const data = await res.json();
    console.log("hi");
    console.log(data);
    } catch (error) {
      console.log(error)
    }}
    recData();
  }, []);
  return (
    <MainLayout>
      <HeaderLayout>
        <DateLayout>
          <DateinDateDiv>Date</DateinDateDiv>
          <TimeSelectionLayout>
            <DateDiv data-testid="startDate">{startDate}</DateDiv>
            <TimeButton>
              <div>{startTime}</div>
              <IoMdArrowDropdown />
            </TimeButton>
            <HypoonDiv>-</HypoonDiv>
            <DateDiv data-testid="endDate">{endDate}</DateDiv>
            <TimeButton>
              <div>{endTime}</div>
              <IoMdArrowDropdown />
            </TimeButton>
          </TimeSelectionLayout>
        </DateLayout>
        <OptionLayout>
          <RecommendTypeSetButton
            selected={selectedOption === 0}
            onClick={() => handleOptionClick(0)}
          >
            fatest
          </RecommendTypeSetButton>
          <RecommendTypeSetButton
            selected={selectedOption === 1}
            onClick={() => handleOptionClick(1)}
          >
            minimum
            <br /> absentees
          </RecommendTypeSetButton>
          <RecommendTypeSetButton
            selected={selectedOption === 2}
            onClick={() => handleOptionClick(2)}
          >
            excellent
            <br /> satisfaction
          </RecommendTypeSetButton>
        </OptionLayout>
      </HeaderLayout>
      <ScheduleHeaderLayout>
        <ScheduleHeaderTime>
          <TimeChangeButton
            onClick={handleGoToPastDay}
            data-testid="goToPastDayButton"
          >
            <LuChevronLeftSquare />
          </TimeChangeButton>
          <TimeDiv data-testid="nowDate">
            {date.getFullYear() +
              "." +
              (date.getMonth() + 1) +
              "." +
              date.getDate() +
              "(" +
              days[date.getDay()] +
              ")"}
          </TimeDiv>
          <TimeChangeButton
            onClick={handleGoToNextDay}
            data-testid="goToNextDayButton"
          >
            <LuChevronRightSquare />
          </TimeChangeButton>
        </ScheduleHeaderTime>
        <ScheduleHeaderExp>
          <WorkingScheduleLayout>
            <WorkingDiv />
            Worktime
            <ScheduleDiv />
            Scheduled
          </WorkingScheduleLayout>
          <DetailDiv>
            * Hover over the scheduled event area to view details.
          </DetailDiv>
        </ScheduleHeaderExp>
      </ScheduleHeaderLayout>
      <ScheduleComponent
        setParentStartIndex={(timeIndex: number) => setStartIndex(timeIndex)}
        setParentEndIndex={(timeIndex: number) => setEndIndex(timeIndex)}
      />

      <ButtonsLayout>
        <CancelButton>Cancel</CancelButton>
        <SubmitButton>Submit</SubmitButton>
      </ButtonsLayout>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 10rem;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: full;
`;

const DateLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionLayout = styled.div`
  display: flex;
  height: full;
  align-items: center;
  justify-content: center;
  text-align: right;
`;

const DateDiv = styled.div`
  display: flex;
  width: 8rem;

  min-height: 2.5rem;
  border: 1px solid gray;
  padding-top: auto;
  padding-bottom: auto;
  padding-left: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  align-items: center;
`;

const TimeButton = styled.button`
  display: flex;
  min-height: 2.5rem;
  border: 1px solid gray;
  width: 7rem;
  font-size: 1rem;
  padding-right: 8px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;
const DateinDateDiv = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

const TimeSelectionLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
`;

const HypoonDiv = styled.div`
  height: full;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const ScheduleHeaderLayout = styled.div`
  width: full;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const ScheduleHeaderTime = styled.div`
  display: flex;
  gap: 2rem;
  font-weight: bold;
  font-size: 17px;
  padding-left: 3rem;
  align-items: center;
`;

const ScheduleHeaderExp = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  column-gap: 10px;
`;

const TimeChangeButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  font-size: 25px;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
`;

const DetailDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: small;
`;

const WorkingDiv = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${Color("green100")};
`;

const ScheduleDiv = styled(WorkingDiv)`
  width: 20px;
  height: 20px;
  background-color: ${Color("orange100")};
`;

const WorkingScheduleLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 5px;
`;

const TimeDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 7rem;
  padding-bottom: 4px;
`;

const ButtonsLayout = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 1rem;
  gap: 2rem;
`;
