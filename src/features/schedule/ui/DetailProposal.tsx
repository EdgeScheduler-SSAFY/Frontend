import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { format } from "date-fns";

import Button from "@/shared/ui/button";
import { Color } from "@/shared/lib/styles/color";
import {
  searchAvailableAttendees,
  searchAvailableAttendeesResponse,
  proposalAnswer,
} from "@/features/schedule/index";
interface IDetailProposalProps {
  startDatetime: string;
  endDatetime: string;
  name: string;
  reason: string;
  scheduleId: number;
  proposalId: number;
  close: () => void;
  triggerReload: () => void;
}

export function DetailProposal({
  endDatetime,
  name,
  reason,
  scheduleId,
  startDatetime,
  proposalId,
  close,
  triggerReload,
}: IDetailProposalProps) {
  const [attendeeList, setAttendeeList] = useState<searchAvailableAttendeesResponse>({
    availableMembers: [],
    unavailableMembers: [],
  });
  useEffect(() => {
    async function fetchAttendees() {
      const response = await searchAvailableAttendees({
        scheduleId: scheduleId,
        startDatetime: format(startDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
        endDatetime: format(endDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
      });

      if (response) {
        setAttendeeList(response);
      } else {
        setAttendeeList({ availableMembers: [], unavailableMembers: [] });
      }
    }

    fetchAttendees();
  }, [scheduleId, startDatetime, endDatetime]);

  const handleButtonClick = async (isAccepted: boolean) => {
    await proposalAnswer({
      scheduleId,
      proposalId,
      isAccepted,
    });
  };

  return ReactDOM.createPortal(
    <BackLayout id="detailProposal" onClick={close}>
      <MainLayout>
        <NameLayout>
          <div>suggested time</div>
        </NameLayout>
        <div>{name}</div>
        <DataLayout>
          {startDatetime &&
          endDatetime &&
          format(startDatetime, "yyyy-MM-dd(EE)") !== format(endDatetime, "yyyy-MM-dd(EE)") ? (
            <div>
              {format(startDatetime, "yyyy-MM-dd(EE) HH:mm a") +
                " ~ " +
                format(endDatetime, "yyyy-MM-dd(EE) HH:mm a")}
            </div>
          ) : (
            <div>
              {format(startDatetime, "yyyy-MM-dd(EE) HH:mm a") +
                " ~ " +
                format(endDatetime, "HH:mm a")}
            </div>
          )}
        </DataLayout>
        <div>reason</div>
        <SmTextDiv>{reason}</SmTextDiv>
        <LabelLayout>
          <BoldDiv>available</BoldDiv>
          <BoldDiv>unavailable</BoldDiv>
        </LabelLayout>
        <AttendeeLayout>
          <div>
            <ProfilesLayout>
              {attendeeList.availableMembers.map((attendee) => (
                <ProfileLayout key={attendee.memberId}>
                  <ProfileImage src="" alt="" />
                  <AteendeeNameLayout>
                    <div>{attendee.memberName}</div>
                    {attendee.isRequired && <RequiredDiv>required</RequiredDiv>}
                  </AteendeeNameLayout>
                </ProfileLayout>
              ))}
            </ProfilesLayout>
          </div>
          <div>
            <ProfilesLayout>
              {attendeeList.unavailableMembers.map((attendee: any) => (
                <ProfileLayout key={attendee.memberId}>
                  <ProfileImage src="" alt="" />
                  <AteendeeNameLayout>
                    <div>{attendee.memberName}</div>
                    {attendee.isRequired && <RequiredDiv>required</RequiredDiv>}
                  </AteendeeNameLayout>
                </ProfileLayout>
              ))}
            </ProfilesLayout>
          </div>
        </AttendeeLayout>
        <ButtonLayout>
          <div></div>
          <Button
            onClick={async () => {
              await handleButtonClick(true);
              triggerReload && triggerReload();
              close();
            }}
          >
            accept
          </Button>
          <Button
            onClick={async () => {
              await handleButtonClick(false);
              triggerReload && triggerReload();
              close();
            }}
          >
            decline
          </Button>
        </ButtonLayout>
      </MainLayout>
    </BackLayout>,
    document.getElementById("globalModal") as HTMLElement
  );
}
const BackLayout = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 600;
  background-color: rgba(0, 0, 0, 0.3);
`;
const MainLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  background-color: #fff;
  z-index: 200;
`;
const NameLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr max-content;
  padding: 5px 0;
  border-bottom: 2px solid black;
  margin-bottom: 5px;
`;
const DataLayout = styled.div`
  padding: 10px 0 0 5px;
`;
const AttendeeLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px 0 0 5px;
  height: 120px;
  overflow: auto;
`;
const SmTextDiv = styled.div`
  font-size: smaller;
  color: ${Color("black400")};
`;

const ButtonLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60% 1fr 1fr;
  justify-content: right;
  grid-column-gap: 5px;
  margin-top: 10px;
`;
const ProfilesLayout = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 5px;
  height: 120px;
  overflow: auto;
`;
const ProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  position: relative;
`;
const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
`;
const AteendeeNameLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: smaller;
  align-items: center;
`;
const RequiredDiv = styled.div`
  color: ${Color("blue")};
`;
const BoldDiv = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;
const LabelLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
