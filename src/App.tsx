import { useEffect, useRef, useState } from "react";
import {
  appendStorageTemplate,
  clearStorageTemplates,
  getStorageTemplates,
} from "./utils/storage";
import { sendMessage } from "./utils/message";
import { CALENDAR_COLORS, ColorHex } from "./constants/colors";

const ColorPicker = ({
  onColorChange,
}: {
  onColorChange: (hex: ColorHex) => void;
}) => {
  const [colorState, setColorState] = useState(
    CALENDAR_COLORS.slice(0).pop()?.hex
  );

  const noCloseRef = useRef<HTMLDetailsElement | null>(null);

  const handleClick = (hex: ColorHex) => {
    setColorState(hex);
    onColorChange(hex);
  };

  useEffect(() => {
    const init = () => {
      document.addEventListener("click", (e) => {
        const isDescendant = noCloseRef.current?.contains(e.target as Node);

        if (isDescendant || !noCloseRef.current) return;

        noCloseRef.current.open = false;
      });
    };

    init();
  }, []);

  return (
    <details
      className="relative p-2 hover:bg-gray-100 rounded-md cursor-pointer group"
      ref={noCloseRef}
    >
      <summary className="marker:hidden list-none">
        <div
          className="size-5 rounded-full"
          style={{ backgroundColor: colorState }}
        ></div>
      </summary>
      <div className="absolute w-[100px] p-2 right-0 grid grid-cols-2 gap-2 bg-white border">
        {CALENDAR_COLORS.map((color) => (
          <button
            className="hover:bg-gray-100 p-2 rounded-md"
            onClick={() => handleClick(color.hex)}
          >
            <div
              className="size-5 rounded-full"
              style={{ backgroundColor: color.hex }}
            ></div>
          </button>
        ))}
      </div>
    </details>
  );
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [templates, setTemplates] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      const savedTemplates = await getStorageTemplates();

      setTemplates((prev) => [
        ...prev.filter((template) => !savedTemplates.includes(template)),
        ...savedTemplates,
      ]);
    };

    init();
  }, []);

  const addTemplates = async () => {
    if (!inputValue || templates.includes(inputValue)) return;

    setTemplates((prev) => [
      ...prev.filter((value) => value !== inputValue),
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
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <ColorPicker onColorChange={console.log} />
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
          <button
            className="w-full px-4 py-2 text-start hover:bg-gray-200 rounded-md"
            onClick={() => sendMessage(template)}
          >
            {template}
          </button>
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
