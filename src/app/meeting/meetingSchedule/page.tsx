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
import { MiniCalendar, fetchWithInterceptor } from "@/shared";
import DateFormat from "@/shared/lib/dateFormat";
import SelectTime from "@/shared/ui/selectTime";
import { intervalTime, dayList } from "@/shared/lib/data";
export default function MeetingSchedule() {
  const { startDatetime, endDatetime, runningtime, memberList } = useMeetStore((state: MeetState) => state);

  console.log(startDatetime, endDatetime, runningtime, memberList);
  const [showStartMiniCalendar, setShowStartMiniCalendar] = useState<boolean>(false);
  const todayDate = new Date();
  const [date, setDate] = useState<Date>(todayDate);
  const [startDate, setStartDate] = useState<string>(
    date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "(" + dayList[date.getDay()] + ")"
  );
  const [endDate, setEndDate] = useState<string>(startDate);
  const [selectedOption, setSelectedOption] = useState(0);
  const [startIndex, setStartIndex] = useState<number>(-2);
  const [startTime, setStartTime] = useState<string>("AM 00:00");
  const [endTime, setEndTime] = useState<string>("AM 01:00");
  const [endIndex, setEndIndex] = useState<number>(-2);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [disabledIndex, setDisabledIndex] = useState<number>(0);
  // 시작날짜 값이 변경될 때 실행될 함수
  const DateHandle = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
    let tmpDate =
      selectedDate.getFullYear() +
      "." +
      (selectedDate.getMonth() + 1) +
      "." +
      selectedDate.getDate() +
      "(" +
      dayList[selectedDate.getDay()] +
      ")";
    setStartDate(tmpDate);
    setEndDate(tmpDate);
  };

  // 시작시간 값이 변경될 때 실행될 함수
  const startTimeChangeHandle = (value: number | string) => {
    setDisabledIndex(intervalTime.findIndex((option) => option.value === value));
  };

  // 끝시간 값이 변경될 때 실행될 함수
  const endTimeChangeHandle = (value: number | string) => {};

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };
  const handleGoToPastDay = () => {
    let pastDate = new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000);
    let startOfNowDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    if (pastDate >= startOfNowDate) {
      let tmpDate =
        pastDate.getFullYear() +
        "." +
        (pastDate.getMonth() + 1) +
        "." +
        pastDate.getDate() +
        "(" +
        dayList[pastDate.getDay()] +
        ")";
      setSelectedDate(pastDate);
      setStartDate(tmpDate);
      setEndDate(tmpDate);
    }
  };

  const handleGoToNextDay = () => {
    let nextDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
    let tmpDate =
      nextDate.getFullYear() +
      "." +
      (nextDate.getMonth() + 1) +
      "." +
      nextDate.getDate() +
      "(" +
      dayList[nextDate.getDay()] +
      ")";
    setSelectedDate(nextDate);
    setStartDate(tmpDate);
    setEndDate(tmpDate);
  };

  useEffect(() => {
    if (startIndex >= 0) {
      changeDate(date, startIndex) && setStartDate(changeDate(date, startIndex));
      setDisabledIndex(startIndex);
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
        dayList[nextDate.getDay()] +
        ")";
      return tmpDate;
    } else {
      const tmpDate =
        date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "(" + dayList[date.getDay()] + ")";
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
    const recData = async () => {
      try {
        const res = await fetchWithInterceptor(
          "https://gateway.edgescheduler.co.kr//schedule-service/schedules/members/calculate-time-availability",
          {
            method: "POST",
            body: JSON.stringify({
              organizerId: null,
              startDatetime: startDatetime,
              endDatetime: endDatetime,
              runningTime: runningtime,
              memberList: memberList,
            }),
          }
        );
        const data = await res.json();
        console.log("hi");
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    recData();
  }, []);
  return (
    <MainLayout>
      <HeaderLayout>
        <DateLayout>
          <DateinDateDiv>Date</DateinDateDiv>
          <TimeSelectionLayout>
            <DateDiv data-testid='startDate'>{startDate}</DateDiv>
            <SelectTime
              options={intervalTime}
              show={false}
              width={6.5}
              onSelectChange={startTimeChangeHandle}
              standardIdx={startIndex <= 0 ? 0 : startIndex}
              disabledLastIndex={intervalTime.length - 1}
            ></SelectTime>
            <HypoonDiv>-</HypoonDiv>
            <DateDiv data-testid='endDate'>{endDate}</DateDiv>
            <SelectTime
              options={intervalTime}
              show={false}
              width={6.5}
              onSelectChange={endTimeChangeHandle}
              standardIdx={endIndex <= 0 ? 0 : endIndex}
              disabledIndex={disabledIndex}
            ></SelectTime>
          </TimeSelectionLayout>
        </DateLayout>
        <OptionLayout>
          <RecommendTypeSetButton selected={selectedOption === 0} onClick={() => handleOptionClick(0)}>
            fatest
          </RecommendTypeSetButton>
          <RecommendTypeSetButton selected={selectedOption === 1} onClick={() => handleOptionClick(1)}>
            minimum
            <br /> absentees
          </RecommendTypeSetButton>
          <RecommendTypeSetButton selected={selectedOption === 2} onClick={() => handleOptionClick(2)}>
            excellent
            <br /> satisfaction
          </RecommendTypeSetButton>
        </OptionLayout>
      </HeaderLayout>
      <ScheduleHeaderLayout>
        <ScheduleHeaderTime>
          <TimeChangeButton onClick={handleGoToPastDay} data-testid='goToPastDayButton'>
            <LuChevronLeftSquare />
          </TimeChangeButton>
          <TimeDiv data-testid='nowDate'>
            <DateButton onClick={() => setShowStartMiniCalendar((prev) => !prev)}>
              <DateFormat selectedDate={selectedDate} />
            </DateButton>
            {showStartMiniCalendar && (
              <CalendarDiv>
                <MiniCalendar
                  selectDate={DateHandle}
                  selectedDate={selectedDate}
                  close={() => setShowStartMiniCalendar(false)}
                  view='day'
                  $standardDate={new Date(new Date().setHours(0, 0, 0, 0))}
                />
              </CalendarDiv>
            )}
          </TimeDiv>
          <TimeChangeButton onClick={handleGoToNextDay} data-testid='goToNextDayButton'>
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
          <DetailDiv>* Hover over the scheduled event area to view details.</DetailDiv>
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
  width: 7rem;
  min-height: 2rem;
  border: solid 1px ${Color("black200")};
  border-radius: 3px;
  padding: 0.1rem 0.7rem;
  margin-right: 10px;
  font-size: 14px;
  align-items: center;
`;

const DateinDateDiv = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

const TimeSelectionLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  margin-left: 0.8rem;
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
  font-weight: 500;
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

const CalendarDiv = styled.div`
  position: relative;
  top: -4rem;
  left: -15rem;
`;

const DateButton = styled.div`
  width: 7rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 0.5rem;
  padding: 0.1rem 0.7rem;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
