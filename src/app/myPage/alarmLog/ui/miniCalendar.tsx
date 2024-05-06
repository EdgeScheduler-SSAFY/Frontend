'use client';
import styled from 'styled-components';

import { Color } from '@/shared/lib/styles/color';
export default function MiniCalendar() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  return (
    <CalendarDiv>
      <DateDiv>
        <div>{months[today.getMonth()]} &nbsp;</div>
        <div>{today.getDate()}</div>
      </DateDiv>
      <DayDiv>{days[today.getDay()]}</DayDiv>
    </CalendarDiv>
  );
}

const CalendarDiv = styled.div`
  width: 6rem;
  height: 5rem;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
`;

const DateDiv = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  background-color: ${Color('blue')};
  font-weight: 900;
  color: white;
`;

const DayDiv = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 10px 10px;
  font-weight: 900;
`;
