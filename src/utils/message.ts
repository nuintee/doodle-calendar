export const sendMessage = (value: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs?.[0]?.id || 1, JSON.stringify({ value }));
  });
};
