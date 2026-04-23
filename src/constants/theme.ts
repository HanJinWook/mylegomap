// LEGO Brand Design Tokens
export const THEME = {
  colors: {
    primary: {
      red: '#E30013',    // Classic LEGO Red
      yellow: '#FED500', // Classic LEGO Yellow
      blue: '#006CB7',   // Classic LEGO Blue
      green: '#009643',  // Classic LEGO Green
    },
    neutral: {
      white: '#FFFFFF',
      gray: '#F2F2F2',
      dark: '#1A1A1A',
      slate: '#64748b',
    }
  },
  shadows: {
    brick: '0 4px 0px 0px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.1)',
    brickActive: '0 2px 0px 0px rgba(0, 0, 0, 0.1)',
    card: '0 8px 0 #00000010',
    depth: {
      red: '#b3000f',
      blue: '#004e85',
      green: '#007a37',
      yellow: '#ccaa00',
    }
  },
  typography: {
    main: 'var(--font-fredoka), sans-serif',
    accent: 'var(--font-outfit), sans-serif',
  },
  patterns: {
    stud: 'radial-gradient(#E5E5E5 20%, transparent 20%)',
  }
} as const;

export type LegoTheme = typeof THEME;
