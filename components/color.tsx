import { DefaultTheme } from 'styled-components';
import { ColorName } from '@/src/app/type/types';

interface Props {
  theme: DefaultTheme;
}

type ColorFunction = (color: ColorName) => (props: Props) => string;

export const Color: ColorFunction = (color) => ({ theme }) => {
  return theme.colors[color];
};