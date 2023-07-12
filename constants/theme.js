import { Dimensions, StyleSheet } from 'react-native';
import * as Device from 'expo-device';

export const device = Device
export const { width, height } = Dimensions.get('window');

export const NHSColors = {
  'nhs-black': '#231f20',
  'nhs-dark-grey': '#425563',
  'nhs-mid-grey': '#768692',
  'nhs-pale-grey': '#E8EDEE',
  'nhs-white': '#FFFFFF',

  'nhs-dark-blue': '#003087',
  'nhs-blue': '#005EB8',
  'nhs-bright-blue': '#0072CE',
  'nhs-light-blue': '#41B6E6',
  'nhs-aqua-blue': '#00A9CE',

  'nhs-dark-green': '#006747',
  'nhs-green': '#009639',
  'nhs-light-green': '#78BE20',
  'nhs-aqua-green': '#00A499',

  'nhs-purple': '#330072',
  'nhs-dark-pink': '#7C2855',
  'nhs-pink': '#AE2573',
  'nhs-dark-red': '#8A1538',
  'nhs-red': '#DA291C',
  'nhs-orange': '#ED8B00',
  'nhs-warm-yellow': '#FFB81C',
  'nhs-yellow': '#FAE100'
}

export const colors = {
  primary: '#070f18',
  gray: '#8b8989',
  lightGray: '#b2b2b2',
  light: '#fbfbfb',
  white: '#fff',
  black: '#000',
  lightGreen: '#78BE20',
};

export const shadow = {
  light: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  dark: {
    shadowColor: colors.black,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
};

export const sizes = {
  width,
  height,
  title: 32,
  h2: 24,
  h3: 18,
  h4: 16,
  h5: 13,
  h6: 11,
  p: 14,
  text: 10,
  button: 14,
  body: 14,
  caption: 12,
  radius_xs: 8,
  radius_sm: 12,
  radius_md: 16,
  radius_lg: 20,
  radius_xl: 24,
};

export const spacing = {
  s: 8,
  m: 18,
  l: 24,
  xl: 40,
};

export const customStyle = StyleSheet.create({
    title: {
        fontSize: sizes.title,
        fontWeight: '800',
        letterSpacing: .3,
        marginHorizontal: 5,
        textAlign: 'center',
    },
    h1: {
        fontSize: sizes.title,
        fontWeight: '800',
        letterSpacing: .3
    },
    h2: {
        fontSize: sizes.h2,
        fontWeight: 'bold',
        letterSpacing: .3
    },
    h3: {
        fontSize: sizes.h3,
        fontWeight: 'bold',
        letterSpacing: .3
    },
    h4: {
        fontSize: sizes.h4,
        fontWeight: 'bold',
        letterSpacing: .3
    },
    h5: {
        fontSize: sizes.h5,
        fontWeight: 'bold',
        letterSpacing: .3
    },
    h6: {
        fontSize: sizes.h6,
        fontWeight: 'bold',
        letterSpacing: .3
    },
    p: {
        fontSize: sizes.p,
        fontWeight: 'light',
        letterSpacing: 0
    },
    text: {
        fontSize: sizes.text,
        fontWeight: 'light',
        letterSpacing: 0
    },
    button: {
        fontSize: sizes.button,
        fontWeight: 'bold',
        letterSpacing: 0
    },
})