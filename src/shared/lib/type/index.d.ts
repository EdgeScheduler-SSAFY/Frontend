export interface selectList {
  value: number | string;
  option: string;
}

export interface userList {
  id: number;
  name: string;
  profile: string;
  timezone: string;
  department: string;
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
  startindex: number;
  endindex: number;
}

export interface timeDivProps {
  selected: number;
  personindex: number;
  timeindex: number;
  startindex: number;
  endindex: number;
} // selected는 되는 시간 체크용, timeIndex는 meetingScope 설정 시 border 색깔 바꾸기 위함
