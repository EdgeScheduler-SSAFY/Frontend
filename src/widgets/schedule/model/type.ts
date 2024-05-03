export interface schedule {
  scheduleId: number;
  organizerId: number;
  name: string;
  type: string;
  color: number;
  startDateTime: Date;
  endDateTime: Date;
}

export interface schedules {
  scheduleList: schedule[];
}
