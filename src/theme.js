// Palette, radii and type scale lifted from the Thread design source.
// The design overrides the Nocturne design-system tokens with a warm cream
// palette; radii come from Nocturne itself (styles.css).

export const C = {
  bg: '#faf7ef',
  surface: '#fffdf8',
  text: '#332e23',
  accent: '#dfb44a',
  divider: 'rgba(51,46,35,0.12)',

  neutral100: '#fdfcf8',
  neutral200: '#f4f0e6',
  neutral300: '#e8e1d1',
  neutral400: '#d3cbb7',
  neutral500: '#b0a893',
  neutral600: '#6b6555',
  neutral700: '#666053',
  neutral800: '#48433a',
  neutral900: '#2d2a23',

  accent100: '#fffdf4',
  accent200: '#fdf4d8',
  accent300: '#f8e6ad',
  accent400: '#eed177',
  accent500: '#dfb44a',
  accent600: '#c2962f',
  accent700: '#7d5d1c',
  accent800: '#6e531b',
  accent900: '#463412',

  // one-offs the design uses directly
  tint: '#fbf9f4',
  tintWarm: '#faf6ea',
  scrim: 'rgba(74,64,42,0.30)',
  ringTrack: '#e8e1d1',
  ringFill: '#b8892a',
};

export const R = { sm: 4, md: 8, lg: 14, pill: 999 };

// Gradient stop pairs, transcribed from the design's linear-gradients.
export const G = {
  todayCard: ['#fdf6e2', '#fffdf7'],
  milestoneDone: ['#fdf4d8', '#fffdf7'],
  progressCard: ['#fdf8ea', '#fffdf7'],
  avatar: ['#f8e6ad', '#fdf4d8'],
  memory: ['#fdf1cf', '#f6f1e4'],
  onboarding: ['#fdf6e2', C.bg],
  domainBar: ['#dfb44a', '#f0d485'],
};

export const FONT = {
  // set to the Inter family once the fonts have loaded; falls back to system
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  light: 'Inter_300Light',
  semibold: 'Inter_600SemiBold',
};

export const shadowLg = {
  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 24,
  shadowOffset: { width: 0, height: -6 },
  elevation: 16,
};
