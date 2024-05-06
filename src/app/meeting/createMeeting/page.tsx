'use client';
import styled from 'styled-components';
import { Noto_Sans_KR } from 'next/font/google';
import { useState, useEffect } from 'react';
import { MdKeyboardArrowRight, MdKeyboardArrowDown, MdClose } from 'react-icons/md';
import Image from 'next/image';

import { runningTime, intervalTime, userLists } from '@/shared/lib/data';
import { Color } from '@/shared/lib/styles/color';
import Label from '@/shared/ui/label';
import Button from '@/shared/ui/button';
import Input from '@/shared/ui/input';
import Select from '@/shared/ui/select';
import TextArea from '@/shared/ui/textArea';

const noto = Noto_Sans_KR({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

interface MeetingData {
  name: string;
  description: string;
  type: string;
  color: number;
  startDatetime: string;
  endDatetime: string;
  runningTime: number;
  period: { start: string; end: string };
  isPublic: boolean;
  isRecurrence: boolean;
  memberList: { memberid: number; isRequired: boolean }[];
}

export default function CreateMeeting() {
  const today = new Date();
  // 회의 정보
  const [meetingData, setMeetingData] = useState<MeetingData>({
    name: '',
    description: '',
    type: 'MEETING',
    color: 4,
    startDatetime: '2024-05-03T04:15:00',
    endDatetime: '2024-05-03T04:15:00',
    runningTime: 15,
    period: { start: '2024-05-03T04:15:00', end: '2024-05-03T04:15:00' },
    isPublic: true,
    isRecurrence: false,
    memberList: [],
  });

  // 전체 부서 주소록
  const [isFolded, setIsFolded] = useState(true);

  // 각 부서에 대한 상태를 관리할 배열
  const [teamStates, setTeamStates] = useState([
    { name: 'Development Team 1', folded: true },
    { name: 'Development Team 2', folded: true },
  ]);

  // 전체 주소록 상태 변경
  const toggleFold = () => {
    setIsFolded((prev: boolean) => !prev);
  };

  // 특정 부서의 상태를 변경
  const toggleTeamFold = (index: number) => {
    setTeamStates((prev) => prev.map((team, i) => (i === index ? { ...team, folded: !team.folded } : team)));
  };

  // 회의시간 값이 변경될 때 실행될 함수
  const runningTimeChangeHandle = (value: number | string) => {
    setMeetingData({ ...meetingData, runningTime: value as number });
  };

  // 시작시간 값이 변경될 때 실행될 함수
  const startTimeChangeHandle = (value: number | string) => {
    setMeetingData({ ...meetingData, period: { ...meetingData.period, start: value as string } });
  };
  // 끝시간 값이 변경될 때 실행될 함수
  const endTimeChangeHandle = (value: number | string) => {
    setMeetingData({ ...meetingData, period: { ...meetingData.period, end: value as string } });
  };

  // 클릭 여부 사용자 ID 기준
  const [clickedUsers, setClickedUsers] = useState<{ [userId: number]: boolean }>({});

  // 사용자 버튼 클릭 이벤트
  const userButtonClickHandle = (userId: number) => {
    const clickedUser = userLists.find((user) => user.id === userId);
    // 이미 참가자 목록에 있는 사용자인지 확인
    const isParticipant = meetingData.memberList.some((user) => user.memberid === userId);

    // 참가자 목록에 추가된 사용자라면 제거, 추가되지 않은 사용자라면 추가
    if (clickedUser && isParticipant) {
      setMeetingData((prev) => ({
        ...prev,
        memberList: prev.memberList.filter((user) => user.memberid !== userId),
      }));
    } else {
      setMeetingData((prev) => ({
        ...prev,
        memberList: [...prev.memberList, { memberid: userId, isRequired: false }],
      }));
    }

    setClickedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // 필수 / 선택 여부 전환 이벤트
  const optionalButtonClickHandle = (userId: number) => {
    setMeetingData((prev) => {
      const updatedMemberList = prev.memberList.map((member) => {
        if (member.memberid === userId) {
          return { ...member, isRequired: !member.isRequired };
        }
        return member;
      });
      return { ...prev, memberList: updatedMemberList };
    });
  };

  useEffect(() => {
    console.log('MeetingData:', meetingData);
  }, [meetingData]);

  return (
    <MainLayout>
      <CreateWidget>
        <CreateForm>
          <AddressDiv>
            <Label htmlFor="addressbook" width={20}>
              Address Book
            </Label>
            <InlineDiv>
              <Input id="addressbook" type="text" width={20} placeholder="Please enter a search term." />
            </InlineDiv>
            <AdressBookDiv>
              <ButtonFold onClick={toggleFold} className={noto.className}>
                {' '}
                {isFolded ? <MdKeyboardArrowRight size={16} /> : <MdKeyboardArrowDown size={16} />}부서 주소록
              </ButtonFold>
              {!isFolded && (
                <LnbTree>
                  {teamStates.map((team, index) => (
                    <li key={team.name}>
                      <LnbSubTree>
                        <MenuItem>
                          <ButtonFold onClick={() => toggleTeamFold(index)} className={noto.className}>
                            {team.folded ? <MdKeyboardArrowRight size={16} /> : <MdKeyboardArrowDown size={16} />}
                            {team.name}
                          </ButtonFold>
                        </MenuItem>
                        {!team.folded && (
                          <li>
                            {userLists
                              .filter((member) => member.department === team.name)
                              .map((member) => (
                                <MenuItem key={member.id}>
                                  <UserButton
                                    $isClicked={clickedUsers[member.id]}
                                    onClick={() => userButtonClickHandle(member.id)}
                                    draggable="true"
                                    className={noto.className}
                                  >
                                    <ProfileImage src={member.profile} alt="프로필사진" width={25} height={25} />
                                    <UserName>{member.name}</UserName>
                                    <TimeZone>{member.timezone}</TimeZone>
                                  </UserButton>
                                </MenuItem>
                              ))}
                          </li>
                        )}
                      </LnbSubTree>
                    </li>
                  ))}
                </LnbTree>
              )}
            </AdressBookDiv>
          </AddressDiv>
          <InformationDiv>
            <InlineDiv>
              <Label htmlFor="name">Title</Label>
              <Input
                id="name"
                type="text"
                width={33}
                placeholder="Please enter a title."
                value={meetingData.name}
                onChange={(e) => setMeetingData((prev) => ({ ...prev, name: e.target.value }))}
              ></Input>
            </InlineDiv>
            <InlineDiv>
              <Label htmlFor="time">Time</Label>
              <Select
                id="time"
                options={runningTime}
                show={false}
                width={10}
                onSelectChange={runningTimeChangeHandle}
              ></Select>
            </InlineDiv>
            <div>
              <Label htmlFor="period">Period</Label>
              <PeriodDiv id="period">
                <Select options={intervalTime} show={false} width={6.5} onSelectChange={startTimeChangeHandle}></Select>
                <Select options={intervalTime} show={false} width={6.5} onSelectChange={endTimeChangeHandle}></Select>
              </PeriodDiv>
            </div>
            <div>
              <Label htmlFor="detail">Detail</Label>
              <div id="detail">
                <TextArea
                  placeholder="Please enter a detail."
                  value={meetingData.description}
                  onChange={(e) => setMeetingData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="participant">Participant</Label>
              <ParticipantDiv id="participant">
                {meetingData.memberList.map((member) => {
                  const user = userLists.find((user) => user.id === member.memberid);
                  return (
                    <div key={member.memberid}>
                      {user ? (
                        <ParticipantInfoDiv>
                          <div>
                            <ProfileImage src={user.profile} alt="프로필사진" width={30} height={30} />
                          </div>
                          <div>
                            <RestDiv>
                              <UserName>{user.name}</UserName>
                              <OptionalButton
                                className={noto.className}
                                onClick={() => optionalButtonClickHandle(member.memberid)}
                                $isRequired={member.isRequired}
                              >
                                {member.isRequired ? 'required' : 'optional'}
                              </OptionalButton>
                            </RestDiv>
                            <UserDepartment>{user.department}</UserDepartment>
                          </div>
                          <div>
                            <CloseButton onClick={() => {}}>
                              <MdClose />
                            </CloseButton>
                          </div>
                        </ParticipantInfoDiv>
                      ) : (
                        <div>Unknown</div>
                      )}
                    </div>
                  );
                })}
              </ParticipantDiv>
            </div>
          </InformationDiv>
        </CreateForm>
        <ButtonDiv>
          <Button>next</Button>
          <Button color="black" $bgColor="black50" $hoverColor="black100">
            cancel
          </Button>
        </ButtonDiv>
      </CreateWidget>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  width: 100%;
  min-height: calc(100% - 50px);
`;

const CreateWidget = styled.div`
  padding: 2rem 5rem;
`;

const CreateForm = styled.div`
  display: flex;
`;

const AddressDiv = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  margin-right: 3rem;
`;

const InformationDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 2rem;
`;

const InlineDiv = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
`;

const PeriodDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: start;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  padding: 1rem 10rem;
`;

const AdressBookDiv = styled.div`
  overflow-y: scroll;
  width: 20rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid ${Color('black200')};
  border-radius: 3px;
  font-size: 14px;
  height: 24rem;
  margin-top: 0.5rem;
`;

const ParticipantDiv = styled.div`
  overflow-y: scroll;
  width: 77%;
  padding: 0.5rem 0.7rem;
  font-size: 14px;
  height: 8rem;
  border: 1px solid ${Color('black200')};
  border-radius: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

const ButtonFold = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: Color('black');
  font-weight: 700;
`;

const LnbTree = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`;

const LnbSubTree = styled.ul`
  list-style-type: none;
  padding-left: 20px;
`;

const UserButton = styled.button<{ $isClicked: boolean }>`
  width: 11rem;
  height: 2.5rem;
  padding: 0.2rem 0.5rem;
  border: none;
  border-radius: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-start;
  position: relative;
  margin-left: 1rem;
  background-color: ${(props) => (props.$isClicked ? Color('blue100') : Color('black50'))};
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  margin-right: 0.6rem;
`;

const UserName = styled.div`
  font-size: 13.5px;
  font-weight: 600;
  margin-right: 0.3rem;
`;

const TimeZone = styled.div`
  font-size: 10px;
  position: absolute;
  right: 0.8rem;
`;

const CloseButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${Color('orange600')};
  }
`;

const ParticipantInfoDiv = styled.div`
  border: 1px solid ${Color('black200')};
  border-radius: 10px;
  padding: 0.5rem;
  width: 10rem;
  margin: 0.3rem;
  display: flex;
`;

const UserDepartment = styled.div`
  font-size: 10px;
`;

const OptionalButton = styled.button<{ $isRequired: boolean }>`
  border: 1px solid ${(props) => (props.$isRequired ? Color('black200') : Color('blue600'))};
  color: ${(props) => (props.$isRequired ? Color('black200') : Color('blue600'))};
  border-radius: 2px;
  background: none;
  width: 3.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

const ProfileDiv = styled.div``;
const RestDiv = styled.div`
  display: inline-flex;
  align-items: center;
`;
