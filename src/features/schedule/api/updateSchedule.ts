import { fetchWithInterceptor } from "@/shared/index";
import { updateScheduleRequest } from "@/features/schedule/index";
// 일정 수정 api
export function updateSchedule({
  scheduleId,
  organizerId,
  name,
  description,
  type,
  color,
  startDatetime,
  endDatetime,
  isPublic,
  isRecurrence,
  isOneOff,
  nameIsChanged,
  descriptionIsChanged,
  timeIsChanged,
  recurrence,
  attedeeList,
  parentEndDatetime,
  parentStartDatetime,
}: updateScheduleRequest) {
  const data = {
    organizerId: organizerId,
    name: name,
    description: description,
    type: type,
    color: color,
    startDatetime: startDatetime,
    endDatetime: endDatetime,
    isPublic: isPublic,
    isRecurrence: isRecurrence,
    isOneOff: isOneOff,
    nameIsChanged: nameIsChanged,
    descriptionIsChanged: descriptionIsChanged,
    timeIsChanged: timeIsChanged,
    recurrence: recurrence,
    attedeeList: attedeeList,
    parentEndDatetime: parentEndDatetime,
    parentStartDatetime: parentStartDatetime,
  };
  return fetchWithInterceptor("/schedule-service/schedules/" + scheduleId, {
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}
