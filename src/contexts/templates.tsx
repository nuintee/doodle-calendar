import { FC, ReactNode, createContext, useEffect, useState } from 'react';
import { DecorationTemplate } from '../types';
import {
  appendStorageTemplate,
  clearStorageTemplates,
  getStorageTemplates
} from '../utils/storage';

export const TemplatesContext = createContext<{
  templates: DecorationTemplate[];
  addTemplates: (inputValue: DecorationTemplate) => void;
  clearTemplates: () => void;
}>({
  templates: [],
  addTemplates: () => {},
  clearTemplates: () => {}
});

export const TemplatesProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
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

    await appendStorageTemplate(inputValue);
  };

  const clearTemplates = async () => {
    const answer = confirm('予定テンプレートを全て削除します');

    if (!answer) return;

    setTemplates([]);

    await clearStorageTemplates();
  };

  return (
    <TemplatesContext.Provider
      value={{ templates, addTemplates, clearTemplates }}
    >
      {children}
    </TemplatesContext.Provider>
  );
};
