import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import MeetingSchedule from '@/app/meeting/meetingSchedule/page';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
describe('MeetingSchedulePage date change test', () => {
    test('render today Date', () => {
        render(<MeetingSchedule />);
        const date = new Date();
        const tmpDate= date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + '(' + days[date.getDay()] + ')';
        const nowDate = screen.getByText(tmpDate);
        expect(nowDate).toBeInTheDocument();

    })
    test('Click next day button & Click prev day button', () => {
        render(<MeetingSchedule />);
        const date = new Date();
        const nextDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
        const tmpDate= nextDate.getFullYear() + '.' + (nextDate.getMonth() + 1) + '.' + nextDate.getDate() + '(' + days[nextDate.getDay()] + ')';
        const nextDayButton = screen.getByTestId('goToNextDayButton');
        userEvent.click(nextDayButton);
        const startDateElement = screen.getByTestId('startDate');
        const endDateElement = screen.getByTestId('endDate');
        const nowDateElement = screen.getByTestId('nowDate');
        expect(startDateElement).toHaveTextContent(tmpDate);
        expect(endDateElement).toHaveTextContent(tmpDate);
        expect(nowDateElement).toHaveTextContent(tmpDate);
        const prevDayButton = screen.getByTestId('goToPastDayButton');
        userEvent.click(prevDayButton);
        const prevDate = new Date(date.getTime());
        const prevTmpDate= prevDate.getFullYear() + '.' + (prevDate.getMonth() + 1) + '.' + prevDate.getDate() + '(' + days[prevDate.getDay()] + ')';
        expect(startDateElement).toHaveTextContent(prevTmpDate);
        expect(endDateElement).toHaveTextContent(prevTmpDate);
        expect(nowDateElement).toHaveTextContent(prevTmpDate);

    }); // 다음날 버튼 눌렀을 때 날짜가 바뀌는지 확인, 다시 과거 버튼 눌렀을 때 제대로 바뀌는 지 체크


    
});

