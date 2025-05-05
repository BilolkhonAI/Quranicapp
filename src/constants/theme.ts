export const COLORS = {
  primary: '#2E7D32', // Deep green
  secondary: '#1B5E20',
  accent: '#4CAF50', // Medium green
  background: '#FFFFFF', // White
  card: '#F5F5F5',
  text: '#212121', // Dark gray for text
  textSecondary: '#757575', // Light gray for secondary text
  border: '#E0E0E0', // Light gray for borders
  error: '#D32F2F', // Red for errors
  success: '#388E3C', // Green for success
  white: '#FFFFFF',
};

export const FONTS = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export const SPACING = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
  dark: {
    shadowColor: COLORS.text,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
}; 