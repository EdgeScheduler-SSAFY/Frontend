'use client';
import Link from 'next/link';
import styled from 'styled-components';

export default function MyPageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <MainLayout>
      <SubLayout>
        <MyPageLink>
          <StyledLink href="/myPage/updateInfo">Update Information</StyledLink>
          <StyledLink href="/myPage/alarmLog">Alarm Log</StyledLink>
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
  justify-content: space-evenly;
  margin: 2.5rem;
`;

const MyPageLink = styled.div`
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;

const ContentLayout = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 1.5rem 0;
`;
