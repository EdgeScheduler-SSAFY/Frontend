import exp from "constants";

export interface MeetingData {
  name: string;
  description: string;
  type: string;
  color: number;
  startDatetime: string;
  endDatetime: string;
  runningTime: number;
  period: { start: string; end: string };
  isPublic: boolean;
  isRecurrence: boolean;
  memberList: { user: userList; isRequired: boolean }[];
<<<<<<< HEAD
}

export interface isRequiredDiv {
  $isRequired: boolean;
=======
>>>>>>> 9336ed43dd7e7d96071bd7d66b8b8cd5f43979f7
}

export interface selectList {
  value: number | string;
  option: string;
}

export interface userList {
  id: number;
  name: string;
  profile: string;
  zoneId: string;
  department: string;
  region: string;
}

export interface developmentType {
  name: string;
  folded: boolean;
}

export interface vipDidProps {
  $isRequired: boolean;
}
export interface ScheduleComponentProps {
  setParentStartIndex: (timeIndex: number) => void;
  setParentEndIndex: (timeIndex: number) => void;
  dayCount: number;
  recommendedTime: {startIndex:number, endIndex:number}[];
  schedulesAndAvailabilities: PersonalSchedule[];
}

<<<<<<< HEAD
=======
export interface PersonalSchedule {
  availability : string[];
  isRequired: boolean;
  memberId: number;
  schedules: {type: string, startIndexInclusive: number, endIndexExclusive: number, isPublic: true, name: string}[];
  tzOffset: string;
}

>>>>>>> 9336ed43dd7e7d96071bd7d66b8b8cd5f43979f7
export interface timeStampProps {
  personindex: number;
  timeindex: number;
  children?: React.ReactNode;
}

export interface timeDivProps {
  $type: string;
  $personindex: number;
  $timeindex: number;
  $startindex: number;
  $endindex: number;
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함

export interface RecommendTimeDivProps {
  timeindex: number;
  startindex: number;
  endindex: number;
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함

export interface PersonalScheduleInformation {
  availability: string[];
  isRequired: boolean;
  memberId: number;
  schedules: { type: string; startIndexInclusive: number; endIndexExclusive: number; isPublic: true; name: string }[];
  tzOffset: string;

}