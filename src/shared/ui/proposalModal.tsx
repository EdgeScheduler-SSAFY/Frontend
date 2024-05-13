"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import { ModalProps } from "@/shared/lib/type/index";

export default function ProposalModal({ open, children, onClose }: ModalProps) {
  const [prevScrollY, setPrevScrollY] = useState<number | undefined>(undefined);
  const [hasScrollbar, setHasScrollbar] = useState<boolean>(false);

  // 모달 외부를 클릭할 때 모달을 닫는 함수
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose(); // 모달 외부를 클릭하면 모달을 닫음
    }
  };

  // 스크롤이 있는지 확인하는 함수
  const checkScrollbar = (): void => {
    setHasScrollbar(document.body.scrollHeight > window.innerHeight);
  };

  // 스크롤을 방지하고 현재 위치를 반환
  const preventScroll = (): void => {
    const currentScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = hasScrollbar ? "scroll" : "hidden";
    setPrevScrollY(currentScrollY);
  };

  // 스크롤을 허용하고, 스크롤 방지 함수에서 반환된 위치로 이동
  const allowScroll = (): void => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    if (prevScrollY !== undefined) {
      window.scrollTo(0, prevScrollY);
    }
  };

  useEffect((): void => {
    // 컴포넌트가 마운트될 때 스크롤바 여부를 확인
    checkScrollbar();

    if (open) {
      checkScrollbar();
      preventScroll();
    } else {
      allowScroll();
    }
  }, []);

  useEffect((): void => {
    // 모달이 열릴 때마다 스크롤바 여부를 확인하고, 스크롤 방지/허용 함수 호출
    if (open) {
      checkScrollbar();
      preventScroll();
    } else {
      allowScroll();
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div>
      <MainLayout onClick={handleBackdropClick} />
      <ModalLayout>{children}</ModalLayout>
    </div>,
    document.getElementById("globalModal") as HTMLElement
  );
}

const MainLayout = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 600;
  background-color: rgba(0, 0, 0, 0.2);
`;
const ModalLayout = styled.div`
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 600;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 35%;
  max-height: 80%;
  overflow-y: auto;
`;
