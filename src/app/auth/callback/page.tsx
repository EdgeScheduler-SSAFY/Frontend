"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const refreshToken = Array.isArray(router.query["refresh-token"])
      ? router.query["refresh-token"][0]
      : router.query["refresh-token"] || "";
    const accessToken = Array.isArray(router.query["access-token"])
      ? router.query["access-token"][0]
      : router.query["access-token"] || "";
    const expiresIn = Array.isArray(router.query["expires_in"])
      ? router.query["expires_in"][0]
      : router.query["expires_in"] || "";
    sessionStorage.setItem("refreshToken", refreshToken || "");
    sessionStorage.setItem("accessToken", accessToken || "");
    sessionStorage.setItem("expiresIn", expiresIn || "");
    if (expiresIn) {
      const currentTime = new Date();
      const expiresAt = new Date(
        currentTime.getTime() + parseInt(expiresIn, 10) * 1000 - 10 * 60 * 1000
      );
      sessionStorage.setItem("expiresAt", expiresAt.toISOString());
    }
    router.push("/");
  }, [router.query]);
  return <div></div>;
}
