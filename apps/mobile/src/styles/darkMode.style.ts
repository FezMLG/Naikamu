import { StyleSheet } from 'react-native';

import { defaultRadius } from './global.style';

export enum DarkColor {
  Font = '#F7F7F7',
  C100 = '#E1E1E1',
  C200 = '#CFCFCF',
  C300 = '#B1B1B1',
  C400 = '#9E9E9E',
  C500 = '#7E7E7E',
  C600 = '#626262',
  C700 = '#515151',
  C800 = '#3B3B3B',
  C900 = '#222222',
}

export const darkStyle = StyleSheet.create({
  background: {
    backgroundColor: DarkColor.C900,
  },
  header: {
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: DarkColor.C900,
    borderRadius: defaultRadius,
  },
  font: {
    color: DarkColor.Font,
  },
  fontReverse: {
    color: DarkColor.C900,
  },
});
