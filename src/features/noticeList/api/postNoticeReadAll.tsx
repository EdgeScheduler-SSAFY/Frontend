import { fetchWithInterceptor } from "@/shared/index";

export async function PostNoticeReadAll(noticeIds: string[]) {
  try {
    const res = await fetchWithInterceptor(
      "https://gateway.edgescheduler.co.kr/notification-service/notifications/read-all",
      {
        method: "POST",
        body: JSON.stringify({
          ids: noticeIds,
        }),
      }
    );
    const responseData = await res.json();
    return responseData;
  } catch (error) {
    console.log(error);
  }
}
