import { fetchWithInterceptor } from "@/shared/index";
import { proposalAnswerRequest } from "@/features/schedule/index";

export async function proposalAnswer({
  scheduleId,
  proposalId,
  isAccepted,
}: proposalAnswerRequest) {
  const requestData = {
    isAccepted,
  };

  try {
    const res = await fetchWithInterceptor(
      `https://gateway.edgescheduler.co.kr/schedule-service/schedules/${scheduleId}/${proposalId}`,
      {
        method: "POST",
        body: JSON.stringify(requestData),
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error) {
    return false;
  }
}
