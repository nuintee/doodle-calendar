import { Fragment } from "react/jsx-runtime";
import { ColorButtonProps } from "./type";

export const ColorButton = ({
  onClick,
  color,
  children,
  asChild,
}: ColorButtonProps) => {
  const Tag = asChild ? Fragment : "button";

  return (
    <Tag
      className="hover:bg-gray-100 active:bg-gray-200 border border-gray-100 p-2 rounded-md flex items-center gap-2 w-full"
      onClick={onClick}
    >
      <div
        className="size-5 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      {children}
    </Tag>
  );
};
