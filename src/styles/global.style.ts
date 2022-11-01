import { StyleSheet } from 'react-native';

export const defaultRadius = 8;

export const globalStyle = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  spacerBig: {
    marginVertical: 40,
  },
  spacer: {
    marginVertical: 20,
  },
  spacerSmall: {
    marginVertical: 10,
  },
  marginTopBig: {
    marginTop: 40,
  },
  marginTop: {
    marginTop: 20,
  },
  marginTopSmall: {
    marginTop: 10,
  },
  disclaimer: {
    marginTop: 20,
    marginBottom: 10,
  },
});

export const fontStyles = StyleSheet.create({
  warning: {
    color: '#B00020',
  },
});
