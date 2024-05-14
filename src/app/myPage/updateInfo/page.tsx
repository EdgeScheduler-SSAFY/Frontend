"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { startOfWeek, endOfWeek, format } from "date-fns";

import { WeekViewCalendar } from "@/widgets/schedule/index";
import { getSchedulesByDate } from "@/features/schedule/index";
import { schedule } from "@/widgets/schedule/model/type";

export default function UpdateInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date()); // 오늘 날짜
  const [scheduleList, setScheduleList] = useState<schedule[]>([]); // 스케줄 목록
  useEffect(() => {
    const startDatetime = startOfWeek(selectedDate); // 이번주 시작일
    const endDatetime = endOfWeek(selectedDate); // 이번주 종료일
    const fetchData = async () => {
      try {
        const response = await getSchedulesByDate({
          // api 호출 (해당 주의 스케줄 목록을 가져옴)
          startDatetime: format(startDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
          endDatetime: format(endDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
        });
        if (Array.isArray(response.scheduleList)) {
          // 받아온 데이터가 배열인 경우
          const schedules = response.scheduleList.map((schedule: schedule) => ({
            ...schedule,
            startDatetime: new Date(schedule.startDatetime),
            endDatetime: new Date(schedule.endDatetime),
          }));
          setScheduleList(schedules); // 받아온 데이터를 scheduleList에 저장
        } else {
          console.log("Received data is not an array:", response.scheduleList);
          setScheduleList([]);
        }
        setSelectedDate(selectedDate);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setScheduleList([]);
      } finally {
      }
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <WeekViewCalendar
        triggerReload={() => {}}
        scheduleList={scheduleList.filter((schedule) => schedule.type === "WORKING")} // WORKING 타입의 스케줄만 필터링
        selectedDate={selectedDate}
        isWORKING={true}
      ></WeekViewCalendar>
    </MainLayout>
  );
}
const MainLayout = styled.div`
  height: 1500px;
`;
