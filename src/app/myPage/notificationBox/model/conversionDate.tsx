import { getDay } from "date-fns";

import { dayList } from "@/shared/lib/data";

export default function ConversionDate({ start, end }: { start: string; end: string }) {
  const [startDate, startTime] = start.split("T");
  const endTime = end.split("T")[1];
  const [year, month, date] = startDate.split("T")[0].split("-");
  const day = getDay(new Date(startDate));

  return (
    <div>
      {year}.{month}.{date}({dayList[day]}) {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
    </div>
  );
}
