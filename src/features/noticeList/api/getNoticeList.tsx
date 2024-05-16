import { fetchWithInterceptor } from "@/shared/index";

export async function GetNoticeList() {
  try {
    const res = await fetchWithInterceptor(`https://gateway.edgescheduler.co.kr/notification-service/notifications/history`, {
      method: "GET",
    });
    const responseData = await res.json();
    return responseData.data;
  } catch (error) {
    console.log(error);
  }
}
