export default function ConversionTimeMini({ start, end }: { start: string; end: string }) {
  const startTime = start.split("T")[1];
  const endTime = end.split("T")[1];

  return (
    <div>
      {startTime.slice(0, 5)} - {endTime.slice(0, 5)}
    </div>
  );
}
