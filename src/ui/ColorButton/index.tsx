import { ColorButtonProps } from "./type";

export const ColorButton = ({ onClick, color, children }: ColorButtonProps) => {
  return (
    <button
      className="hover:bg-gray-100 p-2 rounded-md flex items-center gap-2 w-full"
      onClick={onClick}
    >
      <div
        className="size-5 rounded-full"
        style={{ backgroundColor: color }}
      ></div>
      {children}
    </button>
  );
};
