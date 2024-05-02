import styled from "styled-components";

interface LabelProps {
  htmlFor: string;
  children: string;
  width?: number;
}

export default function Label(props: LabelProps) {
  return (
    <CustomLabel htmlFor={props.htmlFor} width={props.width}>
      {props.children}
    </CustomLabel>
  );
}

const CustomLabel = styled.label<LabelProps>`
  display: flex;
  width: ${(props) => (props.width ? `${props.width}rem` : "2.5rem")};
  height: 3rem;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin-right: 1rem;
`;
