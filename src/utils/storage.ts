import { DecorationTemplate } from '../types';

export const STORAGE_KEY = 'g-calendar-ext:template';

export const getStorageTemplates = async (): Promise<DecorationTemplate[]> => {
  const storage = await chrome.storage.local.get();

  return storage[STORAGE_KEY] || [];
};

export const appendStorageTemplate = async (newValue: DecorationTemplate) => {
  const savedTemplates = await getStorageTemplates();

  await chrome.storage.local.set({
    [STORAGE_KEY]: [
      ...savedTemplates.filter(
        (template) => JSON.stringify(template) !== JSON.stringify(newValue)
      ),
      newValue
    ]
  });
};

export const clearStorageTemplates = async () => {
  await chrome.storage.local.clear();
};
