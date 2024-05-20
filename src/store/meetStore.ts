import { member, userList } from '@/shared/lib/type';
import { create } from 'zustand';
import { intervalTime } from '@/shared/lib/data';
// Zustand 스토어 생성

export interface MeetState {
  scheduleId: number;
  dayCount: number;
  meetName: string;
  startDatetime: string;
  endDatetime: string;
  runningtime: number;
  description: string;
  zuStartIndex: number;
  zuEndIndex: number;
  isUpdate: boolean;
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
  setIsUpdate: (isUpdate: boolean) => void;
  setScheduleId: (scheduleId: number) => void;
}

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
const date = String(now.getDate()).padStart(2, '0');
const currentHours = now.getHours();
const currentMinutes = now.getMinutes();

// 현재 시간을 분 단위로 변환
const totalCurrentMinutes = currentHours * 60 + currentMinutes;

// intervalTime 배열에서 현재 시간 이후의 시간들을 추출하여 새 배열 생성
const futureTimes = intervalTime.filter((time) => {
  const [hours, minutes] = time.value.split(':');
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  return totalMinutes > totalCurrentMinutes;
});

const standardIndex = intervalTime.findIndex((time) => time.value === futureTimes[0]?.value);

const todayString = `${year}-${month}-${date}T${intervalTime[standardIndex]?.value}`;
const endDateString = `${year}-${month}-${date}T00:00:15`;

const useMeetStore = create<MeetState>((set) => ({
  scheduleId: 0,
  dayCount: 0,
  zuStartIndex: 0,
  zuEndIndex: 1,
  meetName: '',
  description: '',
  startDatetime: todayString,
  endDatetime: endDateString,
  runningtime: 15,
  memberList: [],
  isUpdate: false,
  setStartDatetime: (startDatetime) => set({ startDatetime }),
  setEndDatetime: (endDatetime) => set({ endDatetime }),
  setRunningTime: (runningtime) => set({ runningtime }),
  setMemberList: (memberList) => set({ memberList }),
  setMeetName: (meetName) => set({ meetName }),
  setDescription: (description) => set({ description }),
  setZuStartIndex: (zuStartIndex) => set({ zuStartIndex }),
  setZuEndIndex: (zuEndIndex) => set({ zuEndIndex }),
  setDayCount: (dayCount) => set({ dayCount }),
  setIsUpdate: (isUpdate) => set({ isUpdate }),
  setScheduleId: (scheduleId) => set({ scheduleId }),
}));

export default useMeetStore;
