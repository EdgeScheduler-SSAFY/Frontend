import React, { useState } from "react";
import Button from "@/shared/ui/button";

interface IMeetingFilterButtonProps {
  onClick: (meetingFilter: boolean) => void;
}

export function MeetingFilterButton({ onClick }: IMeetingFilterButtonProps) {
  const [filter, setFilter] = useState<boolean>(false);
  const handleClick = () => {
    const newFilter = !filter;
    setFilter(newFilter);
    onClick(newFilter);
  };
  return (
    <div>
      {filter ? (
        <Button onClick={handleClick}>all</Button>
      ) : (
        <Button onClick={handleClick}>meet</Button>
      )}
    </div>
  );
}
