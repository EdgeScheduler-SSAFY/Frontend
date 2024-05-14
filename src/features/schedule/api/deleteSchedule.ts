import { fetchWithInterceptor } from "@/shared/index";
import { DeleteScheduleRequest } from "@/features/schedule/index";
// 일정 삭제 api
export function deleteSchedule({
  scheduleId,
  deleteRange,
  deleteStartDatetime,
  deleteEndDatetime,
}: DeleteScheduleRequest) {
  const data = {
    // memberId: memberId,
    scheduleId: scheduleId,
    deleteRange: deleteRange,
    deleteStartDatetime: deleteStartDatetime,
    deleteEndDatetime: deleteEndDatetime,
  };
  // 아이디
  return fetchWithInterceptor("/schedule-service/schedules/" + scheduleId, {
    method: "DELETE",
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.headers;
    })
    .then((data) => {
      return data;
    });
}
