"use client";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { LuChevronLeftSquare, LuChevronRightSquare } from "react-icons/lu";
import { BsDot } from "react-icons/bs";

import ScheduleComponent from "./scheduleComponent";
import { Color } from "@/shared/lib/styles/color";

interface OptionButtonProps {
  selected: boolean;
}

export default function Meeting() {
  const [selectedOption, setSelectedOption] = useState(0);
  const [date, setDate] = useState(new Date());
  const [startIndex, setStartIndex] = useState<number>(-2);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [endIndex, setEndIndex] = useState<number>(-2);
  useEffect(() => {
    console.log(date.getHours());
  }, [date]);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayOfWeek = date.getDay();
  let today =
    date.getFullYear() +
    "." +
    (date.getMonth() + 1) +
    "." +
    date.getDate() +
    "(" +
    days[dayOfWeek] +
    ")";
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleGoToPastDay = () => {
    let pastDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    let today = new Date();
    if (pastDay.getTime() > today.getTime()) {
      setDate(pastDay);
    }
  };

  const handleGoToNextDay = () => {
    let pastDay = new Date(date.getTime() + 24 * 60 * 60 * 1000);
    setDate(pastDay);
  };
  return (
    <MainLayout>
      <HeaderLayout>
        <DateLayout>
          <DateinDateDiv>Date</DateinDateDiv>
          <TimeSelectionLayout>
            <DateDiv>{today}</DateDiv>
            <TimeButton as="button">
              <div>PM 03:00</div>
              <IoMdArrowDropdown />
            </TimeButton>
            <HypoonDiv>-</HypoonDiv>
            <DateDiv>{today}</DateDiv>
            <TimeButton as="button">
              <div>PM 03:00</div>
              <IoMdArrowDropdown />
            </TimeButton>
          </TimeSelectionLayout>
        </DateLayout>
        <OptionLayout>
          <OptionButton
            selected={selectedOption === 0}
            onClick={() => handleOptionClick(0)}
          >
            fatest
          </OptionButton>
          <OptionButton
            selected={selectedOption === 1}
            onClick={() => handleOptionClick(1)}
          >
            minimum
            <br /> absentees
          </OptionButton>
          <OptionButton
            selected={selectedOption === 2}
            onClick={() => handleOptionClick(2)}
          >
            excellent
            <br /> satisfaction
          </OptionButton>
        </OptionLayout>
      </HeaderLayout>
      <ScheduleHeaderLayout>
        <ScheduleHeaderTime>
          <TimeChangeButton onClick={handleGoToPastDay}>
            <LuChevronLeftSquare />
          </TimeChangeButton>
          <TimeDiv>{today}</TimeDiv>
          <TimeChangeButton onClick={handleGoToNextDay}>
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
      <ScheduleComponent />
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

const OptionButton = styled.button<OptionButtonProps>`
  min-width: 8rem;
  min-height: 2.5rem;
  border: none;
  border-radius: 5px;
  padding-top: auto;
  padding-bottom: auto;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 600;
  background-color: ${({ selected }) =>
    selected ? Color("blue") : Color("black50")};
  color: ${({ selected }) => (selected ? "white" : `${Color("black")}`)};
  &:hover {
    cursor: pointer;
    background-color: ${({ selected }) =>
      selected ? Color("blue") : Color("black100")};
  }
`;

const DateDiv = styled.div`
  display: flex;
  min-width: 8rem;
  min-height: 2.5rem;
  border: 1px solid gray;
  padding-top: auto;
  padding-bottom: auto;
  padding-right: 15px;
  padding-left: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  align-items: center;
`;

const TimeButton = styled(DateDiv)`
  min-width: 4rem;
  gap: 1rem;
  padding-right: 8px;
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
  padding-bottom: 4px;
`;
