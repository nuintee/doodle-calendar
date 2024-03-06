import { useEffect, useRef, useState } from 'react';
import { CALENDAR_COLORS, ColorHex } from '../../constants/colors';
import { ColorButton } from '../ColorButton';
import { ColorPickerProps } from './type';

export const ColorPicker = ({
  onColorChange,
  defaultColor
}: ColorPickerProps) => {
  const [colorState, setColorState] = useState(defaultColor);

  const noCloseRef = useRef<HTMLDetailsElement | null>(null);

  const handleClick = (hex: ColorHex) => {
    setColorState(hex);
    onColorChange(hex);
  };

  useEffect(() => {
    const init = () => {
      document.addEventListener('click', (e) => {
        const isDescendant = noCloseRef.current?.contains(e.target as Node);

        if (isDescendant || !noCloseRef.current) return;

        noCloseRef.current.open = false;
      });
    };

    init();
  }, []);

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
        {CALENDAR_COLORS.map((color) => (
          <ColorButton
            color={color.hex}
            onClick={() => handleClick(color.hex)}
          />
        ))}
      </div>
    </details>
  );
};
