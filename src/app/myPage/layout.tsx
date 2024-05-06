'use client';
import Link from 'next/link';
import styled from 'styled-components';

export default function MyPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MainLayout>
      <SubLayout>
        <MyPageLink>
          <StyledLink href="/myPage/updateInfo">update information</StyledLink>
          <StyledLink href="/myPage/alarmLog">alarm log</StyledLink>
        </MyPageLink>
        <ContentLayout>{children}</ContentLayout>
      </SubLayout>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
`;

const SubLayout = styled.div`
  display: flex;
  margin: 2.5rem;
`;

const MyPageLink = styled.div`
  margin-right: 3rem;
  width: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ContentLayout = styled.div`
  width: 80%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 1.5rem 0;
`;
