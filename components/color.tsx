import { DefaultTheme } from 'styled-components';

import { ColorName } from '@/src/app/type/interface';

export const Color = (colorName: ColorName) => (props: { theme: DefaultTheme }) => props.theme.colors[colorName];
