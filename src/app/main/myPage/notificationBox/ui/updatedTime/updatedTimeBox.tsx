"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Color } from "@/shared/lib/styles/color";
import NoticeLogo from "../noticeLogo";
import NoticeInfo from "./noticeInfo";
import { NoticeLogoProps } from "@/shared/lib/type";

export default function UpdatedTimeBox({ data }: any) {
  const [year, month, day] = data.updatedStartTime.split("T")[0].split("-");

  const [logoData, setLogoData] = useState<NoticeLogoProps>({
    type: data.type,
    month: parseInt(month),
    day: day,
    date: new Date(data.updatedStartTime.split("T")[0]),
    response: data.response ? data.response : "",
  });

  return (
    <AlarmBoxDiv>
      <NoticeLogo logoData={logoData} />
      <NoticeInfo data={data} />
    </AlarmBoxDiv>
  );
}
const AlarmBoxDiv = styled.div`
  border: 1px solid ${Color("black200")};
  display: flex;
  border-radius: 10px;
  margin: 1rem;
  padding: 1rem;
  width: 55rem;
  justify-content: center;
`;
