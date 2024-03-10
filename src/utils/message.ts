import { CustomMessageEventEnums, DecorationTemplate } from '../types';

export const sendMessage = async <T extends CustomMessageEventEnums>(
  event: T,
  template: T extends 'CLEAR' ? null : DecorationTemplate
) => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    chrome.tabs.sendMessage(tabs?.[0]?.id || 1, { event, payload: template });
  });
};
