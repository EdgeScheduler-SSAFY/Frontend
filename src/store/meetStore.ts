import { member, userList } from "@/shared/lib/type";
import { create } from "zustand";

// Zustand 스토어 생성

export interface MeetState {
  meetName: string;
  startDatetime: string;
  endDatetime: string;
  runningtime: number;
  description: string;
  memberList: { user: userList; isRequired: boolean }[];
  setStartDatetime: (startdatetime: string) => void;
  setEndDatetime: (endDatetime: string) => void;
  setRunningTime: (runningtime: number) => void;
  setMemberList: (memberList: member[]) => void;
  setMeetName: (meetName: string) => void;
  setDescription: (description: string) => void;
}

const useMeetStore = create<MeetState>((set) => ({
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
}));

export default useMeetStore;
