import { useEffect, useState } from 'react';
import {
  appendStorageTemplate,
  clearStorageTemplates,
  getStorageTemplates
} from './utils/storage';
import { sendMessage } from './utils/message';
import { DecorationTemplate } from './types';
import { ColorPicker } from './ui/ColorPicker';
import { getCalendarColor } from './utils/colors';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { InformationCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

import { version } from '../package.json';
import { TemplateButton } from './ui/TemplateButton';

function App() {
  const [inputValue, setInputValue] = useState<DecorationTemplate>({
    hex: getCalendarColor('グラファイト'),
    label: ''
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
        ...savedTemplates
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
      inputValue
    ]);

    await appendStorageTemplate(inputValue);
  };

  const clearData = async () => {
    const answer = confirm('予定テンプレートを全て削除します');

    if (!answer) return;

    setTemplates([]);

    await clearStorageTemplates();
  };

  return (
    <div className="flex size-[400px] flex-col gap-y-2 overflow-hidden p-2">
      <div className="flex items-center gap-x-2">
        <div className="flex flex-1 items-center gap-x-1 rounded-md border border-gray-300 px-2 py-1">
          <input
            type="text"
            className="block flex-1 text-base caret-gray-500 outline-none"
            placeholder="予定テンプレート名を入力"
            value={inputValue.label}
            onKeyDown={(e) => e.key === 'Enter' && addTemplates()}
            onChange={(e) =>
              setInputValue((prev) => ({ ...prev, label: e.target.value }))
            }
          />
          <ColorPicker
            defaultColor={inputValue.hex}
            onColorChange={(hex) => setInputValue((prev) => ({ ...prev, hex }))}
          />
        </div>
        <details className="relative p-1">
          <summary className="cursor-pointer list-none marker:hidden">
            <EllipsisVerticalIcon
              height={24}
              width={24}
              className="fill-gray-500"
            />
          </summary>
          <div className="absolute right-0 flex w-[200px] flex-col gap-y-2 rounded-md border border-gray-100 bg-white p-2 shadow-sm">
            <button
              className="flex shrink-0 items-center gap-x-1 rounded-md p-2 text-start text-gray-500 enabled:hover:bg-gray-100"
              onClick={() => {}}
            >
              <InformationCircleIcon height={24} width={24} />
              使い方
            </button>
            <button
              className="flex shrink-0 items-center gap-x-1 rounded-md p-2 text-start text-red-500 enabled:hover:bg-red-100"
              onClick={clearData}
              disabled={!templates.length}
            >
              <TrashIcon height={24} width={24} />
              全テンプレートの削除
            </button>
            <p className="w-full px-4 py-2 text-center">
              バージョン: {version}
            </p>
          </div>
        </details>
      </div>
      <span className="mt-2 text-xs text-gray-500">
        保存済みの予定テンプレート
      </span>
      <div className="h-px w-full bg-gray-300"></div>
      <div className="flex flex-col gap-y-2 overflow-auto">
        {templates.map((template) => (
          <TemplateButton
            color={template.hex}
            key={template.hex}
            onDelete={() => alert('del')}
            onApply={() => sendMessage(template)}
          >
            {template.label}
          </TemplateButton>
        ))}
      </div>
    </div>
  );
}

export default App;
