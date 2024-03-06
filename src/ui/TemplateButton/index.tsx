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
    <div className="flex items-center gap-x-2 rounded-md border border-gray-100 p-2 hover:bg-gray-100">
      <ColorButton color={color} asChild>
        {children}
      </ColorButton>

      <button
        className="flex items-center gap-x-1 rounded-full p-2 text-gray-500 hover:bg-gray-200 active:bg-gray-300 active:text-gray-700"
        onClick={onApply}
        title={`${children}を反映`}
      >
        <PlayIcon height={16} width={16} />
        <span>適用</span>
      </button>

      <button
        className="rounded-full p-2 text-gray-500 hover:bg-gray-200 active:bg-gray-300 active:text-gray-700"
        onClick={onDelete}
        title={`${children}を削除`}
      >
        <XMarkIcon height={16} width={16} />
      </button>
    </div>
  );
};
