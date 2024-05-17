type RequestOptions = {
  method?: string;
  headers?: HeadersInit;
  body?: string;
};

export async function fetchWithInterceptor(url: string, options: RequestOptions = {}) {
  let accessToken = sessionStorage.getItem("accessToken");
  if (!accessToken) {
    alert("Access token is not found");
    console.log("Access token is not found");
    window.location.replace("https://edgescheduler.co.kr");
    return Promise.reject("Access token is not found");
  }

  await fetch("https://user-service.edgescheduler.co.kr/auth/me", {
    headers: { Authorization: "Bearer " + accessToken },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
      alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      sessionStorage.clear();
      window.location.replace("https://edgescheduler.co.kr");
    });

  // 토큰 갱신 확인
  const refreshToken = sessionStorage.getItem("refreshToken");
  const expiresAt = sessionStorage.getItem("expiresAt");
  if (expiresAt && new Date(expiresAt) < new Date()) {
    try {
      const refreshResponse = await fetch(
        "https://user-service.edgescheduler.co.kr/auth/token/refresh",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + accessToken,
            "refresh-Token": "Bearer " + refreshToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!refreshResponse.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await refreshResponse.json();
      if (data["access-token"]) {
        sessionStorage.setItem("accessToken", data["access-token"]);
        accessToken = data["access-token"];
      }
      if (data["refresh-token"]) {
        sessionStorage.setItem("refreshToken", data["refresh-token"]);
      }
      if (data["expires_in"]) {
        sessionStorage.setItem("expiresIn", data["expires_in"]);
        const currentTime = new Date();
        const newExpiresAt = new Date(
          currentTime.getTime() + parseInt(data["expires_in"], 10) * 1000 - 10 * 60 * 1000
        );
        sessionStorage.setItem("expiresAt", newExpiresAt.toISOString());
      }
    } catch (error) {
      console.log("Failed to refresh token", error);
      alert("토큰 갱신에 실패했습니다. 다시 로그인해주세요.");
      sessionStorage.clear();
      window.location.replace("https://edgescheduler.co.kr");
      return Promise.reject("Failed to refresh token");
    }
  }

  // 기본 헤더 설정
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
    ...options.headers,
  };

  // 요청 설정에 헤더 추가
  const finalOptions = {
    ...options,
    headers: defaultHeaders,
  };

  // 요청 보내기
  return fetch(url, finalOptions).then((response) => {
    return response;
  });
}
