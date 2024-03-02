import {
  createOption,
  createSelector,
  getInputDOM,
  getSelector,
} from "../utils/dom";
import { STORAGE_KEY, getStorageTemplates } from "../utils/storage";

const observer = new MutationObserver(async function () {
  const input = getInputDOM();

  if (!input) return;

  const savedTemplates = await getStorageTemplates();

  const selector = createSelector(savedTemplates);

  const parentLabel = input.parentElement;
  parentLabel?.appendChild(selector);
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

  selector?.replaceChildren();
  data.newValue?.forEach((value: string) => {
    selector?.append(createOption(value));
  });
});

chrome.runtime.onMessage.addListener(function (request) {
  const value = JSON.parse(request)?.value;

  const input = getInputDOM();

  if (!input || !value) return;

  input.value = value;
});
