import {
  createSelector,
  getInputDOM,
  getSelector,
  setColor,
  setSelector,
} from "../utils/dom";
import { MESSAGE_KEY } from "../utils/message";
import { STORAGE_KEY, getStorageTemplates } from "../utils/storage";

const observer = new MutationObserver(async function () {
  const input = getInputDOM();

  if (!input) return;

  const savedTemplates = await getStorageTemplates();

  if (!savedTemplates.length) return;

  const selector = createSelector(savedTemplates);

  const parentLabel = input.parentElement;
  parentLabel?.appendChild(selector);

  // TODO: savedTemplatesから参照
  setColor("ブドウ");
});

observer.observe(document.documentElement, { childList: true });

chrome.storage.local.onChanged.addListener((storage) => {
  const data = storage[STORAGE_KEY];
  const selector = getSelector();

  if (!data.newValue) return selector?.remove();

  if (!selector) {
    const newSelector = createSelector(data.newValue);
    const input = getInputDOM();
    const parentLabel = input?.parentElement;
    return parentLabel?.appendChild(newSelector);
  }

  setSelector(data.newValue);
});

chrome.runtime.onMessage.addListener(function (request) {
  const value = JSON.parse(request)?.[MESSAGE_KEY];

  const input = getInputDOM();

  if (!input || !value) return;

  input.value = value;
});
