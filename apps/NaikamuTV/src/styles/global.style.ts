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
  marginBottomSmall: {
    marginBottom: 10,
  },
  marginBottom: {
    marginBottom: 20,
  },
  marginBottomBig: {
    marginBottom: 40,
  },
  disclaimer: {
    marginTop: 20,
    marginBottom: 10,
  },
  errors: {
    color: '#CF6679',
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
});

export const fontStyles = StyleSheet.create({
  warning: {
    color: '#B00020',
  },
  screenHeader: {
    fontFamily: 'Catamaran-Black',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subScreenHeader: {
    fontFamily: 'Catamaran-Black',
    fontSize: 24,
  },
  normal: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 16 * 1.4,
  },
  label: {
    fontFamily: 'Lato-Regular',
    fontSize: 12,
  },
  underline: {
    textDecorationStyle: 'solid',
    textDecorationColor: '#ffffff',
    textDecorationLine: 'underline',
  },
  header: {
    fontFamily: 'Lato-Bold',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSmall: {
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
});

export const colors = StyleSheet.create({
  background: {
    color: '#1C1C1E',
  },
  onBackground: {
    color: '#F2F2F2',
  },
  accent: {
    color: '#FF6932',
  },
  textDark: {
    color: '#000000',
  },
  textLight: {
    color: '#F2F2F2',
  },
  textLighter: {
    color: '#C2C2C2',
  },
  grey: {
    color: '#626262',
  },
  error: {
    color: '#FF453A',
  },
  transparent: {
    color: 'transparent',
  },
});
