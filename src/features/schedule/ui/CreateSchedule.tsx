import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineDescription } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { format, addDays } from "date-fns";

import { Togle } from "@/shared/index";
import { Color } from "@/shared/lib/styles/color";

type colorT = "blue" | "green" | "orange" | "yellow";

interface ICreateScheduleProps {
  close: () => void;
  startDate: Date;
}
export function CreateSchedule({ close, startDate }: ICreateScheduleProps) {
  // 외부영역 클릭 확인을위한 ref
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  // 외부영역 클릭시 더보기 일정 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref2.current && !ref2.current.contains(event.target as Node)) {
        setShowRecurrence(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const organizerId = "1"; // 주최자 아이디 나중에 수정
  const [name, setName] = useState<string>(""); // 일정 이름
  const [isDescription, setIsDescription] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(""); // 일정 설명
  const type = "PERSONAL";
  const [selectedColor, setSelectedColor] = useState<colorT>("blue");
  const [startDatetime, setStartDatetime] = useState<string>(
    format(startDate, "yyyy-MM-ddHH:mm:ss")
  ); // 시작 날짜
  const [endDatetime, setEndDatetime] = useState<string>(
    format(addDays(startDate, 1), "yyyy-MM-ddHH:mm:ss")
  ); // 종료 날짜
  console.log(startDatetime, endDatetime);
  const [isAllDay, setIsAllDay] = useState<boolean>(false); // 종일 여부
  const [isPublic, setIsPublic] = useState<boolean>(false); // 공개 여부
  const [isRecurrence, setIsRecurrence] = useState<boolean>(false); // 반복 여부
  const [freq, setFreq] = useState<string>("WEEKLY"); // 반복 주기
  const [intv, setIntv] = useState<number>(1); // 반복 간격
  const [isExpiredDate, setIsExpiredDate] = useState<boolean>(false); // 종료 날짜 여부
  const [expiredDate, setExpiredDate] = useState<string>("2050-12-31"); // 종료 날짜
  const [isCount, setIsCount] = useState<boolean>(false); // 반복 횟수 여부
  const [count, setCount] = useState<number>(10); // 반복 횟수
  const [showRecurrence, setShowRecurrence] = useState<boolean>(false); // 반복 설정 보여주기 여부

  const handleRadioChange = (event: any) => {
    const { value } = event.target;
    switch (value) {
      case "never":
        setIsExpiredDate(false);
        setIsCount(false);
        break;
      case "on":
        setIsExpiredDate(true);
        setIsCount(false);
        break;
      case "after":
        setIsExpiredDate(false);
        setIsCount(true);
        break;
      default:
    }
  };
  const [recurrenceDay, setRecurrenceDay] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const day = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const handleDayClick = (day: string) => {
    setRecurrenceDay((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  return (
    <MainLayout ref={ref} data-testid={"create schedule"}>
      <div>Create Schedule</div>
      <input
        placeholder="Add a title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input type="date"></input>
      <TogleDiv>
        allday
        <Togle
          isOn={isAllDay}
          onToggle={() => {
            setIsAllDay((prev) => !prev);
          }}
        ></Togle>
      </TogleDiv>
      <TogleDiv>
        Recurrence{" "}
        <Togle
          isOn={isRecurrence}
          onToggle={() => {
            setIsRecurrence((prev) => !prev);
            setShowRecurrence(false);
          }}
        ></Togle>
        {isRecurrence && (
          <RecurrenceRowLayout2>
            <button onClick={() => setShowRecurrence((prev) => !prev)}>setting</button>
            <div>
              {" "}
              every
              {intv +
                " " +
                (freq === "MONTHLY" ? "MONTH" : freq === "WEEKLY" ? "WEEK" : "DAY") +
                " on " +
                (freq === "MONTHLY"
                  ? format(new Date(), "dd")
                  : freq === "WEEKLY"
                  ? recurrenceDay.map((d) => d).join(", ")
                  : format(new Date(), "dd"))}
            </div>
          </RecurrenceRowLayout2>
        )}
        {showRecurrence && (
          <RecurrenceLayout ref={ref2}>
            <div>Recurrence</div>
            <RecurrenceRowLayout>
              <div>Recurrence every</div>
              <RecurrenceEveryLayout>
                <div>{intv}</div>
                <PlusMinusLayout>
                  <PlusMinusDiv onClick={() => setIntv((prev) => prev + 1)}>
                    <IoIosArrowUp></IoIosArrowUp>
                  </PlusMinusDiv>
                  <PlusMinusDiv onClick={() => setIntv((prev) => Math.max(1, prev - 1))}>
                    <IoIosArrowDown></IoIosArrowDown>
                  </PlusMinusDiv>
                </PlusMinusLayout>
                <FreqLayout onClick={() => setExpanded(!expanded)}>
                  <FreqDiv>{freq}</FreqDiv>
                  <ArrowDiv>
                    <FaAngleDown size={10} />
                  </ArrowDiv>
                  {/* 확장 시 view 선택 버튼 렌더링 */}
                  {expanded && (
                    <DropdownLayout>
                      <div onClick={() => setFreq("MONTHLY")}>MONTHLY</div>
                      <div onClick={() => setFreq("WEEKLY")}>WEEKLY</div>
                      <div onClick={() => setFreq("DAILY")}>DAILY</div>
                    </DropdownLayout>
                  )}
                </FreqLayout>
              </RecurrenceEveryLayout>
            </RecurrenceRowLayout>
            <RecurrenceRowLayout>
              Recurrence on
              {freq === "WEEKLY" && (
                <DayLayout>
                  {day.map((d) => (
                    <DayDiv
                      key={d}
                      color={recurrenceDay.includes(d) ? "lightgray" : "white"}
                      onClick={() => handleDayClick(d)}
                    >
                      {d}
                    </DayDiv>
                  ))}
                </DayLayout>
              )}
            </RecurrenceRowLayout>
            <div>ends</div>
            <EndsLayout>
              <RadioLayout>
                <RadioDiv>
                  <input
                    type="radio"
                    value={"never"}
                    checked={!isExpiredDate && !isCount}
                    onClick={handleRadioChange}
                  />
                  <div>never</div>
                </RadioDiv>
                <RadioDiv>
                  <input
                    type="radio"
                    value={"on"}
                    checked={isExpiredDate}
                    onClick={handleRadioChange}
                  />
                  <div>on</div>
                </RadioDiv>
                <RadioDiv>
                  <input
                    type="radio"
                    checked={isCount}
                    onClick={handleRadioChange}
                    value={"after"}
                  />
                  <div>after</div>
                </RadioDiv>
              </RadioLayout>
              <RadioLayout>
                <div></div>
                {isExpiredDate ? (
                  <input
                    type="date"
                    value={expiredDate}
                    onChange={(e) => setExpiredDate(e.target.value)}
                  ></input>
                ) : (
                  <div></div>
                )}
                {isCount ? (
                  <EndsLayout>
                    <div>{count} occurrences</div>
                    <PlusMinusLayout>
                      <PlusMinusDiv onClick={() => setCount((prev) => prev + 1)}>
                        <IoIosArrowUp></IoIosArrowUp>
                      </PlusMinusDiv>
                      <PlusMinusDiv onClick={() => setCount((prev) => Math.max(1, prev - 1))}>
                        <IoIosArrowDown></IoIosArrowDown>
                      </PlusMinusDiv>
                    </PlusMinusLayout>
                  </EndsLayout>
                ) : (
                  <div></div>
                )}
              </RadioLayout>
            </EndsLayout>
            <ButtonLayout>
              <div></div>
              <button>save</button>
              <button
                onClick={() => {
                  setShowRecurrence(false);
                  setIsCount(false);
                  setIsExpiredDate(false);
                  setCount(10);
                  setExpiredDate("2050-12-31");
                }}
              >
                cancel
              </button>
            </ButtonLayout>
          </RecurrenceLayout>
        )}
      </TogleDiv>
      <TogleDiv>
        Public{" "}
        <Togle
          isOn={isPublic}
          onToggle={() => {
            setIsPublic((prev) => !prev);
          }}
        ></Togle>
      </TogleDiv>
      <ColorDiv>
        <ColorCircle
          onClick={() => setSelectedColor("blue")}
          selectedColor={selectedColor}
          color="blue"
        >
          {selectedColor === "blue" && <CheckDiv>✔</CheckDiv>}
        </ColorCircle>
        <ColorCircle
          onClick={() => setSelectedColor("green")}
          selectedColor={selectedColor}
          color="green"
        >
          {selectedColor === "green" && <CheckDiv>✔</CheckDiv>}
        </ColorCircle>
        <ColorCircle
          onClick={() => setSelectedColor("orange")}
          selectedColor={selectedColor}
          color="orange"
        >
          {selectedColor === "orange" && <CheckDiv>✔</CheckDiv>}
        </ColorCircle>
        <ColorCircle
          onClick={() => setSelectedColor("yellow")}
          selectedColor={selectedColor}
          color="yellow"
        >
          {selectedColor === "yellow" && <CheckDiv>✔</CheckDiv>}
        </ColorCircle>
      </ColorDiv>
      {!isDescription && (
        <DescriptionText onClick={() => setIsDescription((prev) => !prev)}>
          add description
        </DescriptionText>
      )}
      {isDescription && (
        <DescriptionLayout>
          <IconDiv onClick={() => setIsDescription((prev) => !prev)}>
            <MdOutlineDescription size={20} />
          </IconDiv>
          <textarea
            placeholder="Add a description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </DescriptionLayout>
      )}
      <ButtonLayout>
        <div></div>
        <button>save</button> <button onClick={close}>cancel</button>
      </ButtonLayout>
    </MainLayout>
  );
}

const MainLayout = styled.div`
  position: fixed;
  top: 10px;
  background-color: white;
  width: 350px;
  z-index: 100;
  color: black;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
  display: grid;
  justify-items: left;
  row-gap: 2px;
  font-size: small;
`;
const TogleDiv = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 1fr;
  text-align: left;
`;
const ColorDiv = styled.div`
  display: grid;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  text-align: left;
`;
const ColorCircle = styled.div<{ color: colorT; selectedColor: colorT }>`
  margin-right: 5px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => Color(props.color)};
  position: relative;
`;
const CheckDiv = styled.div`
  color: white;
  border-radius: 10px;
  text-align: center;
  position: absolute;
  left: 4px;
  bottom: 1px;
`;
const DescriptionText = styled.div`
  color: ${Color("black100")};
`;
const DescriptionLayout = styled.div`
  margin-top: 5px;
  border-top: 1px solid ${Color("black100")};
  padding: 5px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 30px 1fr;
`;
const ButtonLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 60% 1fr 1fr;
  justify-content: right;
  grid-column-gap: 5px;
  margin-top: 10px;
`;
const IconDiv = styled.div`
  display: grid;
`;
const RecurrenceLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  position: absolute;
  width: 350px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  z-index: 100;
  right: 0;
  gap: 5px;
`;
const RecurrenceRowLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const RecurrenceRowLayout2 = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
`;
const DayLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const EndsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const RadioLayout = styled.div`
  display: grid;
  grid-template-rows: 20px 20px 20px;
`;
const RadioDiv = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr;
  height: 20px;
`;

const DayDiv = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border: 1px solid ${Color("black100")};
  padding: 2px;
  width: 27px;
  text-align: center;
  cursor: pointer;
`;
const RecurrenceEveryLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
`;
const PlusMinusLayout = styled.div`
  height: 35px;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const PlusMinusDiv = styled.div`
  height: 10px;
`;

const FreqLayout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid lightgray;
  padding: 1px 5px;
  z-index: 100;
`;
const FreqDiv = styled.div`
  width: 50px;
`;
const ArrowDiv = styled.div`
  height: 25px;
  margin: 0 auto;
`;
const DropdownLayout = styled.div`
  height: 35px;
  display: grid;
  position: absolute;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: white;
  top: 25px;
  padding: 10px 20px 10px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
