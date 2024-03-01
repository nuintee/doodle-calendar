import { useEffect, useState } from "react";

const sendMessage = (value: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs?.[0]?.id || 1,
      JSON.stringify({ value }),
      (responseFromContent) => {
        console.log({ responseFromContent });
      }
    );
  });
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [templates, setTemplates] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      const savedTemplates = (await chrome.storage.local.get())["T"] || [];

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

    const savedTemplates = (await chrome.storage.local.get())["T"] || [];

    chrome.storage.local.set({
      T: [
        ...savedTemplates.filter((template: string) => template !== inputValue),
        inputValue,
      ],
    });
  };

  const clearData = async () => {
    const answer = confirm("テンプレートを全て削除します");

    if (!answer) return;

    setTemplates([]);

    await chrome.storage.local.clear();
  };

  return (
    <div className="flex flex-col gap-y-2 p-2 w-[280px]">
      <div className="flex items-center gap-x-1">
        <input
          type="text"
          className="flex-1 block outline-none"
          placeholder="ラベル名を入力して下さい"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 rounded-md text-white"
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
