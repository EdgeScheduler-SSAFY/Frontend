import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { MdOutlineDescription } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { format, addHours } from "date-fns";
import ReactDOM from "react-dom";

import { Togle } from "@/shared/index";
import { Color } from "@/shared/lib/styles/color";
import Button from "@/shared/ui/button";
import Input from "@/shared/ui/input";
import {
  createSchedule,
  getScheduleDetailsResponse,
  updateSchedule,
} from "@/features/schedule/index";
import { MiniCalendar } from "@/shared";
import { intervalTime } from "@/shared/lib/data";
import SelectTime from "@/shared/ui/selectTime";

type colorT = "blue" | "green" | "orange" | "yellow" | "black50";

interface ICreateScheduleProps {
  close: () => void;
  startDate: Date;
  type: "MEETING" | "WORKING" | "PERSONAL";
  isUpdate?: boolean; // 일정 수정 여부
  data?: getScheduleDetailsResponse; // 일정 수정시 초기값
  isWORKING?: boolean; //  WORKING 일정 여부
  triggerReload: () => void;
  left: number;
  top: number;
}
export function CreateSchedule({
  close,
  startDate,
  isUpdate,
  data,
  type,
  isWORKING,
  triggerReload,
  left,
  top,
}: ICreateScheduleProps) {
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

  const [name, setName] = useState<string>(data?.name || ""); // 일정 이름
  const [isDescription, setIsDescription] = useState<boolean>(!!data?.description);
  const [description, setDescription] = useState<string>(data?.description || ""); // 일정 설명
  // 일정 수정시 초기값이 있으면 색상 초기값 설정
  const initiallColor =
    data?.color !== undefined && data?.color === 0
      ? "blue"
      : data?.color === 1
      ? "green"
      : data?.color === 2
      ? "orange"
      : data?.color === 3
      ? "yellow"
      : "blue";
  const [selectedColor, setSelectedColor] = useState<colorT>(initiallColor || "blue");
  const [startDatetime, setStartDatetime] = useState<string>(
    data?.startDatetime
      ? format(data.startDatetime, "yyyy-MM-dd'T'HH:mm:ss")
      : format(startDate, "yyyy-MM-dd'T'HH:mm:ss")
  ); // 시작 날짜
  const [endDatetime, setEndDatetime] = useState<string>(
    data?.endDatetime
      ? format(data.endDatetime, "yyyy-MM-dd'T'HH:mm:ss")
      : format(addHours(startDate, 1), "yyyy-MM-dd'T'HH:mm:ss")
  ); // 종료 날짜
  // 일정 수정시 종일 일정 여부 확인
  const initialIsAllDay =
    data?.startDatetime && data?.endDatetime
      ? format(data.startDatetime, "HH:mm:ss") === "00:00:00" &&
        format(data.endDatetime, "HH:mm:ss") === "23:59:59"
      : false;
  const [isAllDay, setIsAllDay] = useState<boolean>(initialIsAllDay); // 종일 여부
  const [isPublic, setIsPublic] = useState<boolean>(data?.isPublic || false); // 공개 여부
  const [isRecurrence, setIsRecurrence] = useState<boolean>(!!data?.recurrenceDetails); // 반복 여부
  const [freq, setFreq] = useState<"DAILY" | "WEEKLY" | "MONTHLY">(
    data?.recurrenceDetails?.freq || "WEEKLY"
  ); // 반복 주기
  const [intv, setIntv] = useState<number>(data?.recurrenceDetails?.intv || 1); // 반복 간격
  const [isExpiredDate, setIsExpiredDate] = useState<boolean>(
    !!data?.recurrenceDetails?.expiredDate || false
  ); // 종료 날짜 여부
  const [expiredDate, setExpiredDate] = useState<Date>(
    !!data?.recurrenceDetails?.expiredDate
      ? new Date(data?.recurrenceDetails?.expiredDate)
      : startDate
  ); // 종료 날짜
  const [isCount, setIsCount] = useState<boolean>(
    data?.recurrenceDetails?.count && !data?.recurrenceDetails?.expiredDate ? true : false
  ); // 반복 횟수 여부
  const [count, setCount] = useState<number>(data?.recurrenceDetails?.count || 1); // 반복 횟수
  const [showRecurrence, setShowRecurrence] = useState<boolean>(false); // 반복 설정 보여주기 여부

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
  const dayOfWeek: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[] = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];
  const [recurrenceDay, setRecurrenceDay] = useState<
    ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[]
  >(data?.recurrenceDetails?.recurrenceDay || [dayOfWeek[startDate.getDay()]]); // 반복 요일
  const [expanded, setExpanded] = useState<boolean>(false);
  const day: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[] = [
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
  ];
  // 반복 요일 클릭시 실행될 함수
  const handleDayClick = (day: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN") => {
    setRecurrenceDay((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day); // 요일 삭제
      } else {
        return [...prev, day];
      }
    });
  };
  const user = sessionStorage.getItem("user") || "{}"; // 유저 정보
  // 일정 생성 api 호출
  const saveSchedule = async () => {
    await createSchedule({
      organizerId: parseInt(JSON.parse(user).id),
      name: name,
      description: description,
      type: type,
      color:
        selectedColor === "blue"
          ? 0
          : selectedColor === "green"
          ? 1
          : selectedColor === "orange"
          ? 2
          : 3,
      startDatetime: isAllDay ? startDatetime.split("T")[0] + "T00:00:00" : startDatetime, //all day 일정이면 00:00:00으로 설정
      endDatetime: isAllDay ? endDatetime.split("T")[0] + "T23:45:00" : endDatetime, // all day 일정이면 23:45:00으로 설정
      isPublic: isWORKING ? true : isPublic,
      isRecurrence: isRecurrence,
      recurrence: isRecurrence
        ? {
            freq: freq,
            intv: intv,
            ...(isExpiredDate ? { expiredDate: format(expiredDate, "yyyy-MM-dd'T'HH:mm:ss") } : {}),
            ...(isCount ? { count: count } : {}),
            recurrenceDay: recurrenceDay,
          }
        : undefined,
    });
  };
  // 날짜 와 시간선택을 위한 상태값
  const [showStartMiniCalendar, setShowStartMiniCalendar] = useState<boolean>(false);
  const [showEndMiniCalendar, setShowEndMiniCalendar] = useState<boolean>(false);
  const [showRecurrenceMiniCalendar, setShowRecurrenceMiniCalendar] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(
    new Date(data?.endDatetime ?? new Date(startDate).setHours(23, 59, 59, 999)) //시작시간의 마지막 시간으로 설정
  );
  const [sameDate, setSameDate] = useState<boolean>(true);
  const [disabledIndex, setDisabledIndex] = useState<number>(
    Math.ceil((startDate.getHours() * 60 + startDate.getMinutes()) / 15)
  );

  console.log(disabledIndex);
  // 시작날짜 값이 변경될 때 실행될 함수
  const startDateHandle = (selectedDate: Date) => {
    setSelectedStartDate(selectedDate);
    // 끝 날짜가 더 빠를 때만 변경
    if (selectedDate > selectedEndDate) {
      setSelectedEndDate(selectedDate);
    }
    const startTime = startDatetime.split("T")[1]; // 기존 시작 시간
    setStartDatetime(format(selectedDate, "yyyy-MM-dd") + "T" + startTime);
  };

  // 시작시간 값이 변경될 때 실행될 함수
  const startTimeChangeHandle = (value: number | string) => {
    const startDate = startDatetime.split("T")[0]; // 기존 시작 날짜
    setStartDatetime(startDate + "T" + value);
    setDisabledIndex(intervalTime.findIndex((option) => option.value === value));
  };
  // 끝날짜 값이 변경될 때 실행될 함수
  const endDateHandle = (selectedDate: Date) => {
    setSelectedEndDate(selectedDate);
    const endTime = endDatetime.split("T")[1]; // 기존 시작 시간
    setEndDatetime(format(selectedDate, "yyyy-MM-dd") + "T" + endTime);

    // 두 날짜가 같은지 확인
    setSameDate(selectedDate.getDate() === selectedStartDate.getDate());
  };
  // 끝시간 값이 변경될 때 실행될 함수
  const endTimeChangeHandle = (value: number | string) => {
    const endDate = endDatetime.split("T")[0]; // 기존 시작 날짜
    setEndDatetime(endDate + "T" + value);
  };

  const [isOneOff, setIsOneOff] = useState<boolean>(true); // 반복 일정의 수정시 일회성 여부

  //일정 수정 api 호출
  const handleupdateSchedule = async () => {
    if (data === undefined) return;
    await updateSchedule({
      scheduleId: data?.scheduleId || 0,
      organizerId: parseInt(JSON.parse(user).id),
      name: name,
      description: description,
      type: data.type,
      color:
        selectedColor === "blue"
          ? 0
          : selectedColor === "green"
          ? 1
          : selectedColor === "orange"
          ? 2
          : 3,
      startDatetime: isAllDay ? startDatetime.split("T")[0] + "T00:00:00" : startDatetime,
      endDatetime: isAllDay ? endDatetime.split("T")[0] + "T23:45:00" : endDatetime,
      isPublic: isPublic,
      isRecurrence: data.recurrenceDetails ? true : isRecurrence,
      isOneOff: isOneOff,
      nameIsChanged: data.name !== name,
      descriptionIsChanged: data.description !== description,
      timeIsChanged:
        format(data.startDatetime, "yyyy-MM-dd'T'HH:mm:ss") !== startDatetime ||
        format(data.endDatetime, "yyyy-MM-dd'T'HH:mm:ss") !== endDatetime,
      recurrence: isRecurrence
        ? {
            freq: freq,
            intv: intv,
            ...(isExpiredDate ? { expiredDate: format(expiredDate, "yyyy-MM-dd'T'HH:mm:ss") } : {}),
            ...(isCount ? { count: count } : {}),
            recurrenceDay: recurrenceDay,
          }
        : undefined,
      parentEndDatetime: format(data.endDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
      parentStartDatetime: format(data.startDatetime, "yyyy-MM-dd'T'HH:mm:ss"),
    });
  };
  return ReactDOM.createPortal(
    <MainLayout
      id="createScheduleModal"
      ref={ref}
      data-testid={"create schedule"}
      left={left}
      top={top}
      onClick={(e) => e.stopPropagation()}
    >
      {isUpdate ? <b>Update Schedule</b> : <b>Create Schedule</b>}
      <Input
        id="name"
        placeholder="Add a title"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></Input>
      {/* 날짜 시간 설정 */}
      <PeriodDiv id="period">
        <DateButton onClick={() => setShowStartMiniCalendar((prev) => !prev)}>
          {selectedStartDate.getFullYear()}.{("0" + (selectedStartDate.getMonth() + 1)).slice(-2)}.
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
        {!isAllDay ? (
          <SelectTime
            options={intervalTime}
            show={false}
            width={6.5}
            onSelectChange={startTimeChangeHandle}
            standardIdx={
              data?.startDatetime instanceof Date
                ? Math.round(
                    (data?.startDatetime.getHours() * 60 + data?.startDatetime.getMinutes()) / 15
                  )
                : disabledIndex
            }
            disabledLastIndex={intervalTime.length}
          ></SelectTime>
        ) : (
          <DisableDiv>00:00:00</DisableDiv>
        )}
        <LineDiv>-</LineDiv>
        <DateButton onClick={() => setShowEndMiniCalendar((prev) => !prev)}>
          {selectedEndDate.getFullYear()}.{("0" + (selectedEndDate.getMonth() + 1)).slice(-2)}.
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
        {!isAllDay ? (
          <SelectTime
            options={intervalTime}
            show={false}
            width={6.5}
            onSelectChange={endTimeChangeHandle}
            standardIdx={
              data?.endDatetime instanceof Date
                ? Math.round(
                    (data?.endDatetime.getHours() * 60 + data?.endDatetime.getMinutes()) / 15
                  )
                : disabledIndex + 4
            }
            disabledIndex={sameDate ? disabledIndex : -1}
          ></SelectTime>
        ) : (
          <DisableDiv>23:59:59</DisableDiv>
        )}
      </PeriodDiv>
      {/* 수정일때만 표시하는 oneoff */}
      {isUpdate && (
        <TogleDiv>
          is one off
          <Togle
            $isOn={isOneOff}
            onToggle={() => {
              setIsOneOff((prev) => !prev);
              setIsRecurrence((prev) => !prev);
            }}
          ></Togle>
        </TogleDiv>
      )}
      {/* WORKING 등록시에는 사용x */}
      {!isWORKING && (
        <TogleDiv>
          allday
          <Togle
            isOn={isAllDay}
            onToggle={() => {
              setIsAllDay((prev) => !prev);
            }}
          ></Togle>
        </TogleDiv>
      )}
      {/* 반복설정 */}
      {!(isUpdate && !data?.recurrenceDetails) && (
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
              <Button
                width={3}
                height={1.5}
                fontSize={12}
                onClick={() => setShowRecurrence((prev) => !prev)}
              >
                setting
              </Button>
              <RecurrenceText>
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
              </RecurrenceText>
            </RecurrenceRowLayout2>
          )}
          {showRecurrence && (
            <RecurrenceLayout ref={ref2}>
              <b>Recurrence</b>
              <RecurrenceRowLayout>
                <div>Recurrence every</div>
                <RecurrenceEveryLayout>
                  {/* 반복횟수 */}
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
                    {/* 반복주기 */}
                    <FreqDiv>{freq}</FreqDiv>
                    <ArrowDiv>
                      <FaAngleDown size={10} />
                    </ArrowDiv>
                    {/* 확장 시 view 선택 버튼 렌더링 */}
                    {expanded && (
                      <DropdownLayout>
                        <DropdownDiv onClick={() => setFreq("MONTHLY")}>MONTHLY</DropdownDiv>
                        <DropdownDiv onClick={() => setFreq("WEEKLY")}>WEEKLY</DropdownDiv>
                        <DropdownDiv onClick={() => setFreq("DAILY")}>DAILY</DropdownDiv>
                      </DropdownLayout>
                    )}
                  </FreqLayout>
                </RecurrenceEveryLayout>
              </RecurrenceRowLayout>
              {/* 반복요일 */}
              <RecurrenceRowLayout>
                Recurrence on
                {freq === "WEEKLY" && (
                  <DayLayout>
                    {day.map((d: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN") => (
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
              {/* 반복 종료 시점 */}
              <EndsLayout>
                <RadioLayout>
                  <RadioDiv>
                    <input
                      type="radio"
                      value={"never"}
                      checked={!isExpiredDate && !isCount}
                      onChange={handleRadioChange}
                    />
                    <div>never</div>
                  </RadioDiv>
                  <RadioDiv>
                    <input
                      type="radio"
                      value={"on"}
                      checked={isExpiredDate}
                      onChange={handleRadioChange}
                    />
                    <div>on</div>
                  </RadioDiv>
                  <RadioDiv>
                    <input
                      type="radio"
                      checked={isCount}
                      onChange={handleRadioChange}
                      value={"after"}
                    />
                    <div>after</div>
                  </RadioDiv>
                </RadioLayout>
                {/* 반복 종료날짜 */}
                <RadioLayout>
                  <div></div>
                  {isExpiredDate ? (
                    <DateButton onClick={() => setShowRecurrenceMiniCalendar((prev) => !prev)}>
                      {expiredDate.getFullYear()}.{("0" + (expiredDate.getMonth() + 1)).slice(-2)}.
                      {("0" + expiredDate.getDate()).slice(-2)}
                    </DateButton>
                  ) : (
                    <div></div>
                  )}
                  {showRecurrenceMiniCalendar && (
                    <StartCalendarDiv>
                      <MiniCalendar
                        selectDate={setExpiredDate}
                        selectedDate={expiredDate}
                        close={() => setShowRecurrenceMiniCalendar(false)}
                        view="day"
                        $standardDate={new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </StartCalendarDiv>
                  )}
                  {/* 반복 횟수 */}
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
                <Button
                  width={3}
                  height={1.5}
                  fontSize={12}
                  onClick={() => setShowRecurrence(false)}
                >
                  save
                </Button>
                <Button
                  width={3}
                  height={1.5}
                  fontSize={12}
                  onClick={() => {
                    setShowRecurrence(false);
                    setIsCount(false);
                    setIsExpiredDate(false);
                    setCount(10);
                    setExpiredDate(startDate);
                  }}
                >
                  cancel
                </Button>
              </ButtonLayout>
            </RecurrenceLayout>
          )}
        </TogleDiv>
      )}
      {/* 공개여부 WORKING은 항상공개이기떄문에 비활성화 */}
      {!isWORKING && (
        <TogleDiv>
          Public{" "}
          <Togle
            isOn={isPublic}
            onToggle={() => {
              setIsPublic((prev) => !prev);
            }}
          ></Togle>
        </TogleDiv>
      )}
      {/* 색상 */}
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
      {/* 설명 */}
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </DescriptionLayout>
      )}
      <ButtonLayout>
        <div></div>
        <Button
          width={5}
          height={2.5}
          onClick={async () => {
            isUpdate ? await handleupdateSchedule() : await saveSchedule();
            close();
            triggerReload();
          }}
        >
          save
        </Button>{" "}
        <Button width={5} height={2.5} onClick={close}>
          cancel
        </Button>
      </ButtonLayout>
    </MainLayout>,
    document.getElementById("clickModal") as HTMLElement
  );
}

const MainLayout = styled.div<{ left: number; top: number }>`
  position: fixed;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  background-color: white;
  width: 450px;
  z-index: 400;
  color: black;
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
  display: grid;
  justify-items: left;
  row-gap: 5px;
  font-size: small;
`;
const TogleDiv = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 1fr;
  align-items: center;
  height: 20px;
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
  height: 50px;
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
  margin-right: 10px;
`;
const IconDiv = styled.div`
  display: grid;
`;
const RecurrenceLayout = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  position: absolute;
  width: 350px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  z-index: 100;
  right: 0;
  gap: 5px;
`;
const RecurrenceRowLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;
const RecurrenceRowLayout2 = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  height: 20px;
  align-items: center;
  position: relative;
  bottom: 10px;
`;
const DayLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const EndsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;
const RadioLayout = styled.div`
  display: grid;
  grid-template-rows: 20px 20px 20px;
  gap: 5px;
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
const RecurrenceText = styled.div`
  display: grid;
  align-items: center;
`;
const RecurrenceEveryLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  align-items: center;
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
  display: grid;
  position: absolute;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: white;
  top: 25px;
  padding: 10px 20px 10px 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const DropdownDiv = styled.div`
  cursor: pointer;
`;
const PeriodDiv = styled.div`
  width: 80%;
  display: flex;
  justify-content: start;
`;
const DateButton = styled.div`
  width: 4%.5rem;
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

const LineDiv = styled.div`
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Color("black")};
`;

const DisableDiv = styled.div`
  width: 6.5rem;
  border: solid 1px ${Color("black200")};
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: not-allowed;
  background-color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;
