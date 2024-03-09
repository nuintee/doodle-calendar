import { useState } from 'react';
import { CALENDAR_COLORS, ColorHex } from '../../constants/colors';
import { ColorButton } from '../ColorButton';
import { ColorPickerProps } from './type';
import { useClickOutside } from '../../hooks/useClickOutside';

export const ColorPicker = ({
  onColorChange,
  defaultColor
}: ColorPickerProps) => {
  const [colorState, setColorState] = useState(defaultColor);

  const handleClick = (hex: ColorHex) => {
    setColorState(hex);
    onColorChange(hex);
  };

  const { noCloseRef } = useClickOutside<HTMLDetailsElement>({
    onClickOutside: (ref) => {
      if (!ref.current) return;

      ref.current.open = false;
    }
  });

  return (
    <details
      className="group relative"
      ref={noCloseRef}
      title="テンプレート色の設定"
      aria-label="テンプレート色の設定"
    >
      <summary className="cursor-pointer list-none rounded-md p-2 marker:hidden hover:bg-gray-100">
        <ColorButton color={colorState || ''} asChild />
      </summary>
      <div className="absolute right-0 grid w-[100px] grid-cols-2 gap-2 rounded-md border border-gray-100 bg-white p-2 shadow-sm">
        {CALENDAR_COLORS.map(({ hex, label }) => (
          <ColorButton
            color={hex}
            onClick={() => handleClick(hex)}
            key={`${label}-${hex}`}
          />
        ))}
      </div>
    </details>
  );
};
