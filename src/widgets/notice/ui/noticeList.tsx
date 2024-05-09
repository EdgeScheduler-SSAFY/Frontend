import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { MdOutlineMarkChatRead, MdOutlineMarkunread, MdOutlineDeleteSweep } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
export function NoticeList() {
  return (
    <NoticeBoxLayout>
      <NavLayout>
        <NoticeListButton>
          <MdOutlineMarkChatRead size={13} />
          Read All
        </NoticeListButton>
        <NoticeListButton>
          <MdOutlineDeleteSweep size={15} />
          Remove All
        </NoticeListButton>
      </NavLayout>
      <NoticeListLayout></NoticeListLayout>
      <FooterLayout>
        <NoticeListButton>
          <MdOutlineMarkunread size={15} />
          Notification Box
        </NoticeListButton>
      </FooterLayout>
    </NoticeBoxLayout>
  );
}

const NoticeBoxLayout = styled.div`
  z-index: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 20rem;
  height: 26rem;
  box-shadow: 0 0 5px rgba(9, 30, 66, 0.31);
  background-color: white;
  right: 0.5rem;
  top: 1.6rem;
  border-radius: 10px;
`;

const NavLayout = styled.div`
  border-radius: 10px;
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 1rem;
`;
const NoticeListLayout = styled.div`
  overflow-y: scroll;
  width: 19rem;
  height: 24rem;
`;
const FooterLayout = styled.div`
  height: 3rem;
  width: 100%;
  display: flex;
  justify-content: end;
  border-radius: 10px;
  align-items: center;
  padding-right: 1rem;
`;

const NoticeListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: ${Color("black")};
  margin-right: 1.5rem;
  height: 60%;
  background: none;
  border: 1px solid ${Color("black400")};
  border-radius: 3px;
  transition: all 0.2s ease-in;
  &:hover {
    cursor: pointer;
    /* border: 1px solid ${Color("blue400")};
    color: ${Color("blue400")}; */
    background-color: ${Color("blue50")};
  }
`;
