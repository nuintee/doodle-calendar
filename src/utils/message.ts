import { DecorationTemplate } from "../types";

export const MESSAGE_KEY = "templateValue";

export const sendMessage = (template: DecorationTemplate) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs?.[0]?.id || 1,
      JSON.stringify({ [MESSAGE_KEY]: template })
    );
  });
};
