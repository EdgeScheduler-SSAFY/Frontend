"use client";
import React, { useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import styled, { keyframes } from "styled-components";

import { NoticeState } from "@/shared/lib/type/index";
import CreatedNotice from "./createdNotice";
import CanceledNotice from "./canceledNotice";
import ResponseNotice from "./responseNotice";
import UpdatedTimeNotice from "./updatedTimeNotice";
import ProposalNotice from "./proposalNotice";

interface ExtendedEventSourceInit extends EventSourceInit {
  heartbeatTimeout?: number;
}

const eventSourceInit: ExtendedEventSourceInit = {
  heartbeatTimeout: 1800000,
};

const initialNoticeState: NoticeState = {
  createNotice: { state: undefined, eventType: "meeting-created" },
  deleteNotice: { state: undefined, eventType: "meeting-deleted" },
  updatedNotice: { state: undefined, eventType: "meeting-updated-fields" },
  updatedTimeNotice: { state: undefined, eventType: "meeting-updated-time" },
  attendeeResNotice: { state: undefined, eventType: "attendee-response" },
  attendeeProNotice: { state: undefined, eventType: "attendee-proposal" },
};

export default function NewNotice() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [noticeState, setNoticeState] = useState<NoticeState>(initialNoticeState);
  const [animationClass, setAnimationClass] = useState<string>("");

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, []);

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

    setAnimationClass("slide-in");

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
    const EventSource = EventSourcePolyfill;
    const eventSource = new EventSource("https://gateway.edgescheduler.co.kr/notification-service/subscribe/1", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
      ...eventSourceInit,
    });

    eventSource.addEventListener("connected", (e: any) => {
      const receivedConnectData = e.data;
      if (receivedConnectData === `Connected Successfully`) {
        console.log("SSE CONNECTED");
      }
    });

    // 이벤트 핸들러 등록
    eventSource.addEventListener("meeting-created", handleMeetingEvent);
    eventSource.addEventListener("meeting-deleted", handleMeetingEvent);
    eventSource.addEventListener("meeting-updated-fields", handleMeetingEvent);
    eventSource.addEventListener("meeting-updated-time", handleMeetingEvent);
    eventSource.addEventListener("attendee-response", handleMeetingEvent);
    eventSource.addEventListener("attendee-proposal", handleMeetingEvent);

    return () => {
      eventSource.close();
      console.log("SSE CLOSED");
    };
  }, [accessToken]);
  if (Object.values(noticeState).every((state) => !state.state)) return null;

  return (
    <NoticeLayout className={`${animationClass}`}>
      {Object.entries(noticeState).map(([key, value]) => {
        const { state, eventType } = value;
        if (state !== undefined) {
          switch (eventType) {
            case "meeting-created":
              return <CreatedNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />;
            case "meeting-deleted":
              return <CanceledNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />;
            case "meeting-updated-fields":
              return <CanceledNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />;
            case "meeting-updated-time":
              return <UpdatedTimeNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />;
            case "attendee-response":
              return <ResponseNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />
            case "attendee-proposal":
              return <ProposalNotice key={eventType} eventData={state} onClose={() => handleClose(eventType)} />;
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
  flex-direction: column;
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
