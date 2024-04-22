"use client";
import styled from "styled-components";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Meeting() {
  return (
    <MainLayout>
      <HeaderLayout>
        <DateLayout>
          <DateinDateDiv>Date</DateinDateDiv>
          <TimeSelectionLayout>
            <DateDiv>2024.04.18(Thu)</DateDiv>
            <TimeDiv>
              <div>PM 03:45</div>
              <IoMdArrowDropdown />
            </TimeDiv>
            -<DateDiv>2024.04.18(Thu)</DateDiv>
            <TimeDiv>PM 03:45</TimeDiv>
          </TimeSelectionLayout>
        </DateLayout>
        <OptionLayout>
          <OptionButton>fatest</OptionButton>
          <OptionButton>
            minimum
            <br /> absentees
          </OptionButton>
          <OptionButton>
            excellent
            <br /> satisfaction
          </OptionButton>
        </OptionLayout>
      </HeaderLayout>
      <div></div>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: full;
`;

const HeaderLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: full;
`;

const DateLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionLayout = styled.div`
  display: flex;
  height: full;
  align-items: center;
  justify-content: center;
  text-align: right;
`;

const OptionButton = styled.button`
  min-width: 8rem;
  min-height: 3rem;
  border: none;
  border-radius: 5px;
  padding-top: auto;
  padding-bottom: auto;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
`;

const DateDiv = styled.div`
  display: flex;
  min-width: 8rem;
  min-height: 2.5rem;
  border: 1px solid gray;
  padding-top: auto;
  padding-bottom: auto;
  padding-right: 15px;
  padding-left: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 16px;
  align-items: center;
`;

const TimeDiv = styled(DateDiv)`
  min-width: 4rem;
  gap: 1rem;
`;
const DateinDateDiv = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

const TimeSelectionLayout = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;
