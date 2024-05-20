import { fetchWithInterceptor } from "@/shared/index";

export async function PatchNoticeRead(id: string) {
  try {
    const res = await fetchWithInterceptor(`https://gateway.edgescheduler.co.kr/notification-service/notifications/read/${id}`, {
      method: "PATCH",
    });
    const responseData = await res.json();
    
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
