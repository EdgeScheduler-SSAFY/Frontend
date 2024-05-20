"use client";
import React, { useEffect, useState } from "react";

import Pagination from "./ui/pagination";
import CreatedBox from "./ui/created/createdBox";
import ResponseBox from "./ui/response/responseBox";
import ProposalBox from "./ui/proposal/proposalBox";
import UpdatedTimeBox from "./ui/updatedTime/updatedTimeBox";
import CanceledBox from "./ui/canceled/canceledBox";
import { GetNotificationData } from "./api/getNotificationData";

const renderNotificationComponent = (notification: any) => {
  switch (notification.type) {
    case "MEETING_CREATED":
      return <CreatedBox data={notification} />;
    case "MEETING_DELETED":
      return <CanceledBox data={notification} />;
    case "MEETING_UPDATED_FIELDS":
      return <CanceledBox data={notification} />;
    case "MEETING_UPDATED_TIME":
      return <UpdatedTimeBox data={notification} />;
    case "ATTENDEE_RESPONSE":
      return <ResponseBox data={notification} />;
    case "ATTENDEE_PROPOSAL":
      return <ProposalBox data={notification} />;
    default:
      return null;
  }
};

export default function NotificationBox() {
  const [notificationData, setNotificationData] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GetNotificationData(page);
        console.log(responseData);
        setNotificationData(responseData.data);
        setTotalPages(responseData.totalPages);
        setTotalElements(responseData.totalElements);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      {notificationData &&
        notificationData.map((notification: any) => (
          <div key={notification.id}>{renderNotificationComponent(notification)}</div>
        ))}
      <Pagination totalElements={totalElements} totalPages={totalPages} currentPage={page} setPage={handlePageChange} />
    </div>
  );
}
