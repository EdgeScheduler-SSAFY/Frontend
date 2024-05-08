'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { MdOutlineNotifications } from 'react-icons/md';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

import { Color } from '@/shared/lib/styles/color';
import { ColorName } from '@/shared/lib/type/types';
import { useEffect } from 'react';

export function Header() {
  const EventSource = NativeEventSource || EventSourcePolyfill;
  useEffect(() => {
    const eventSource = new EventSource('https://gateway.edgescheduler.co.kr/notification-service/notify/3');
    eventSource.addEventListener('connected', (event) => {
      const { data: receivedConnectData } = event;
      if (receivedConnectData === `Connected Successfully`) {
        console.log('SSE CONNECTED');
      }
    });
  });

  return (
    <HeaderNav>
      <MainLogo>
        <StyledLink href="/">
          <Image src="/images/edgeScheduler.png" alt="edgeSchedulerLogo" height={50} width={50} />
          <LogoName color="blue">Edge&nbsp;</LogoName>
          <LogoName color="green">Sch</LogoName>
          <LogoName color="orange">edu</LogoName>
          <LogoName color="yellow">ler</LogoName>
        </StyledLink>
      </MainLogo>
      <LinkDiv>
        <StyledLink href="/schedule">schedule</StyledLink>
        <StyledLink href="/meeting">create meeting</StyledLink>
        <StyledLink href="/myPage/alarmLog">my page</StyledLink>
        <StyledLink href="/login">sign in</StyledLink>
      </LinkDiv>
      <MdOutlineNotifications size={23} />
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

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:visited {
    color: ${Color('black')};
  }
  &:hover {
    cursor: pointer;
    color: ${Color('blue')};
  }
`;
