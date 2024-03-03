import { DecorationTemplate } from "../types";
import {
  createDropdown,
  createSelector,
  getInputDOM,
  getSelector,
  setColor,
  setSelector,
} from "../utils/dom";
import { MESSAGE_KEY } from "../utils/message";
import { STORAGE_KEY, getStorageTemplates } from "../utils/storage";

const app = document.createElement("div");
app.id = "selector-app";

const observer = new MutationObserver(async function () {
  const input = getInputDOM();

  if (!input) return;

  const savedTemplates = await getStorageTemplates();

  if (!savedTemplates.length) return;

  const parentLabel = input.parentElement;
  const parentDiv = parentLabel?.parentElement;

  if (!parentDiv) return;

  parentDiv.style.paddingBottom = "0px";
  parentDiv.style.marginBottom = "1rem";

  const dropdown = createDropdown(savedTemplates);
  parentDiv?.appendChild(dropdown);
});

observer.observe(document.documentElement, { childList: true });

chrome.storage.local.onChanged.addListener((storage) => {
  const data = storage[STORAGE_KEY] as { newValue: DecorationTemplate[] };
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
  const template = JSON.parse(request)?.[MESSAGE_KEY] as
    | DecorationTemplate
    | undefined;

  const input = getInputDOM();

  if (!input || !template) return;

  input.value = template.label;

  setColor(template.hex);
});
