import { fetchWithInterceptor } from "@/shared/index";

export async function PostMeetingAccepted(scheduleId: number) {
  try {
    // await fetchWithInterceptor(`https://gateway.edgescheduler.co.kr/schedule-service/schedules/${scheduleId}/members/attendance`, {
    const res = await fetchWithInterceptor(
      `https://gateway.edgescheduler.co.kr/schedule-service/schedules/89/members/attendance`,
      {
        method: "POST",
        body: JSON.stringify({
          status: "ACCEPTED",
        }),
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
  return true;
};