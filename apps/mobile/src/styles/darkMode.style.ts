import { StyleSheet } from 'react-native';

import { defaultRadius } from './global.style';

export enum darkColor {
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
    backgroundColor: darkColor.C900,
  },
  header: {
    marginHorizontal: 20,
  },
  card: {
    backgroundColor: darkColor.C900,
    borderRadius: defaultRadius,
  },
  font: {
    color: darkColor.Font,
  },
  fontReverse: {
    color: darkColor.C900,
  },
});
