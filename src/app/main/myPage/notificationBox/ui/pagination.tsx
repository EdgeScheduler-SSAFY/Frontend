"use client";
import React, { useState } from "react";
import styled from "styled-components";

import { PaginationProps } from "@/shared/lib/type";
import { Color } from "@/shared/lib/styles/color";

export default function Pagination(PaginationData: PaginationProps) {
  const [start, setStart] = useState<number>(0);
  const isSelected = (page: number) => page === PaginationData.currentPage;

  const pageNumbers = [];
  for (let i = start; i <= Math.min(start + 4, PaginationData.totalPages - 1); i++) {
    pageNumbers.push(i + 1);
  }

  const prevPage = () => {
    if (start > 1) {
      setStart(start - 5);
      PaginationData.setPage(start - 5);
    }
  };

  const nextPage = () => {
    if (start + 5 <= PaginationData.totalPages) {
      setStart(start + 5);
      PaginationData.setPage(start + 5);
    }
  };

  return (
    <PaginationDiv>
      <NavButton onClick={prevPage} disabled={start === 0}>{`< Prev`}</NavButton>
      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          onClick={() => PaginationData.setPage(number - 1)}
          $isSelected={isSelected(number - 1)}
        >
          {number}
        </PageButton>
      ))}
      <NavButton onClick={nextPage} disabled={start + 5 > PaginationData.totalPages}>{`Next >`}</NavButton>
    </PaginationDiv>
  );
}

const PaginationDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PageButton = styled.button<{ $isSelected?: boolean }>`
  border: none;
  background: none;
  font-size: 16px;
  margin: 0 0.1rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.5rem 0.8rem;
  transition: all 0.2s ease-in;
  background-color: ${(props) => (props.$isSelected ? Color("black50") : "none")};
  font-weight: ${(props) => (props.$isSelected ? 600 : "")};
  &:hover {
    background: ${Color("black50")};
    font-weight: 600;
  }
`;

const NavButton = styled.button`
  border: none;
  background: none;
  font-size: 16px;
  margin: 0 0.1rem;
  cursor: pointer;
  border-radius: 10px;
  padding: 0.5rem 0.8rem;
  transition: all 0.2s ease-in;
  &:disabled {
    color: ${Color("black100")};
    cursor: not-allowed;
  }
`;
