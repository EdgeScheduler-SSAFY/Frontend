"use client";
import Image from "next/image";
import styled from "styled-components";

interface userInfoProps {
  profilePath: string;
  altText: string;
  userName: string;
  timeZone: string;
}

export default function UserInfo(props: userInfoProps) {
  const draggables = document.querySelectorAll(".draggable");

  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
  
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });
  
  return (
    <UserButton draggable="true">
      <ProfileImage src={props.profilePath} alt={props.altText} width={25} height={25} />
      <UserName>{props.userName}</UserName>
      <TimeZone> {props.timeZone}</TimeZone>
    </UserButton>
  );
}

const UserButton = styled.button`
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
