"use client";
import styled from "styled-components";
import { Noto_Sans_KR } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

import { runningTime, intervalTime, userLists } from "@/shared/lib/data";
import { MeetingData, userList } from "@/shared/lib/type";
import { Color } from "@/shared/lib/styles/color";
import Label from "@/shared/ui/label";
import Input from "@/shared/ui/input";
import SelectTime from "@/shared/ui/selectTime";
import TextArea from "@/shared/ui/textArea";
import useMeetStore, { MeetState } from "@/store/meetStore";
import { MiniCalendar, fetchWithInterceptor } from "@/shared";
import ButtonBox from "./ui/buttonBox";
import { filterUserList, highlightSearchTerm } from "./model/searchUtils";
import { useRouter } from "next/navigation";
import SelectLocalTime from "@/shared/ui/selectLocalTime";

const noto = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function CreateMeeting() {
  // 회의 정보
  const router = useRouter();
  const { setStartDatetime, setEndDatetime, setRunningTime, setMemberList } =
    useMeetStore((state) => state);
  const [meetingData, setMeetingData] = useState<MeetingData>({
    name: "",
    description: "",
    type: "MEETING",
    color: 4,
    startDatetime: "2024-05-10T04:15:00",
    endDatetime: "2024-05-10T04:15:00",
    runningTime: 15,
    period: { start: `2024-05-10T00:00:00`, end: `2024-05-10T00:00:00` },
    isPublic: true,
    isRecurrence: false,
    memberList: [],
  });

  const [searchTerm, setSearchTerm] = useState<string>(""); // 검색어
  const [showSearchList, setShowSearchList] = useState(false); // 검색 리스트 표시 여부
  const searchRef = useRef<HTMLDivElement>(null);
  const [isFolded, setIsFolded] = useState(true); // 전체 부서 주소록
  const [teamStates, setTeamStates] = useState([
    { name: "Development Team 1", folded: true },
    { name: "Development Team 2", folded: true },
  ]); // 각 부서에 대한 상태를 관리할 배열
  const [sameDate, setSameDate] = useState<boolean>(true);
  const [disabledIndex, setDisabledIndex] = useState<number>(0);
  const [clickedUsers, setClickedUsers] = useState<{
    [userId: number]: boolean;
  }>({}); // 클릭 여부 사용자 ID 기준
  const [showStartMiniCalendar, setShowStartMiniCalendar] =
    useState<boolean>(false);
  const [showEndMiniCalendar, setShowEndMiniCalendar] =
    useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  // 검색어 입력 시 호출되는 함수
  const searchInputChangehandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // 검색어가 비어있으면 검색 리스트를 닫음
    setShowSearchList(e.target.value !== "");
  };

  // 외부를 클릭하면 검색 리스트를 닫음
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 전체 주소록 상태 변경
  const toggleFold = () => {
    setIsFolded((prev: boolean) => !prev);
  };

  // 특정 부서의 상태를 변경
  const toggleTeamFold = (index: number) => {
    setTeamStates((prev) =>
      prev.map((team, i) =>
        i === index ? { ...team, folded: !team.folded } : team
      )
    );
  };

  // 회의시간 값이 변경될 때 실행될 함수
  const runningTimeChangeHandle = (value: number | string) => {
    setMeetingData({ ...meetingData, runningTime: value as number });
  };

  // 시작날짜 값이 변경될 때 실행될 함수
  const startDateHandle = (selectedDate: Date) => {
    setSelectedStartDate(selectedDate);
    // 끝 날짜가 더 빠를 때만 변경
    if (selectedDate > selectedEndDate) {
      setSelectedEndDate(selectedDate);
    }
    const year = selectedDate.getFullYear();
    const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
    const date = ("0" + selectedDate.getDate()).slice(-2);
    const startTime = meetingData.period.start.split("T")[1]; // 기존 시작 시간
    setMeetingData({
      ...meetingData,
      period: {
        ...meetingData.period,
        start: `${year}-${month}-${date}T${startTime}`,
      },
    });
  };

  // 시작시간 값이 변경될 때 실행될 함수
  const startTimeChangeHandle = (value: number | string) => {
    const startDate = meetingData.period.start.split("T")[0]; // 기존 시작 날짜
    setMeetingData({
      ...meetingData,
      period: { ...meetingData.period, start: `${startDate}T${value}` },
    });
    setDisabledIndex(
      intervalTime.findIndex((option) => option.value === value)
    );
  };

  // 끝날짜 값이 변경될 때 실행될 함수
  const endDateHandle = (selectedDate: Date) => {
    setSelectedEndDate(selectedDate);
    const year = selectedDate.getFullYear();
    const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
    const date = ("0" + selectedDate.getDate()).slice(-2);
    const endTime = meetingData.period.end.split("T")[1]; // 기존 시작 시간
    setMeetingData({
      ...meetingData,
      period: {
        ...meetingData.period,
        end: `${year}-${month}-${date}T${endTime}`,
      },
    });

    // 두 날짜가 같은지 확인
    setSameDate(selectedDate.getDate() === selectedStartDate.getDate());
  };

  // 끝시간 값이 변경될 때 실행될 함수
  const endTimeChangeHandle = (value: number | string) => {
    const endDate = meetingData.period.end.split("T")[0]; // 기존 시작 날짜
    setMeetingData({
      ...meetingData,
      period: { ...meetingData.period, end: `${endDate}T${value}` },
    });
  };

  // 사용자 버튼 클릭 이벤트
  const userButtonClickHandle = (userId: number) => {
    console.log("userButtonClickHandle called with userId:", userId);
    const clickedUser = userLists.find((user) => user.id === userId);
    // 이미 참가자 목록에 있는 사용자인지 확인
    const isParticipant = meetingData.memberList.some(
      (user) => user.memberId === userId
    );

    // 참가자 목록에 추가된 사용자라면 제거, 추가되지 않은 사용자라면 추가
    if (clickedUser && isParticipant) {
      setMeetingData((prev) => ({
        ...prev,
        memberList: prev.memberList.filter((user) => user.memberId !== userId),
      }));
    } else {
      setMeetingData((prev) => ({
        ...prev,
        memberList: [
          ...prev.memberList,
          { memberId: userId, isRequired: false },
        ],
      }));
    }

    setClickedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));

    setSearchTerm("");
    setShowSearchList(false);
  };

  // 참가자 div에서 제거
  const participantRemoveHandle = (userId: number) => {
    setMeetingData((prev) => ({
      ...prev,
      memberList: prev.memberList.filter(
        (member) => member.memberId !== userId
      ),
    }));

    setClickedUsers((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  // 필수 / 선택 여부 전환 이벤트
  const optionalButtonClickHandle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: number
  ) => {
    e.stopPropagation(); // 이벤트 버블링 중단
    setMeetingData((prev) => {
      const updatedMemberList = prev.memberList.map((member) => {
        if (member.memberId === userId) {
          return { ...member, isRequired: !member.isRequired };
        }
        return member;
      });
      return { ...prev, memberList: updatedMemberList };
    });
  };

  const cancleHandle = () => {
    router.push("/");
  };
  const nextHandle = () => {
    setStartDatetime(meetingData.period.start);
    setEndDatetime(meetingData.period.end);
    setRunningTime(meetingData.runningTime);
    setMemberList(meetingData.memberList);
    router.push("./meetingSchedule");
  };

  useEffect(() => {
    console.log("searchTerm:", searchTerm);
    // console.log("MeetingData:", meetingData);
  }, [meetingData, searchTerm]);

  useEffect(() => {
    console.log("뭐라도 출력해바");
    fetchWithInterceptor("/user-service/members")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <MainLayout>
      <CreateWidget>
        <CreateForm>
          <AddressDiv>
            <Label htmlFor="addressbook" width={20}>
              Address Book
            </Label>
            <InlineDiv>
              <SearchBox>
                <Input
                  id="addressbook"
                  type="text"
                  width={20}
                  placeholder="Please enter a search term."
                  value={searchTerm}
                  onChange={searchInputChangehandle}
                  onFocus={() => {
                    if (searchTerm !== "") setShowSearchList(true);
                  }}
                />
              </SearchBox>
            </InlineDiv>
            {showSearchList && (
              <SearchDiv ref={searchRef}>
                <SearchList>
                  {filterUserList(userLists, searchTerm).length > 0 ? (
                    filterUserList(userLists, searchTerm).map((member) => (
                      <SearchListOption
                        key={member.id}
                        onClick={() => userButtonClickHandle(member.id)}
                      >
                        <ProfileImage
                          src={member.profile}
                          alt="프로필사진"
                          width={20}
                          height={20}
                        />
                        <UserName>
                          {highlightSearchTerm(member.name, searchTerm)}
                        </UserName>
                        <Department>{member.department}</Department>
                      </SearchListOption>
                    ))
                  ) : (
                    <SearchListOption onClick={undefined}>
                      No one matches your search term😥
                    </SearchListOption>
                  )}
                </SearchList>
              </SearchDiv>
            )}
            <AdressBookDiv>
              <ButtonFold onClick={toggleFold} className={noto.className}>
                {isFolded ? (
                  <MdKeyboardArrowRight size={16} />
                ) : (
                  <MdKeyboardArrowDown size={16} />
                )}
                부서 주소록
              </ButtonFold>
              {!isFolded && (
                <LnbTree>
                  {teamStates.map((team, index) => (
                    <li key={team.name}>
                      <LnbSubTree>
                        <MenuItem>
                          <ButtonFold
                            onClick={() => toggleTeamFold(index)}
                            className={noto.className}
                          >
                            {team.folded ? (
                              <MdKeyboardArrowRight size={16} />
                            ) : (
                              <MdKeyboardArrowDown size={16} />
                            )}
                            {team.name}
                          </ButtonFold>
                        </MenuItem>
                        {!team.folded && (
                          <li>
                            {userLists
                              .filter(
                                (member) => member.department === team.name
                              )
                              .map((member) => (
                                <MenuItem key={member.id}>
                                  <UserButton
                                    $isClicked={clickedUsers[member.id]}
                                    onClick={() =>
                                      userButtonClickHandle(member.id)
                                    }
                                    className={noto.className}
                                  >
                                    <ProfileImage
                                      src={member.profile}
                                      alt="프로필사진"
                                      width={25}
                                      height={25}
                                    />
                                    <UserName>{member.name}</UserName>
                                    <TimeZone>{member.zoneid}</TimeZone>
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
                onChange={(e) =>
                  setMeetingData((prev) => ({ ...prev, name: e.target.value }))
                }
              ></Input>
            </InlineDiv>
            <InlineDiv>
              <Label htmlFor="time">Time</Label>
              <SelectTime
                id="time"
                options={runningTime}
                show={false}
                width={10}
                onSelectChange={runningTimeChangeHandle}
              ></SelectTime>
            </InlineDiv>
            <div>
              <Label htmlFor="period">Period</Label>
              <PeriodDiv id="period">
                <DateButton
                  onClick={() => setShowStartMiniCalendar((prev) => !prev)}
                >
                  {selectedStartDate.getFullYear()}.
                  {("0" + (selectedStartDate.getMonth() + 1)).slice(-2)}.
                  {("0" + selectedStartDate.getDate()).slice(-2)}
                </DateButton>
                {showStartMiniCalendar && (
                  <StartCalendarDiv>
                    <MiniCalendar
                      selectDate={startDateHandle}
                      selectedDate={selectedStartDate}
                      close={() => setShowStartMiniCalendar(false)}
                      view="day"
                      $standardDate={new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </StartCalendarDiv>
                )}
                <SelectTime
                  options={intervalTime}
                  show={false}
                  width={6.5}
                  onSelectChange={startTimeChangeHandle}
                  standardIdx={0}
                  disabledIndex={-1}
                ></SelectTime>
                <LineDiv>-</LineDiv>
                <DateButton
                  onClick={() => setShowEndMiniCalendar((prev) => !prev)}
                >
                  {selectedEndDate.getFullYear()}.
                  {("0" + (selectedEndDate.getMonth() + 1)).slice(-2)}.
                  {("0" + selectedEndDate.getDate()).slice(-2)}
                </DateButton>
                {showEndMiniCalendar && (
                  <EndCalendarDiv>
                    <MiniCalendar
                      selectDate={endDateHandle}
                      selectedDate={selectedEndDate}
                      close={() => setShowEndMiniCalendar(false)}
                      view="day"
                      $standardDate={selectedStartDate}
                    />
                  </EndCalendarDiv>
                )}
                <SelectTime
                  options={intervalTime}
                  show={false}
                  width={6.5}
                  onSelectChange={startTimeChangeHandle}
                  standardIdx={0}
                  disabledIndex={-1}
                ></SelectTime>
              </PeriodDiv>
            </div>
            <div>
              <Label htmlFor="detail">Detail</Label>
              <div id="detail">
                <TextArea
                  placeholder="Please enter a detail."
                  value={meetingData.description}
                  onChange={(e) =>
                    setMeetingData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="participant">Participant</Label>
              <ParticipantDiv id="participant">
                {meetingData.memberList.map((member) => {
                  const user = userLists.find(
                    (user) => user.id === member.memberId
                  );
                  return (
                    <div key={member.memberId}>
                      {user ? (
                        <ParticipantInfoDiv
                          onClick={() =>
                            participantRemoveHandle(member.memberId)
                          }
                        >
                          <div>
                            <ProfileImage
                              src={user.profile}
                              alt="프로필사진"
                              width={25}
                              height={25}
                            />
                          </div>
                          <RestDiv>
                            <UserName>{user.name}</UserName>
                            <UserDepartment>{user.department}</UserDepartment>
                          </RestDiv>
                          <div>
                            <OptionalButton
                              className={noto.className}
                              onClick={(e) =>
                                optionalButtonClickHandle(e, member.memberId)
                              }
                              $isRequired={member.isRequired}
                            >
                              {member.isRequired ? "required" : "optional"}
                            </OptionalButton>
                          </div>
                          {/* <CloseButton onClick={() => {}}>
                            <MdClose />
                          </CloseButton> */}
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
        <ButtonBox handleCancel={cancleHandle} handleNext={nextHandle} />
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

const SearchBox = styled.div`
  position: relative;
`;
const SearchDiv = styled.div`
  position: absolute;
  top: 11rem;
  width: 20rem;
  padding: 0 0.7rem;
  background-color: white;
  border: 1px solid ${Color("black200")};
  border-radius: 3px;
  z-index: 1;
`;

const SearchList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  font-size: 12px;
`;

const SearchListOption = styled.li`
  display: flex;
  align-items: center;
  justify-content: start;
  height: 2rem;
  line-height: 2rem;
  margin: 0.2rem 0;
  border-radius: 3px;
  cursor: pointer;
`;

const PeriodDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: start;
`;

const AdressBookDiv = styled.div`
  overflow-y: scroll;
  width: 20rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid ${Color("black200")};
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
  border: 1px solid ${Color("black200")};
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
  color: Color("black");
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
  width: 13rem;
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
  transition: all 0.2s ease-in;
  background-color: ${(props) =>
    props.$isClicked ? Color("yellow100") : Color("black50")};
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  margin-right: 0.5rem;
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

const Department = styled.div`
  color: ${Color("black300")};
`;
const ParticipantInfoDiv = styled.div`
  border: 1px solid ${Color("black200")};
  border-radius: 10px;
  padding: 0.5rem;
  width: 10.3rem;
  height: 3rem;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin: 0.2rem;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: ${Color("orange50")};
    cursor: pointer;
  }
`;

const UserDepartment = styled.div`
  font-size: 10px;
`;

const OptionalButton = styled.button<{ $isRequired: boolean }>`
  border: 1px solid
    ${(props) => (props.$isRequired ? Color("black200") : Color("blue600"))};
  color: ${(props) =>
    props.$isRequired ? Color("black200") : Color("blue600")};
  border-radius: 2px;
  background: none;
  width: 2.7rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 9px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
`;

const RestDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-wrap: wrap;
  width: 5rem;
`;

const StartCalendarDiv = styled.div`
  position: relative;
  top: -4rem;
  left: -15rem;
`;

const EndCalendarDiv = styled.div`
  position: relative;
  top: -4rem;
  left: -15rem;
`;

const DateButton = styled.div`
  width: 5rem;
  height: 2rem;
  background: none;
  border: 1px solid ${Color("black200")};
  border-radius: 3px;
  cursor: pointer;
  margin-right: 0.5rem;
  padding: 0.1rem 0.7rem;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const LineDiv = styled.div`
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Color("black")};
`;
