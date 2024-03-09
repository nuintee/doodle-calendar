import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { DecorationTemplate } from '../../types';
import { getCalendarColor } from '../../utils/colors';
import { ColorPickerProps } from '../../ui/ColorPicker/type';
import { UseTemplateFormProp } from './type';

export const useTemplateForm = ({ onEnter }: UseTemplateFormProp) => {
  const [inputValue, setInputValue] = useState<DecorationTemplate>({
    hex: getCalendarColor('グラファイト'),
    label: ''
  });

  const handleKeyDown = (e: KeyboardEvent) =>
    e.key === 'Enter' && onEnter?.(inputValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue((prev) => ({ ...prev, label: e.target.value }));

  const handleColorChange: ColorPickerProps['onColorChange'] = (hex) =>
    setInputValue((prev) => ({ ...prev, hex }));

  return { handleKeyDown, handleChange, handleColorChange, inputValue };
};
