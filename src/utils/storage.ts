import type { DecorationTemplate } from '@/types/index';

export const STORAGE_KEY = 'g-calendar-ext:template';

export const getStorageTemplates = async (): Promise<DecorationTemplate[]> => {
  const storage = await chrome.storage.local.get();

  return storage[STORAGE_KEY] || [];
};

export const appendStorageTemplate = async (newValue: DecorationTemplate) => {
  const savedTemplates = await getStorageTemplates();
  const newTemplates = [
    ...savedTemplates.filter(
      (template) => JSON.stringify(template) !== JSON.stringify(newValue)
    ),
    newValue
  ];

  await chrome.storage.local.set({
    [STORAGE_KEY]: newTemplates
  });

  return newTemplates;
};

export const removeStorageTemplate = async (
  toBeRemovedTemplate: DecorationTemplate
) => {
  const savedTemplates = await getStorageTemplates();
  const newTemplates = [
    ...savedTemplates.filter(
      (template) =>
        JSON.stringify(template) !== JSON.stringify(toBeRemovedTemplate)
    )
  ];

  await chrome.storage.local.set({
    [STORAGE_KEY]: newTemplates
  });

  return newTemplates;
};

export const clearStorageTemplates = async () => {
  await chrome.storage.local.clear();
};
