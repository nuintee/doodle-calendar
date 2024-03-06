import { ColorHex } from '../../constants/colors';

export type ColorPickerProps = {
  onColorChange: (hex: ColorHex) => void;
  defaultColor: ColorHex;
};
