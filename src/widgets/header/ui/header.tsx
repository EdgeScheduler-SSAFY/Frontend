"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { MdOutlineNotifications } from "react-icons/md";

import { Color } from "@/shared/lib/styles/color";
import { ColorName } from "@/shared/lib/type/types";
import { NoticeList } from "@/features/noticeList/ui/noticeList";
import NewNotice from "@/widgets/notice/ui/newNotice";
import { GetNoticeList } from "@/features/noticeList/api/getNoticeList";
import useNoticeStore from "@/store/noticeStore";

export function Header() {
  const [showNoticeList, setShowNoticeList] = useState<boolean>(false);
  const noticeCount = useNoticeStore((state) => state.noticeCount);
  const setNoticeCount = useNoticeStore((state) => state.setNoticeCount);
  const currentPath = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GetNoticeList();
        const unreadCount = responseData.reduce((count: number, notice: any) => {
          return notice.isRead === false ? count + 1 : count;
        }, 0);
        setNoticeCount(unreadCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  const noticeListHandle = () => {
    setShowNoticeList((prev) => !prev);
  };

  const ref = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 알림리스트 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !document.getElementById("proposalModal")?.contains(e.target as Node) &&
        !document.getElementById("detailProposal")?.contains(e.target as Node)
      ) {
        setShowNoticeList(false);
      }
    };

    if (showNoticeList) document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNoticeList]);
  return (
    <HeaderNav>
      <NewNotice />
      <MainLogo>
        <StyledLink href="/main/schedule" active={false}>
          <Image src="/images/edgeScheduler.png" alt="edgeSchedulerLogo" height={50} width={50} />
          <LogoName color="blue">Edge&nbsp;</LogoName>
          <LogoName color="green">Sch</LogoName>
          <LogoName color="orange">edu</LogoName>
          <LogoName color="yellow">ler</LogoName>
        </StyledLink>
      </MainLogo>
      <LinkDiv>
        <StyledLink href="/main/schedule" active={/schedule/.test(currentPath as string)}>
          schedule
        </StyledLink>
        <StyledLink
          href="/main/meeting/createMeeting"
          active={/meeting/.test(currentPath as string)}
        >
          create meeting
        </StyledLink>
        <StyledLink
          href="/main/myPage/notificationBox"
          active={/myPage/.test(currentPath as string)}
        >
          my page
        </StyledLink>
        <StyledLink
          href={"/"}
          onClick={(e) => {
            e.preventDefault();
            sessionStorage.clear();
            window.location.href = "/";
          }}
          active={false}
        >
          logout
        </StyledLink>
      </LinkDiv>
      <CustomMdOutlineNotifications size={25} onClick={noticeListHandle} />
      {noticeCount > 0 && <NoticeCountDiv>{noticeCount}</NoticeCountDiv>}
      {showNoticeList && (
        <NoticeLayout ref={ref}>
          <NoticeList onClose={() => setShowNoticeList(false)} />
        </NoticeLayout>
      )}
    </HeaderNav>
  );
}
const HeaderNav = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  box-shadow: 0 0px 5px 3px rgba(0, 0, 0, 0.2);
  height: 60px;
`;

const MainLogo = styled.div`
  width: 40%;
  font-weight: 900;
  font-size: larger;
`;

const LogoName = styled.span<{ color: ColorName }>`
  color: ${(props) => Color(props.color)};
`;

const LinkDiv = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-evenly;
`;

const StyledLink = styled(Link)<{ active: boolean }>`
  color: ${(props) => (props.active ? Color("blue") : Color("black"))};
  display: flex;
  text-decoration: none;
  align-items: center;
  transition: all 0.2s ease-in-out;
  /* &:visited {
    color: ${Color("black")};
  } */
  &:hover {
    cursor: pointer;
    color: ${Color("blue")};
  }
`;
const LogoutDiv = styled.div`
  display: flex;
  text-decoration: none;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    color: ${Color("blue")};
  }
`;

const NoticeLayout = styled.div`
  position: relative;
`;

const CustomMdOutlineNotifications = styled(MdOutlineNotifications)`
  position: relative;
  cursor: pointer;
`;

const NoticeCountDiv = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${Color("orange")};
  color: ${Color("white")};
  font-size: 9px;
  font-weight: 500;
  position: absolute;
  top: 0.7rem;
  right: 2.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
