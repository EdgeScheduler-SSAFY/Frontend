import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Zustand 스토어 생성
interface member {
  memberId: number;
  isRequired: boolean;
}

export interface MeetState {
  startDatetime: string;
  endDatetime: string;
  runningtime: number;
  memberList: member[];
  setStartDatetime: (startdatetime: string) => void;
  setEndDatetime: (endDatetime: string) => void;
  setRunningTime: (runningtime: number) => void;
  setMemberList: (memberList: member[]) => void;
}

const useMeetStore = create<MeetState>((set) => ({
  startDatetime: "",
  endDatetime: "",
  runningtime: 15,
  memberList: [],
  setStartDatetime: (startDatetime) => set({ startDatetime }),
  setEndDatetime: (endDatetime) => set({ endDatetime }),
  setRunningTime: (runningtime) => set({ runningtime }),
  setMemberList: (memberList) => set({ memberList }),
}));

export default useMeetStore;
