export interface schedule {
  scheduleId: number;
  organizerId: number;
  name: string;
  type: string;
  color: number;
  startDatetime: Date;
  endDatetime: Date;
  ispublic: boolean;
  meeetingDetail: {
    isrequired: boolean;
    status: string;
    reason: string;
  };
}

export interface schedules {
  scheduleList: schedule[];
}
