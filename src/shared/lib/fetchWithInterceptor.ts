type RequestOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: string;
};
export async function fetchWithInterceptor(url: string, options: RequestOptions = {}) {
  let accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    console.log("access token is not found");
    window.location.replace("https://edgescheduler.co.kr");
    return Promise.reject("access token is not found");
  }
  const response = await fetch("https://user-service.edgescheduler.co.kr/auth/me", {
    headers: { Authorization: "Bearer " + accessToken },
  });

  if (response.status === 401) {
    alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
    window.location.replace("https://edgescheduler.co.kr");
    return Promise.reject("Unauthorized"); // 프로미스 체인 종료
  }

  const refreshToken = sessionStorage.getItem("refreshToken");
  const expiresAt = sessionStorage.getItem("expiresAt");
  if (expiresAt && new Date(expiresAt) < new Date()) {
    await fetch("https://user-service.edgescheduler.co.kr/auth/token/refresh", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "refresh-Token": "Bearer " + refreshToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data["access-token"] && sessionStorage.setItem("accessToken", data["access-token"]);
        data["refresh-token"] && sessionStorage.setItem("refreshToken", data["refresh-token"]);
        data["expires_in"] && sessionStorage.setItem("expiresIn", data["expires_in"]);
        const expiresIn = sessionStorage.getItem("expiresIn");
        if (expiresIn) {
          const currentTime = new Date();
          const expiresAt: Date = new Date(
            currentTime.getTime() + parseInt(expiresIn, 10) - 10 * 60 * 1000
          );
          sessionStorage.setItem("expiresAt", expiresAt.toISOString());
        }
      })
      .catch((error) => {
        window.location.replace("https://edgescheduler.co.kr");
      });
    accessToken = sessionStorage.getItem("accessToken");
  }
  // 기본 헤더 설정
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
    ...options.headers,
  };
  //url 설정
  // 요청 설정에 헤더 추가
  const finalOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
    },
  };

  // 요청 보내기
  return fetch(url, finalOptions).then((response) => {
    return response;
  });
}
