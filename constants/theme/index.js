import { Dimensions } from "react-native"

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

export const DarkThemeColors = {
    bgDark: NHSColors["nhs-black"],
    bgLight: NHSColors["nhs-pale-grey"]
}   

export const LightThemeColors = {
    bgDark: NHSColors["nhs-mid-grey"],
    bgLight: NHSColors["nhs-white"],
    darkBlue: NHSColors['nhs-dark-blue'],
    blue: NHSColors['nhs-blue'],
    brightBlue: NHSColors['nhs-bright-blue'],
    lightBlue: NHSColors['nhs-light-blue']
}

export const Default = {

}

export const DarkMode = {

}

export const LightMode = {

}

export const {width, height} = Dimensions.get('window');
export const ios = Platform.OS == 'ios';

export const shadow = {
    light: {
      shadowColor: NHSColors['nhs-black'],
      shadowRadius: 4,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    dark: {
      shadowColor: NHSColors['nhs-black'],
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
    body: 14,
    caption: 12,
    radius: 16,
  };
  
  export const spacing = {
    s: 8,
    m: 18,
    l: 24,
    xl: 40,
  };
  