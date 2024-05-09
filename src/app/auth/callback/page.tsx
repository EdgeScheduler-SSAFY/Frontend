"use client";
import React, { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
function PageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && searchParams) {
      const refreshToken = searchParams.get("refresh-token") || "";
      const accessToken = searchParams.get("access-token") || "";
      const expiresIn = searchParams.get("expires_in") || "";

      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("expiresIn", expiresIn);

      if (expiresIn) {
        const currentTime = new Date();
        const expiresAt = new Date(
          currentTime.getTime() + parseInt(expiresIn, 10) * 1000 - 10 * 60 * 1000
        );
        sessionStorage.setItem("expiresAt", expiresAt.toISOString());
      }

      router.push("/");
    }
  }, [searchParams, router]);

  return <div></div>;
}
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
