import React from 'react';
import { extendTheme } from 'native-base';

export const cosmicTheme = extendTheme({
  colors: {
    cosmicDark: '#0A001A',
    cosmicPurple: '#2E0854',
    spaceBlue: '#4B0082',
    starDust: '#E6E6FA',
    nebulaPink: '#9370DB',
  },
  fonts: {
    heading: 'SpaceMono-Bold',
    body: 'SpaceMono-Regular',
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'full',
        _text: { fontFamily: 'heading' },
      },
    },
  },
});

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => (
  <ThemeContext.Provider value={cosmicTheme}>
    {children}
  </ThemeContext.Provider>
);