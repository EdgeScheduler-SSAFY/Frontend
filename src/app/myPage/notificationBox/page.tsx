'use client';
import React, { useEffect, useState } from 'react';

import AlarmBox from './ui/alarmBox';

export default function AlarmLog() {
  const tmpAccessToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Iiwicm9sZSI6IlJPTEVfVVNFUiIsImV4cCI6MTcxNTYxMjg3NX0.gJa7WfsFlFfagYbU4SmnQVWPPp7xuQw-gL7-lzbhVIQ';
  const size = 5;
  const [page, setPage] = useState<number>(0);

  const getNotificationBoxData = async (page: number) => {
    try {
      const res = await fetch(
        `https://gateway.edgescheduler.co.kr/notification-service/notify/notifications/page?page=${page}&size=${size}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tmpAccessToken}`,
          },
        }
      );
      res.json().then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
    return true;
  };

  useEffect(() => {
    getNotificationBoxData(page);
  }, []);

  return (
    <div>
      <AlarmBox />
    </div>
  );
}
