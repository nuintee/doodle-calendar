import { ColorButtonProps } from "./type";

export const ColorButton = ({ onClick, color, children }: ColorButtonProps) => {
  return (
    <button
      className="hover:bg-gray-100 p-2 rounded-md flex items-center"
      onClick={onClick}
    >
      <div
        className="size-5 rounded-full inline-flex"
        style={{ backgroundColor: color }}
      ></div>
      {children && <span className="pl-2">{children}</span>}
    </button>
  );
};
