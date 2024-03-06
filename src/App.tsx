import { useEffect, useState } from "react";
import {
  appendStorageTemplate,
  clearStorageTemplates,
  getStorageTemplates,
} from "./utils/storage";
import { sendMessage } from "./utils/message";
import { DecorationTemplate } from "./types";
import { ColorPicker } from "./ui/ColorPicker";
import { ColorButton } from "./ui/ColorButton";
import { getCalendarColor } from "./utils/colors";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

import { version } from "../package.json";

function App() {
  const [inputValue, setInputValue] = useState<DecorationTemplate>({
    hex: getCalendarColor("グラファイト"),
    label: "",
  });
  const [templates, setTemplates] = useState<DecorationTemplate[]>([]);

  useEffect(() => {
    const init = async () => {
      const savedTemplates = await getStorageTemplates();

      setTemplates((prev) => [
        ...prev.filter(
          (template) =>
            !savedTemplates.find(
              (saved) => JSON.stringify(saved) === JSON.stringify(template)
            )
        ),
        ...savedTemplates,
      ]);
    };

    init();
  }, []);

  const addTemplates = async () => {
    if (
      !inputValue.label ||
      templates.find(
        (template) => JSON.stringify(template) === JSON.stringify(inputValue)
      )
    )
      return;

    setTemplates((prev) => [
      ...prev.filter(
        (value) => JSON.stringify(value) !== JSON.stringify(inputValue)
      ),
      inputValue,
    ]);

    await appendStorageTemplate(inputValue);
  };

  const clearData = async () => {
    const answer = confirm("予定テンプレートを全て削除します");

    if (!answer) return;

    setTemplates([]);

    await clearStorageTemplates();
  };

  return (
    <div className="flex flex-col gap-y-2 p-2 w-[400px] h-[400px] overflow-hidden">
      <div className="flex items-center gap-x-2">
        <div className="flex items-center flex-1 gap-x-1 border rounded-md border-gray-300 px-2 py-1">
          <input
            type="text"
            className="flex-1 text-base caret-gray-500 block outline-none"
            placeholder="予定テンプレート名を入力"
            value={inputValue.label}
            onKeyDown={(e) => e.key === "Enter" && addTemplates()}
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, label: e.target.value }))
            }
          />
          <ColorPicker
            defaultColor={inputValue.hex}
            onColorChange={(hex) => setInputValue((prev) => ({ ...prev, hex }))}
          />
        </div>
        <details className="p-1 relative">
          <summary className="marker:hidden list-none cursor-pointer">
            <EllipsisVerticalIcon
              height={24}
              width={24}
              className="fill-gray-500"
            />
          </summary>
          <div className="absolute w-[200px] p-2 right-0 flex flex-col gap-y-2 bg-white border border-gray-100 shadow-sm rounded-md">
            <button
              className="p-2 flex items-center gap-x-1 text-start enabled:hover:bg-gray-100 text-gray-500 rounded-md shrink-0"
              onClick={() => {}}
            >
              <InformationCircleIcon height={24} width={24} />
              使い方
            </button>
            <button
              className="p-2 flex items-center gap-x-1 text-start enabled:hover:bg-red-100 text-red-500 rounded-md shrink-0"
              onClick={clearData}
              disabled={!templates.length}
            >
              <TrashIcon height={24} width={24} />
              全テンプレートの削除
            </button>
            <p className="px-4 py-2 w-full text-center">
              バージョン: {version}
            </p>
          </div>
        </details>
      </div>
      <span className="text-xs text-gray-500 mt-2">
        保存済みの予定テンプレート
      </span>
      <div className="bg-gray-300 w-full h-px"></div>
      <div className="flex flex-col gap-y-2 overflow-auto">
        {templates.map((template) => (
          <ColorButton
            onClick={() => sendMessage(template)}
            color={template.hex}
            key={template.hex}
          >
            {template.label}
          </ColorButton>
        ))}
      </div>
    </div>
  );
}

export default App;
