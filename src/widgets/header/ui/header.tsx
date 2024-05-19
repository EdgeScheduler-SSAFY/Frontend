'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { MdOutlineNotifications } from 'react-icons/md';
import { RiArrowDropDownLine, RiArrowDropUpLine, RiAccountCircleLine } from 'react-icons/ri';
import { MdOutlineLogout } from 'react-icons/md';
import { Color } from '@/shared/lib/styles/color';
import { ColorName } from '@/shared/lib/type/types';
import { NoticeList } from '@/features/noticeList/ui/noticeList';
import NewNotice from '@/widgets/notice/ui/newNotice';
import { GetNoticeList } from '@/features/noticeList/api/getNoticeList';
import useNoticeStore from '@/store/noticeStore';

export function Header() {
  const [showNoticeList, setShowNoticeList] = useState<boolean>(false);
  const [showInfoDropDown, setShowInfoDropDown] = useState<boolean>(false);
  const [sessoionUserName, setSessionUserName] = useState<string>('');
  const noticeCount = useNoticeStore((state) => state.noticeCount);
  const setNoticeCount = useNoticeStore((state) => state.setNoticeCount);
  const currentPath = usePathname();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.name) {
      setSessionUserName(user.name);
    }
  }, []);

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
        !document.getElementById('proposalModal')?.contains(e.target as Node) &&
        !document.getElementById('detailProposal')?.contains(e.target as Node)
      ) {
        setShowNoticeList(false);
        setShowInfoDropDown(false);
      }
    };

    if (showNoticeList) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNoticeList]);
  return (
    <HeaderNav>
      <NewNotice />
      <MainLogo>
        <StyledLink href="/main/schedule" $active={false}>
          <Image src="/images/edgeScheduler.png" alt="edgeSchedulerLogo" height={50} width={50} />
          <LogoName color="blue">Edge&nbsp;</LogoName>
          <LogoName color="green">Sch</LogoName>
          <LogoName color="orange">edu</LogoName>
          <LogoName color="yellow">ler</LogoName>
        </StyledLink>
      </MainLogo>
      <LinkDiv>
        <StyledLink href="/main/schedule" $active={/schedule/.test(currentPath as string)}>
          schedule
        </StyledLink>
        <StyledLink href="/main/meeting/createMeeting" $active={/meeting/.test(currentPath as string)}>
          create meeting
        </StyledLink>
      </LinkDiv>
      <ProfileInfoDiv>
        <ProfileDiv ref={ref} onClick={() => setShowInfoDropDown((prev) => !prev)}>
          <ProfileImage src="/images/profile.webp" alt="프로필사진" width={25} height={25} />
          {sessoionUserName}
          {showInfoDropDown ? <RiArrowDropUpLine size={25} /> : <RiArrowDropDownLine size={25} />}
        </ProfileDiv>
        {showInfoDropDown && (
          <InfoDropDown>
            <InfoDiv>
              <RiAccountCircleLine size={18} />
              <MyInfoLink href="/main/myPage/notificationBox">UserInfo</MyInfoLink>
            </InfoDiv>
            <InfoDiv>
              <MdOutlineLogout size={18} />
              <MyInfoLink
                href={'/'}
                onClick={(e) => {
                  e.preventDefault();
                  sessionStorage.clear();
                  window.location.href = '/';
                }}
              >
                Logout
              </MyInfoLink>
            </InfoDiv>
          </InfoDropDown>
        )}
        <CustomMdOutlineNotifications size={25} onClick={noticeListHandle} />
        {noticeCount > 0 && <NoticeCountDiv>{noticeCount}</NoticeCountDiv>}
        {showNoticeList && (
          <NoticeLayout ref={ref}>
            <NoticeList onClose={() => setShowNoticeList(false)} />
          </NoticeLayout>
        )}
      </ProfileInfoDiv>
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
  width: 35%;
  display: flex;
  justify-content: space-evenly;
`;

const StyledLink = styled(Link)<{ $active: boolean }>`
  color: ${(props) => (props.$active ? Color('blue') : Color('black'))};
  display: flex;
  text-decoration: none;
  align-items: center;
  transition: all 0.2s ease-in-out;
  /* &:visited {
    color: ${Color('black')};
  } */
  &:hover {
    cursor: pointer;
    color: ${Color('blue')};
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
  border: 1px solid ${Color('white')};
  background-color: ${Color('orange')};
  color: ${Color('white')};
  font-size: 9px;
  font-weight: 500;
  position: absolute;
  top: 0.9rem;
  right: 2.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const ProfileDiv = styled.div`
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 1rem;
  cursor: pointer;
  position: relative;
`;

const InfoDropDown = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  width: 7rem;
  height: 5rem;
  top: 3.6rem;
  right: 5rem;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(9, 30, 66, 0.31);
  background-color: white;
  z-index: 500;
`;

const ProfileInfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const MyInfoLink = styled(Link)`
  color: ${Color('black')};
  font-size: 13px;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  margin-left: 0.9rem;
`;

const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin: 0.2rem 0.7rem;
  height: 2rem;
`;
