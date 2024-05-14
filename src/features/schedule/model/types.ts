import { ReactNode } from "react";

export interface dayT {
  date: Date;
  schedules: ReactNode[] | null;
}
// 일정 생성 리퀘스트 타입
export interface createScheduleRequest {
  organizerId: number;
  name: string;
  description: string;
  type: "MEETING" | "WORKING" | "PERSONAL";
  color: number;
  startDatetime: string;
  endDatetime: string;
  isPublic: boolean;
  isRecurrence: boolean;
  recurrence?: {
    freq: "DAILY" | "WEEKLY" | "MONTHLY";
    intv: number;
    expiredDate?: string;
    count?: number;
    recurrenceDay?: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
  };
  attedeeList?: [
    {
      memberId: number;
      isRequired: boolean;
    }
  ];
}
// 일정 삭제 리퀘스트 타입
export interface DeleteScheduleRequest {
  scheduleId: number;
  deleteRange?: "ALL" | "ONE" | "AFTERALL";
  deleteStartDatetime?: string;
  deleteEndDatetime?: string;
}
// 날짜별 일정 조회 리퀘스트 타입
export interface getScheduleByDateRequest {
  startDatetime: string;
  endDatetime: string;
}
//일정 수정 리퀘스트 타입
export interface updateScheduleRequest {
  scheduleId: number;
  organizerId: number;
  name: string;
  description: string;
  type: "MEETING" | "WORKING" | "PERSONAL";
  color: number;
  startDatetime: string;
  endDatetime: string;
  parentStartDatetime: string;
  parentEndDatetime: string;
  isPublic: boolean;
  isRecurrence: boolean;
  isOneOff: boolean;
  nameIsChanged: boolean;
  descriptionIsChanged: boolean;
  timeIsChanged: boolean;
  recurrence?: {
    freq: "DAILY" | "WEEKLY" | "MONTHLY";
    intv: number;
    expiredDate?: string;
    count?: number;
    recurrenceDay?: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
  };
  attedeeList?: {
    memberId: number;
    isRequired: boolean;
  }[];
}
//일정 상세 리스폰스 타입
export interface getScheduleDetailsResponse {
  scheduleId: number;
  name: string;
  organizerId: number;
  description: string;
  color: number;
  type: "MEETING" | "WORKING" | "PERSONAL";
  startDatetime: string | Date;
  endDatetime: string | Date;
  isPublic: boolean;
  attendeeList: [
    {
      memberId: number;
      memberName: string;
      isRequired: boolean;
      status: string;
      reason: string;
      proposal: {
        proposalId: number;
        startDatetime: string;
        endDatetime: string;
      };
    }
  ];
  recurrenceDetails: {
    freq: "DAILY" | "WEEKLY" | "MONTHLY";
    intv: number;
    expiredDate: string;
    count: number;
    recurrenceDay: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
  };
}
