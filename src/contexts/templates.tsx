import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import {
  appendStorageTemplate,
  clearStorageTemplates,
  getStorageTemplates,
  removeStorageTemplate
} from '@/utils/storage';
import { sendMessage } from '@/utils/message';
import { DecorationTemplate } from '@/types/index';

export const TemplatesContext = createContext<{
  templates: DecorationTemplate[];
  addTemplates: (inputValue: DecorationTemplate) => void;
  removeTemplate: (inputValue: DecorationTemplate) => void;
  applyTemplate: (inputValue: DecorationTemplate) => void;
  clearTemplates: () => void;
}>({
  templates: [],
  addTemplates: () => {},
  clearTemplates: () => {},
  removeTemplate: () => {},
  applyTemplate: () => {}
});

export const TemplatesProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [templates, setTemplates] = useState<DecorationTemplate[]>([]);

  useEffect(() => {
    const init = async () => {
      // NOTE: なぜかonMessageEventのreplyでうまく返せないのでここのみ直接取得
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

  const addTemplates = async (inputValue: DecorationTemplate) => {
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

    appendStorageTemplate(inputValue);
  };

  const removeTemplate = async (inputValue: DecorationTemplate) => {
    const answer = confirm(`${inputValue.label}を削除します`);

    if (!answer) return;

    setTemplates((prev) =>
      prev.filter(
        (template) => JSON.stringify(template) !== JSON.stringify(inputValue)
      )
    );

    removeStorageTemplate(inputValue);
  };

  const clearTemplates = async () => {
    const answer = confirm('予定テンプレートを全て削除します');

    if (!answer) return;

    setTemplates([]);

    clearStorageTemplates();
  };

  const applyTemplate = (inputValue: DecorationTemplate) => {
    sendMessage('APPLY', inputValue);
  };

  return (
    <TemplatesContext.Provider
      value={{
        templates,
        addTemplates,
        clearTemplates,
        removeTemplate,
        applyTemplate
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
};
