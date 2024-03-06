import { XMarkIcon } from "@heroicons/react/24/outline";
import { ColorButton } from "../ColorButton";
import { TemplateButtonProps } from "./type";
import { PlayIcon } from "@heroicons/react/24/outline";

export const TemplateButton = ({
  onDelete,
  onApply,
  children,
  color,
}: TemplateButtonProps) => {
  return (
    <div className="flex items-center gap-x-2 p-2 hover:bg-gray-100 border-gray-100 border rounded-md">
      <ColorButton color={color} asChild>
        {children}
      </ColorButton>

      <button
        className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 active:text-gray-700 flex items-center gap-x-1 text-gray-500"
        onClick={onApply}
        title={`${children}を反映`}
      >
        <PlayIcon height={16} width={16} />
        <span>適用</span>
      </button>

      <button
        className="p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 active:text-gray-700 text-gray-500"
        onClick={onDelete}
        title={`${children}を削除`}
      >
        <XMarkIcon height={16} width={16} />
      </button>
    </div>
  );
};
