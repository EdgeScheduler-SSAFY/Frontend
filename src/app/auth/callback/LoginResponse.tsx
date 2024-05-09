"use client";
import { useSearchParams, useRouter } from "next/navigation";
export default function LoginResponse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshToken = searchParams?.get("refresh-token") ?? "";
  const accessToken = searchParams?.get("access-token") ?? "";
  const expiresIn = searchParams?.get("expires_in") ?? "";

  sessionStorage.setItem("refreshToken", refreshToken);
  sessionStorage.setItem("accessToken", accessToken);
  sessionStorage.setItem("expiresIn", expiresIn);

  if (expiresIn) {
    const currentTime = new Date();
    const expiresAt: Date = new Date(
      currentTime.getTime() + parseInt(expiresIn, 10) * 1000 - 10 * 60 * 1000
    );
    sessionStorage.setItem("expiresAt", expiresAt.toISOString());
  }

  router.push("/");
}
