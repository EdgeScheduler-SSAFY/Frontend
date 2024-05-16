import { fetchWithInterceptor } from "@/shared/index";

export async function GetNotificationData(page: number) {
  try {
    const res = await fetchWithInterceptor(
      `https://gateway.edgescheduler.co.kr/notification-service/notifications/page?page=${page}&size=5`,
      {
        method: "GET",
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}