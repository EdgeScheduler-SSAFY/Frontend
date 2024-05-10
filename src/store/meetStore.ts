import { userList } from "@/shared/lib/type";
import { create } from "zustand";

// Zustand 스토어 생성
interface member {
  user: userList;
  isRequired: boolean;
}

export interface MeetState {
  meetName: string;
  startDatetime: string;
  endDatetime: string;
  runningtime: number;
  memberList: member[];
  setStartDatetime: (startdatetime: string) => void;
  setEndDatetime: (endDatetime: string) => void;
  setRunningTime: (runningtime: number) => void;
  setMemberList: (memberList: member[]) => void;
  setMeetName: (meetName: string) => void;
}

const useMeetStore = create<MeetState>((set) => ({
  meetName: "",
  startDatetime: "",
  endDatetime: "",
  runningtime: 15,
  memberList: [],
  setStartDatetime: (startDatetime) => set({ startDatetime }),
  setEndDatetime: (endDatetime) => set({ endDatetime }),
  setRunningTime: (runningtime) => set({ runningtime }),
  setMemberList: (memberList) => set({ memberList }),
  setMeetName: (meetName) => set({ meetName }),
}));

export default useMeetStore;
