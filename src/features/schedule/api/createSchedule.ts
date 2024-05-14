import { fetchWithInterceptor } from "@/shared/index";
import { createScheduleRequest } from "@/features/schedule/index";
// 일정 생성 api
export function createSchedule({
  organizerId,
  name,
  description,
  type,
  color,
  startDatetime,
  endDatetime,
  isPublic,
  isRecurrence,
  recurrence,
  attedeeList,
}: createScheduleRequest) {
  const data = {
    organizerId: organizerId,
    name: name || "(new)",
    description: description,
    type: type,
    color: color,
    startDatetime: startDatetime,
    endDatetime: endDatetime,
    isPublic: isPublic,
    isRecurrence: isRecurrence,
    recurrence: recurrence,
    attedeeList: attedeeList,
  };
  return fetchWithInterceptor("/schedule-service/schedules", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
