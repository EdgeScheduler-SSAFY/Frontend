import { userList } from "@/shared/lib/type";
import { create } from "zustand";

// Zustand 스토어 생성
<<<<<<< HEAD
interface member {
  user: userList;
  isRequired: boolean;
}
=======


>>>>>>> 9336ed43dd7e7d96071bd7d66b8b8cd5f43979f7

export interface MeetState {
  meetName: string;
  startDatetime: string;
  endDatetime: string;
  runningtime: number;
  memberList: { user: userList; isRequired: boolean }[];
  setStartDatetime: (startdatetime: string) => void;
  setEndDatetime: (endDatetime: string) => void;
  setRunningTime: (runningtime: number) => void;
<<<<<<< HEAD
  setMemberList: (memberList: member[]) => void;
  setMeetName: (meetName: string) => void;
=======
  setMemberList: (memberList: { user: userList; isRequired: boolean }[]) => void;
>>>>>>> 9336ed43dd7e7d96071bd7d66b8b8cd5f43979f7
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
