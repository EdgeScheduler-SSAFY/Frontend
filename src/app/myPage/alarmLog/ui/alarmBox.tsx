'use client';
import styled from 'styled-components';

import { Color } from '@/shared/lib/styles/color';
import MiniCalendar from './miniCalendar';
import AlramInfo from './alarmInfo';

export default function AlarmBox() {
  return (
    <AlarmBoxDiv>
      <MiniCalendar />
      <AlramInfo />
    </AlarmBoxDiv>
  );
}
const AlarmBoxDiv = styled.div`
  border: 1px solid ${Color('black')};
  display: flex;
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
`;
