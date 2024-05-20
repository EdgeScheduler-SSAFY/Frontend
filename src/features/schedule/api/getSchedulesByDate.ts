import { fetchWithInterceptor } from "@/shared/index";
import { getScheduleByDateRequest } from "@/features/schedule/index";
// 특정 날짜의 일정 목록 조회 api
export function getSchedulesByDate({ startDatetime, endDatetime }: getScheduleByDateRequest) {
  return fetchWithInterceptor(
    "https://gateway.edgescheduler.co.kr/schedule-service/schedules/period?startDatetime=" +
      startDatetime +
      "&endDatetime=" +
      endDatetime,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
