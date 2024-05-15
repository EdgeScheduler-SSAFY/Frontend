import { dayList } from "./data"


export default function DateFormat({selectedDate} : {selectedDate: Date}) {
  return (
      <div>
          {selectedDate.getFullYear()}.
          {("0" + (selectedDate.getMonth() + 1)).slice(-2)}.
          {("0" + selectedDate.getDate()).slice(-2)}
          ({dayList[selectedDate.getDay()]})
      </div>
  );
}