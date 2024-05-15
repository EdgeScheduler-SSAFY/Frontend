import React from "react";
import Button from "@/shared/ui/button";
// 오늘 버튼 컴포넌트의 props
interface ITodayButtonProps {
  selectDate: (date: Date) => void; //날짜선택
}
// 오늘 버튼 컴포넌트
export function TodayButton({ selectDate }: ITodayButtonProps) {
  // 오늘 날짜 선택
  return <Button onClick={() => selectDate(new Date())}>today</Button>;
}
