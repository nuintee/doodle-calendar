import {
  CALENDAR_COLORS,
  type ColorHex,
  type ColorLabel
} from '@/constants/colors';

export const getCalendarColor = (key: ColorHex | ColorLabel) => {
  return (
    CALENDAR_COLORS.find((color) => color.hex === key || color.label === key)
      ?.hex || '#616161' // グラファイト
  );
};
