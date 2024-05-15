import { fetchWithInterceptor } from "@/shared/index";
import {
  searchAvailableAttendeesRequest,
  searchAvailableAttendeesResponse,
} from "@/features/schedule/index";

export async function searchAvailableAttendees({
  scheduleId,
  endDatetime,
  startDatetime,
}: searchAvailableAttendeesRequest) {
  const requestData = {
    scheduleId,
    startDatetime,
    endDatetime,
  };

  try {
    const res = await fetchWithInterceptor(
      `https://gateway.edgescheduler.co.kr/schedule-service/schedules/calculate-time-availability-with-proposal`,
      {
        method: "POST",
        body: JSON.stringify(requestData),
      }
    );

    const responseData: searchAvailableAttendeesResponse = await res.json();
    return responseData;
  } catch (error) {
    return false;
  }
}
