import styled from "styled-components";

import { Color } from "@/shared/lib/styles/color";
import { userList } from "@/shared/lib/type";

export function makeRegexByCho(searchTerm: string) {
  const CHO_HANGUL = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  const HANGUL_START_CHARCODE = "가".charCodeAt(0);

  const CHO_PERIOD = Math.floor("까".charCodeAt(0) - "가".charCodeAt(0));
  const JUNG_PERIOD = Math.floor("개".charCodeAt(0) - "가".charCodeAt(0));

  const combine = (cho: number, jung: number, jong: number) => {
    return String.fromCharCode(HANGUL_START_CHARCODE + (cho * CHO_PERIOD + jung * JUNG_PERIOD + jong));
  };

  // flag: 'g" 는 문자열 내의 모든 패턴을 검색
  const regex = CHO_HANGUL.reduce(
    (acc, cho, index) => acc.replace(new RegExp(cho, "g"), `[${combine(index, 0, 0)}-${combine(index + 1, 0, -1)}]`),
    searchTerm
  );

  return new RegExp(`(${regex})`, "g");
}

// 초성 검색
export function includeByCho(searchTerm: string, target: string) {
  return makeRegexByCho(searchTerm).test(target);
}

export function filterUserList(list: userList[], searchTerm: string) {
  // 검색어에 한글이 포함되어 있는지 확인
  const isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(searchTerm);

  return list.filter((member: userList) => {
    const lowercaseName = member.name.toLowerCase();
    const lowercaseTerm = searchTerm.toLowerCase();

    // 한글이면 초성 검색, 영어면 일반 검색
    if (isKorean) {
      return includeByCho(searchTerm, member.name);
    } else {
      return lowercaseName.includes(lowercaseTerm);
    }
  });
}

// 검색어와 일치하는 부분을 찾아내고 해당 부분을 <HighlightedText> 태그로 감싸는 함수
export const highlightSearchTerm = (target: string, searchTerm: string) => {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = target.split(regex);
  return parts.map((part, index) => (regex.test(part) ? <HighlightedText>{part}</HighlightedText> : part));
};

const HighlightedText = styled.span`
  color: ${Color("blue")};
  font-weight: bold;
`;
