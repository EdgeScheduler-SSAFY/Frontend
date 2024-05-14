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
  memberList: member[];
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
}

export interface developmentType {
  name: string;
  folded: boolean;
}

export interface SchedulesAndAvailabilitiesProps {
  availability: string[];
  isRequired: boolean;
  memberId: number;
  schedules: MeetingData[];
  tzOffset: string;
}
export interface RecommendeTime {
  startIndex: number;
  endIndex: number;
}

export interface ScheduleComponentProps {
  setParentStartIndex: (timeIndex: number) => void;
  setParentEndIndex: (timeIndex: number) => void;
  dayCount: number;
  recommendedTimes: RecommendeTime[];
  schedulesAndAvailabilities: SchedulesAndAvailabilitiesProps[];
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
  $type: string;
  $personindex: number;
  $timeindex: number;
  $startindex: number;
  $endindex: number;
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함

export interface RecommendTimeDivProps {
  $dayCount: number;
  $timeindex: number;
  $recommendedTimes: { startIndex: number; endIndex: number }[];
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함

export interface PersonalSchedule {
  name: string;
  startIndexInclusive: number;
  endIndexExclusive: number;
  type: string;
  isPublic: boolean;
}

export interface isRequiredDiv {
  $isRequired: boolean;
}

export interface member {
  user: userList;
  isRequired: boolean;
}
