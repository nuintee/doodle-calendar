import { sendMessage } from './utils/message';
import { ColorPicker } from './ui/ColorPicker';

import { TemplateButton } from './ui/TemplateButton';
import { GlobalContextMenu } from './ui/GlobalContextMenu';
import { useTemplates } from './hooks/useTemplates';
import { useTemplateForm } from './hooks/useTemplateForm';

function App() {
  const { templates, addTemplates } = useTemplates();

  const { handleKeyDown, handleChange, handleColorChange, inputValue } =
    useTemplateForm({
      onEnter: addTemplates
    });

  return (
    <div className="flex size-[400px] flex-col gap-y-2 overflow-hidden p-2">
      <div className="flex items-center gap-x-2">
        <div className="flex flex-1 items-center gap-x-1 rounded-md border border-gray-300 px-2 py-1">
          <input
            type="text"
            className="block flex-1 text-base caret-gray-500 outline-none"
            placeholder="予定テンプレート名を入力"
            value={inputValue.label}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
          <ColorPicker
            defaultColor={inputValue.hex}
            onColorChange={handleColorChange}
          />
        </div>
        <GlobalContextMenu />
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
            onApply={() => sendMessage('APPLY', template)}
          >
            {template.label}
          </TemplateButton>
        ))}
      </div>
    </div>
  );
}

export default App;
