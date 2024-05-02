export interface selectList {
  value: number;
  option: string;
}

export interface userList {
  id: number;
  name: string;
  profile: string;
}

export interface UserLists {
  [key: string]: userList[];
}