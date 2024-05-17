"use client";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";
import React, { Fragment, use, useEffect, useState } from "react";
import { LuChevronLeftSquare, LuChevronRightSquare } from "react-icons/lu";
import { MiniCalendar, fetchWithInterceptor } from "@/shared";
import DateFormat from "@/shared/lib/dateFormat";
import SelectTime from "@/shared/ui/selectTime";
import { intervalTimeExtended, dayList } from "@/shared/lib/data";
import ScheduleComponent from "./scheduleComponent";
import { Color } from "@/shared/lib/styles/color";
import RecommendTypeSetButton from "@/features/meetingSchedule/ui/RecommendTypeSetButton";
import CancelButton from "@/features/meetingSchedule/ui/CancelButton";
import SubmitButton from "@/features/meetingSchedule/ui/SubmitButton";
import useMeetStore, { MeetState } from "@/store/meetStore";
import { SchedulesAndAvailabilitiesProps } from "@/shared/lib/type";
import {
  updateSchedule,
  getScheduleDetails,
  getScheduleDetailsResponse,
} from "@/features/schedule/index";
import { useRouter } from "next/navigation";
import { addMinutes, format } from "date-fns";

type Member = {
  memberId: number;
  isRequired: boolean;
};

type Recommended = {
  fastest: { startIndex: number; endIndex: number }[];
  minimumAbsentees: { startIndex: number; endIndex: number }[];
  excellentSatisfaction: { startIndex: number; endIndex: number }[];
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function MeetingSchedule() {
  const {
    meetName,
    description,
    dayCount,
    startDatetime,
    endDatetime,
    runningtime,
    memberList,
    zuStartIndex,
    zuEndIndex,
    setDayCount,
    setZuStartIndex,
    setZuEndIndex,
    isUpdate,
    scheduleId,
  } = useMeetStore((state: MeetState) => state);
  const todayDate = new Date(startDatetime); // 회의 추천받는 시작 날짜
  const finalDate = new Date(endDatetime); // 회의 추천받는 시작 날짜
  const [date, setDate] = useState<Date>(todayDate); // 현재 날짜
  const [recommededTime, setRecommendedTime] = useState<Recommended>({
    fastest: [],
    minimumAbsentees: [],
    excellentSatisfaction: [],
  }); // 추천 시간 [사람][시간]
  const [selectedRecommend, setSelectedRecommend] = useState<
    { startIndex: number; endIndex: number }[]
  >(recommededTime.fastest);
  const [startDate, setStartDate] = useState<string>(
    date.getFullYear() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getDate() +
      "(" +
      days[date.getDay()] +
      ")"
  ); // 시작 날짜

  const router = useRouter();
  const [schedulesAndAvailabilities, setSchedulesAndAvailabilities] = useState<
    SchedulesAndAvailabilitiesProps[]
  >([]);
  const [showStartMiniCalendar, setShowStartMiniCalendar] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<string>(startDate);
  const [selectedOption, setSelectedOption] = useState(0);
  const [startTime, setStartTime] = useState<string>("AM 00:00");
  const [endTime, setEndTime] = useState<string>("AM 01:00");
  const start = new Date(startDatetime);
  const dateWithNoTime = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const [selectedDate, setSelectedDate] = useState<Date>(dateWithNoTime);
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

    //startDatetime과 selectedDate의 차이를 구해서 dayCount를 변경
    const startDate = new Date(startDatetime.split("T")[0] + "T00:00:00");
    const diff = Math.floor((selectedDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    setDayCount(diff);
  }; //달력에서 고를때

  // 시작시간 값이 변경될 때 실행될 함수
  const startTimeChangeHandle = (value: number | string) => {
    setDisabledIndex(intervalTimeExtended.findIndex((option) => option.value === value));
  };

  // 끝시간 값이 변경될 때 실행될 함수
  const endTimeChangeHandle = (value: number | string) => {};

  const handleOptionClick = (
    index: number,
    type: "fastest" | "minimumAbsentees" | "excellentSatisfaction"
  ) => {
    setSelectedOption(index);
    setSelectedRecommend(recommededTime[type]);
  };
  const handleGoToPastDay = () => {
    let pastDate = new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000);
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
        dayList[pastDate.getDay()] +
        ")";
      setSelectedDate(pastDate);
      setStartDate(tmpDate);
      setEndDate(tmpDate);
      setDayCount(dayCount - 1);
    }
  };

  const handleGoToNextDay = () => {
    let nextDate = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000);
    let endOfNowDate = new Date(finalDate);
    if (nextDate <= endOfNowDate) {
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
      setDayCount(dayCount + 1);
    }
  };

  const submitHandler = async () => {
    const meetingStartTime = format(
      addMinutes(startDatetime, (dayCount * 96 + zuStartIndex) * 15),
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    const meetingEndTime = format(
      addMinutes(startDatetime, (dayCount * 96 + zuEndIndex) * 15),
      "yyyy-MM-dd'T'HH:mm:ss"
    );
    console.log(meetingStartTime, meetingEndTime);
    if (isUpdate) {
      const res: getScheduleDetailsResponse = await getScheduleDetails(scheduleId);
      updateSchedule({
        scheduleId: scheduleId,
        organizerId: memberList[0].user.id,
        name: meetName,
        description: description,
        type: "MEETING",
        color: 4,
        startDatetime: meetingStartTime,
        endDatetime: meetingEndTime,
        isPublic: true,
        isRecurrence: false,
        isOneOff: false,
        nameIsChanged: meetName !== res.name,
        descriptionIsChanged: description !== res.description,
        timeIsChanged: res.startDatetime !== meetingStartTime || res.endDatetime !== meetingEndTime,
        attendeeList: memberList.map((member) => {
          return {
            memberId: member.user.id,
            isRequired: member.isRequired,
          };
        }),
        parentEndDatetime: res.startDatetime as string,
        parentStartDatetime: res.endDatetime as string,
      });
      router.push("/");
      return;
    }
    try {
      fetchWithInterceptor("https://gateway.edgescheduler.co.kr/schedule-service/schedules", {
        method: "POST",
        body: JSON.stringify({
          organizerId: memberList[0].user.id,
          name: meetName,
          description: description,
          type: "MEETING",
          color: 4,
          startDatetime: meetingStartTime,
          endDatetime: meetingEndTime,
          isPublic: true,
          isRecurrence: false,
          attendeeList: memberList.map((member) => {
            return {
              memberId: member.user.id,
              isRequired: member.isRequired,
            };
          }),
        }),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (zuStartIndex >= 0) {
      changeDate(selectedDate, zuStartIndex) &&
        setStartDate(changeDate(selectedDate, zuStartIndex));
      setDisabledIndex(zuStartIndex);
      setStartTime(changeTime(zuStartIndex));
    }
  }, [zuStartIndex, selectedDate]);

  useEffect(() => {
    if (zuEndIndex >= 0) {
      changeDate(selectedDate, zuEndIndex) && setEndDate(changeDate(selectedDate, zuEndIndex));
      setEndTime(changeTime(zuEndIndex));
    }
  }, [zuEndIndex, selectedDate]);

  useEffect(() => {
    console.log("dayCount", dayCount);
  }, [dayCount]);

  useEffect(() => {
    setDayCount(0);
  }, [setDayCount]);

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
        date.getFullYear() +
        "." +
        (date.getMonth() + 1) +
        "." +
        date.getDate() +
        "(" +
        dayList[date.getDay()] +
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
    // console.log("startDatetime", startDatetime);
    // console.log("endDatetime", endDatetime);
    const recData = async () => {
      const apiMemberList: Member[] = [];
      memberList.forEach((member) => {
        apiMemberList.push({
          memberId: member.user.id,
          isRequired: member.isRequired,
        });
      });

      try {
        const res = await fetchWithInterceptor(
          "https://gateway.edgescheduler.co.kr/schedule-service/schedules/members/calculate-time-availability",
          {
            method: "POST",
            body: JSON.stringify({
              organizerId: "",
              startDatetime: startDatetime,
              endDatetime: endDatetime,
              runningTime: runningtime,
              memberList: apiMemberList,
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        data.fastestMeetings.forEach(
          (time: { startIndexInclusive: number; endIndexExclusive: number }) => {
            setRecommendedTime((prev) => ({
              ...prev,
              fastest: [
                ...prev.fastest,
                {
                  startIndex: time.startIndexInclusive,
                  endIndex: time.endIndexExclusive,
                },
              ],
            }));
            setSelectedRecommend((prev) => [
              ...prev,
              {
                startIndex: time.startIndexInclusive,
                endIndex: time.endIndexExclusive,
              },
            ]);
          }
        );

        // 초기값은 fatest로 기록
        data.mostParticipantsMeetings.forEach(
          (time: { startIndexInclusive: number; endIndexExclusive: number }) => {
            setRecommendedTime((prev) => ({
              ...prev,
              minimumAbsentees: [
                ...prev.minimumAbsentees,
                {
                  startIndex: time.startIndexInclusive,
                  endIndex: time.endIndexExclusive,
                },
              ],
            }));
          }
        );
        data.mostParticipantsInWorkingHourMeetings.forEach(
          (time: { startIndexInclusive: number; endIndexExclusive: number }) => {
            setRecommendedTime((prev) => ({
              ...prev,
              excellentSatisfaction: [
                ...prev.excellentSatisfaction,
                {
                  startIndex: time.startIndexInclusive,
                  endIndex: time.endIndexExclusive,
                },
              ],
            }));
          }
        );
        setSchedulesAndAvailabilities(data.schedulesAndAvailabilities);

        // 추천 데이터 받아오고 기록
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    recData();
  }, [startDatetime, endDatetime, runningtime, memberList]);

  // useEffect(() => {
  //   console.log("startIndex : " + startIndex);
  //   console.log("endIndex : " + endIndex);
  // }, [startIndex, endIndex]);

  useEffect(() => {
    console.log(new Date(endDatetime));
  }, [endDatetime]);
  return (
    <MainLayout>
      {isUpdate ? <h1>Update Meeting</h1> : <h1>Create Meeting</h1>}
      <HeaderLayout>
        <DateLayout>
          <DateinDateDiv>Date</DateinDateDiv>
          <TimeSelectionLayout>
            <DateDiv data-testid="startDate">{startDate}</DateDiv>
            <SelectTime
              options={intervalTimeExtended}
              show={false}
              width={7}
              onSelectChange={startTimeChangeHandle}
              standardIdx={zuStartIndex <= 0 ? 0 : zuStartIndex}
              disabledLastIndex={intervalTimeExtended.length - 1}
              onStartIndexChange={(value: number) => setZuStartIndex(value)}
            ></SelectTime>
            <HypoonDiv>-</HypoonDiv>
            <DateDiv data-testid="endDate">{endDate}</DateDiv>
            <SelectTime
              options={intervalTimeExtended}
              show={false}
              width={7}
              onSelectChange={endTimeChangeHandle}
              standardIdx={zuEndIndex <= 0 ? 0 : zuEndIndex}
              disabledIndex={disabledIndex}
              onEndIndexChange={(value: number) => setZuEndIndex(value)}
            ></SelectTime>
          </TimeSelectionLayout>
        </DateLayout>
        <OptionLayout>
          <RecommendTypeSetButton
            selected={selectedOption === 0}
            onClick={() => handleOptionClick(0, "fastest")}
          >
            fastest
          </RecommendTypeSetButton>
          <RecommendTypeSetButton
            selected={selectedOption === 1}
            onClick={() => handleOptionClick(1, "minimumAbsentees")}
          >
            minimum
            <br /> absentees
          </RecommendTypeSetButton>
          <RecommendTypeSetButton
            selected={selectedOption === 2}
            onClick={() => handleOptionClick(2, "excellentSatisfaction")}
          >
            excellent
            <br /> satisfaction
          </RecommendTypeSetButton>
        </OptionLayout>
      </HeaderLayout>
      <ScheduleHeaderLayout>
        <ScheduleHeaderTime>
          <TimeChangeButton onClick={handleGoToPastDay} data-testid="goToPastDayButton">
            <LuChevronLeftSquare />
          </TimeChangeButton>
          <TimeDiv data-testid="nowDate">
            <DateButton onClick={() => setShowStartMiniCalendar((prev) => !prev)}>
              <DateFormat selectedDate={selectedDate} />
            </DateButton>
            {showStartMiniCalendar && (
              <CalendarDiv>
                <MiniCalendar
                  selectDate={DateHandle}
                  selectedDate={selectedDate}
                  close={() => setShowStartMiniCalendar(false)}
                  view="day"
                  $standardDate={dateWithNoTime}
                  $endDate={new Date(endDatetime)}
                />
              </CalendarDiv>
            )}
          </TimeDiv>
          <TimeChangeButton onClick={handleGoToNextDay} data-testid="goToNextDayButton">
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
        dayCount={dayCount}
        recommendedTimes={selectedRecommend}
        schedulesAndAvailabilities={schedulesAndAvailabilities}
      />
      <ButtonAndRecommendLayout>
        <RecommendLayout>
          {selectedRecommend.map((indexes: { startIndex: number; endIndex: number }, i: number) => {
            let startDate = new Date(startDatetime);
            let endDate = new Date(startDatetime);
            startDate.setMinutes(date.getMinutes() + indexes.startIndex * 15);
            endDate.setMinutes(date.getMinutes() + indexes.endIndex * 15);
            return (
              <RecTimeLayout key={i}>
                {`추천시간 ${i + 1}. ${startDate.toISOString().slice(0, 19)} ~ ${endDate
                  .toISOString()
                  .slice(0, 19)}`}
              </RecTimeLayout>
            );
          })}
        </RecommendLayout>
        <ButtonLayout>
          <CancelButton onClick={() => router.push("/")}>Cancel</CancelButton>
          <SubmitButton onClick={() => submitHandler()}>Submit</SubmitButton>
        </ButtonLayout>
      </ButtonAndRecommendLayout>
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

const ButtonAndRecommendLayout = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonLayout = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 1rem;
  gap: 2rem;
`;

const RecommendLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecTimeLayout = styled.div`
  display: flex;
  flex-direction: column;
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
