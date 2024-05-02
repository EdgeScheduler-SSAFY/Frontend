import { UserLists, selectList } from "./type/interfaces";

export const userLists: UserLists= {
  "Development Team 1": [
    {
      id: 1,
      name: "조현수",
      profile: "http://source.unsplash.com/500x500",
    },
    {
      id: 2,
      name: "김중광",
      profile: "http://source.unsplash.com/500x500",
    },
    {
      id: 3,
      name: "전은평",
      profile: "http://source.unsplash.com/500x500",
    },
    {
      id: 4,
      name: "조용환",
      profile: "http://source.unsplash.com/500x500",
    },
  ],
  "Development Team 2": [
    {
      id: 5,
      name: "오형택",
      profile: "http://source.unsplash.com/500x500",
    },
    {
      id: 6,
      name: "노세희",
      profile: "http://source.unsplash.com/500x500",
    },
  ],
};

export const meetingTime: selectList[] = [
  { value: 15, option: "15 minutes" },
  { value: 30, option: "30 minutes" },
  { value: 45, option: "45 minutes" },
  { value: 60, option: "1 hour" },
  { value: 75, option: "1 hour 15minutes" },
  { value: 90, option: "1 hour 30minutes" },
  { value: 105, option: "1 hour 45minutes" },
  { value: 120, option: "2 hour" },
  { value: 135, option: "2 hour 15minutes" },
  { value: 150, option: "2 hour 30minutes" },
  { value: 165, option: "2 hour 45minutes" },
  { value: 180, option: "3 hour" },
  { value: 195, option: "3 hour 15minutes" },
  { value: 210, option: "3 hour 30minutes" },
  { value: 225, option: "3 hour 45minutes" },
  { value: 240, option: "4 hour" },
  { value: 255, option: "4 hour 15minutes" },
  { value: 270, option: "4 hour 30minutes" },
  { value: 285, option: "4 hour 45minutes" },
];
