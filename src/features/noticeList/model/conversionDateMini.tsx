import { getDay } from "date-fns";

import { dayList, MonthList } from "@/shared/lib/data";

export default function ConversionDateMini({ start, end }: { start: string; end: string }) {
  const [startDate, startTime] = start.split("T");
  const endTime = end.split("T")[1];
  const [year, month, date] = startDate.split("-");
  const day = getDay(new Date(startDate));

  return (
    <div>
    {MonthList[parseInt(month) - 1]} {date} ({dayList[day]}), {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
    </div>
  )

}
