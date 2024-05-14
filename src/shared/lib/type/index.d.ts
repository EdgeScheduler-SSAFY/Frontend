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

export interface ScheduleComponentProps {
  setParentStartIndex: (timeIndex: number) => void;
  setParentEndIndex: (timeIndex: number) => void;
}

export interface vipDivProps {
  vipperson: boolean;
} //필수 사람 선택용

export interface timeStampProps {
  personindex: number;
  timeindex: number;
  children?: React.ReactNode;
}

export interface timeDivProps {
  selected: number;
  personindex: number;
  timeindex: number;
  startindex: number;
  endindex: number;
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함

export interface RecommendTimeDivProps {
  timeindex: number;
  startindex: number;
  endindex: number;
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함
