"use client";
import styled from "styled-components";
import { useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

import { Color } from "@/shared/lib/styles/color";
import Label from "@/shared/ui/label";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import Select from "@/shared/ui/select";
import { meetingTime } from "@/shared/lib/data";
import TextArea from "@/shared/ui/textArea";
import { userLists } from "@/shared/lib/data";

export default function CreateMeeting() {
  // 전체 부서 주소록
  const [isFolded, setIsFolded] = useState(true);
  // 각 부서에 대한 상태를 관리할 배열
  const [teamStates, setTeamStates] = useState([
    { name: "Development Team 1", folded: true },
    { name: "Development Team 2", folded: true },
  ]);

  // 전체 주소록 상태 변경
  const toggleFold = () => {
    setIsFolded(!isFolded);
  };

  // 특정 부서의 상태를 변경
  const toggleTeamFold = (index: number) => {
    setTeamStates((prevState) => prevState.map((team, i) => (i === index ? { ...team, folded: !team.folded } : team)));
  };

  return (
    <MainLayout>
      <CreateWidget>
        <CreateForm>
          <AddressDiv>
            <Label htmlFor='addressbook' width={10}>
              Address Book
            </Label>
            <InlineDiv>
              <Input id='addressbook' type='text' width={14} placeholder='Please enter a search term.' />
            </InlineDiv>
            <AdressBookDiv>
              <HeadBar>
                <ButtonFold onClick={toggleFold}>
                  {" "}
                  {isFolded ? <MdKeyboardArrowRight size={16} /> : <MdKeyboardArrowDown size={16} />}부서 주소록
                </ButtonFold>
              </HeadBar>
              {!isFolded && (
                <LnbTree>
                  {teamStates.map((team, index) => (
                    <li key={team.name}>
                      <LnbSubTree>
                        <MenuItem>
                          <ButtonFold onClick={() => toggleTeamFold(index)}>
                            {team.folded ? <MdKeyboardArrowRight size={16} /> : <MdKeyboardArrowDown size={16} />}
                            {team.name}
                          </ButtonFold>
                        </MenuItem>
                        {!team.folded && (
                          <li>
                            {userLists[team.name].map((member, index) => (
                              <MenuItem key={index}>
                                <button className='draggable' draggable='true'>
                                  <Image src='/images/profile.webp' alt='프로필사진' width={20} height={20} />
                                  {member.name}
                                </button>
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
              <Label htmlFor='title'>Title</Label>
              <Input id='title' type='text' width={25} placeholder='Please enter a title.' />
            </InlineDiv>
            <InlineDiv>
              <Label htmlFor='time'>Time</Label>
              <Select id='time' options={meetingTime}></Select>
            </InlineDiv>
            <div>
              <Label htmlFor='period'>Period</Label>
              <PeriodDiv id='period'>
                <Select options={meetingTime}></Select>
                <Select options={meetingTime}></Select>
              </PeriodDiv>
            </div>
            <div>
              <Label htmlFor='detail'>Detail</Label>
              <div id='detail'>
                <TextArea placeholder='Please enter a detail.' />
              </div>
            </div>
            <div>
              <Label htmlFor='participant'>Participant</Label>
              <ParticipantDiv className='container' id='participant'></ParticipantDiv>
            </div>
          </InformationDiv>
        </CreateForm>
        <ButtonDiv>
          <Button>next</Button>
          <Button color='black' bgcolor='black50' hovercolor='black100'>
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
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InformationDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  padding: 1rem 5rem;
`;

const AdressBookDiv = styled.div`
  overflow-y: scroll;
  width: 14rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid ${Color("black200")};
  border-radius: 3px;
  font-size: 14px;
  height: 24rem;
  margin-top: 0.5rem;
`;

const ParticipantDiv = styled.div`
  overflow-y: scroll;
  width: 70%;
  padding: 0.5rem 0.7rem;
  font-size: 14px;
  height: 8rem;
  border: 1px solid ${Color("black200")};
  border-radius: 3px;
`;

// const MenuBox = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   padding: 10px;
//   width: 200px;
// `;

const HeadBar = styled.div``;

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
