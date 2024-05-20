import { fetchWithInterceptor } from "@/shared/index";

export async function PostMeetingAccepted(scheduleId: number) {
  try {
    const res = await fetchWithInterceptor(
      `https://gateway.edgescheduler.co.kr/schedule-service/schedules/${scheduleId}/members/attendance`,
      {
        method: "POST",
        body: JSON.stringify({
          status: "ACCEPTED",
        }),
      }
    );
    const responseData = res;
    return responseData;
  } catch (error) {
    console.log(error);
  }
  return true;
};