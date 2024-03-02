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
    if (!inputValue || templates.includes(inputValue)) return;

    setTemplates((prev) => [
      ...prev.filter(
        (value) => JSON.stringify(value) !== JSON.stringify(inputValue)
      ),
      inputValue,
    ]);

    await appendStorageTemplate(inputValue);
  };

  const clearData = async () => {
    const answer = confirm("テンプレートを全て削除します");

    if (!answer) return;

    setTemplates([]);

    await clearStorageTemplates();
  };

  return (
    <div className="flex flex-col gap-y-2 p-2 w-[350px]">
      <div className="flex items-center gap-x-1">
        <input
          type="text"
          className="flex-1 block outline-none"
          placeholder="ラベル名を入力して下さい"
          value={inputValue.label}
          onChange={(e) =>
            setInputValue((prev) => ({ ...prev, label: e.target.value }))
          }
        />
        <ColorPicker
          defaultColor={inputValue.hex}
          onColorChange={(hex) => setInputValue((prev) => ({ ...prev, hex }))}
        />
        <button
          className="px-4 py-2 bg-blue-500 rounded-md text-white shrink-0"
          onClick={addTemplates}
        >
          保存
        </button>
      </div>
      <div className="bg-gray-300 w-full h-px"></div>
      <div>
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
      <button
        className="px-4 py-2 enabled:text-red-400 disabled:text-gray-400 disabled:bg-gray-100 enabled:hover:bg-red-500 enabled:hover:text-white rounded-md"
        onClick={clearData}
        disabled={!templates.length}
      >
        データ削除
      </button>
    </div>
  );
}

export default App;
