import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import styled, { keyframes } from 'styled-components';

import { NoticeState } from '@/shared/lib/type/index';
import CreateNotice from './createNotice';
import AttendeeProposalNotice from './attendeeProposalNotice';

interface ExtendedEventSourceInit extends EventSourceInit {
  heartbeatTimeout?: number;
}

const eventSourceInit: ExtendedEventSourceInit = {
  heartbeatTimeout: 1800000,
};

const initialNoticeState: NoticeState = {
  createNotice: { state: undefined, eventType: 'meeting-created' },
  deleteNotice: { state: undefined, eventType: 'meeting-deleted' },
  updatedNotice: { state: undefined, eventType: 'meeting-updated-fields' },
  updatedTimeNotice: { state: undefined, eventType: 'meeting-updated-time' },
  attendeeResNotice: { state: undefined, eventType: 'attendee-response' },
  attendeeProNotice: { state: undefined, eventType: 'attendee-proposal' },
};

export default function NewNotice() {
  const [noticeState, setNoticeState] = useState<NoticeState>(initialNoticeState);
  const [animationClass, setAnimationClass] = useState('');
  const userId = 1; // 임시

  const handleClose = (eventType: string) => {
    setNoticeState((prev) => ({
      ...prev,
      [eventType]: { state: undefined, eventType: eventType },
    }));
  };

  const handleMeetingEvent = (e: any) => {
    const eventData: any = JSON.parse(e.data);
    const eventType = e.type;

    // 해당 이벤트 타입에 맞는 상태를 업데이트
    setNoticeState((prev) => ({
      ...prev,
      [eventType]: { state: eventData, eventType: eventType },
    }));

    setAnimationClass('slide-in');

    // 5초 후에 알림을 숨김
    // setTimeout(() => {
    //   setAnimationClass("slide-out");
    //   setTimeout(() => {
    //     setNoticeState((prev) => ({
    //       ...prev,
    //       [eventType]: { state: undefined, eventType: eventType },
    //     }));
    //   }, 500);
    // }, 5000);
  };

  useEffect(() => {
    const EventSource = NativeEventSource || EventSourcePolyfill;
    const eventSource = new EventSource('https://gateway.edgescheduler.co.kr/notification-service/notify/subscribe/1');

    eventSource.addEventListener('connected', (e: MessageEvent) => {
      const { data: receivedConnectData } = e;
      if (receivedConnectData === `Connected Successfully`) {
        console.log('SSE CONNECTED');
      }
    });

    // 이벤트 핸들러 등록
    eventSource.addEventListener('meeting-created', handleMeetingEvent);
    eventSource.addEventListener('meeting-deleted', handleMeetingEvent);
    eventSource.addEventListener('meeting-updated-fields', handleMeetingEvent);
    eventSource.addEventListener('meeting-updated-time', handleMeetingEvent);
    eventSource.addEventListener('attendee-response', handleMeetingEvent);
    eventSource.addEventListener('attendee-proposal', handleMeetingEvent);

    return () => {
      eventSource.close();
      console.log('SSE CLOSED');
    };
  }, [userId]);

  if (Object.values(noticeState).every((state) => !state.state)) return null;

  return (
    <NoticeLayout className={`${animationClass}`}>
      {Object.entries(noticeState).map(([key, value]) => {
        const { state, eventType } = value;
        if (state !== undefined) {
          switch (eventType) {
            case 'meeting-created':
              return <CreateNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />;
            case 'meeting-deleted':
              return null;
            case 'meeting-updated-fields':
              return null;
            case 'meeting-updated-time':
              return null;
            case 'attendee-response':
              return null;
            case 'attendee-proposal':
              return (
                <AttendeeProposalNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />
              );
            // 추가해야됨

            default:
              return null;
          }
        }
        return null;
      })}
    </NoticeLayout>
  );
}

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NoticeLayout = styled.div`
  position: fixed;
  top: 4rem;
  right: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 599;
  width: 22rem;

  &.slide-in {
    animation: ${slideInRight} 0.5s forwards;
  }
  &.slide-out {
    animation: ${slideOutRight} 0.5s forwards;
  }
`;
