import { Fragment } from 'react/jsx-runtime';
import { ColorButtonProps } from './type';

export const ColorButton = ({
  onClick,
  color,
  children,
  asChild
}: ColorButtonProps) => {
  const Tag = asChild ? Fragment : 'button';

  return (
    <Tag
      className="flex w-full items-center gap-2 rounded-md border border-gray-100 p-2 hover:bg-gray-100 active:bg-gray-200"
      onClick={onClick}
    >
      <div
        className="aspect-square size-5 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      <span className="flex-1 truncate whitespace-nowrap text-start">
        {children}
      </span>
    </Tag>
  );
};
