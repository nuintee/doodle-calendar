import { PlayIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ColorButton } from "../ColorButton";
import { TemplateButtonProps } from "./type";

export const TemplatesButton = ({
  onDelete,
  onApply,
  children,
  ...colorButtonProps
}: TemplateButtonProps) => {
  return (
    <div className="flex items-center gap-x-2 p-2 hover:bg-gray-100 rounded-md">
      <ColorButton {...colorButtonProps} asChild>
        {children}
      </ColorButton>

      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={onApply}
        title={`${children}を予定に反映`}
      >
        <PlayIcon height={16} width={16} />
      </button>
      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={onDelete}
        title={`${children}を削除`}
      >
        <XMarkIcon height={16} width={16} />
      </button>
    </div>
  );
};
