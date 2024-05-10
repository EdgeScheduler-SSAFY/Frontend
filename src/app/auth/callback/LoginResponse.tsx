"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Fragment, Suspense, useEffect } from "react";
export default function LoginResponse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refreshToken = searchParams?.get("refresh-token") ?? "";
  const accessToken = searchParams?.get("access-token") ?? "";
  const expiresIn = searchParams?.get("expires_in") ?? "";
}
