"use client";
import React, { useEffect } from "react";
import LoginResponse from "./LoginResponse";
export default function Page() {
  useEffect(() => {
    LoginResponse();
  }, []);
  return <div></div>;
}
