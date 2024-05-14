import { fetchWithInterceptor } from "@/shared/index";
// 일정 상세 조회 api
export function getScheduleDetails(scheduleId: number) {
  return fetchWithInterceptor("/schedule-service/schedules/" + scheduleId, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
