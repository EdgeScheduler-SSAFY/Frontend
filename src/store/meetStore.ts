import { member, userList } from "@/shared/lib/type";
import { create } from "zustand";

// Zustand 스토어 생성

export interface MeetState {
  dayCount: number;
  meetName: string;
  startDatetime: string;
  endDatetime: string;
  runningtime: number;
  description: string;
  zuStartIndex: number;
  zuEndIndex: number;
  memberList: { user: userList; isRequired: boolean }[];
  setStartDatetime: (startdatetime: string) => void;
  setEndDatetime: (endDatetime: string) => void;
  setRunningTime: (runningtime: number) => void;
  setMemberList: (memberList: member[]) => void;
  setMeetName: (meetName: string) => void;
  setDescription: (description: string) => void;
  setZuStartIndex: (startIndex: number) => void;
  setZuEndIndex: (endIndex: number) => void;
  setDayCount: (dayCount: number) => void;
}

const useMeetStore = create<MeetState>((set) => ({
  dayCount: 0,
  zuStartIndex: 0,
  zuEndIndex: 1,
  meetName: "",
  description: "",
  startDatetime: "",
  endDatetime: "",
  runningtime: 15,
  memberList: [],
  setStartDatetime: (startDatetime) => set({ startDatetime }),
  setEndDatetime: (endDatetime) => set({ endDatetime }),
  setRunningTime: (runningtime) => set({ runningtime }),
  setMemberList: (memberList) => set({ memberList }),
  setMeetName: (meetName) => set({ meetName }),
  setDescription: (description) => set({ description }),
  setZuStartIndex: (zuStartIndex) => set({ zuStartIndex }),
  setZuEndIndex: (zuEndIndex) => set({ zuEndIndex }),
  setDayCount: (dayCount) => set({ dayCount }),
}));

export default useMeetStore;
