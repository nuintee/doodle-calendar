import { DecorationTemplate } from "../types";
import {
  createDropdown,
  getDropdownDOM,
  getInputDOM,
  getInputRootParentDOM,
  setColor,
  setDropdown,
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

  const dropdown = createDropdown(savedTemplates);
  const parentRoot = getInputRootParentDOM();

  parentRoot?.appendChild(dropdown);
});

observer.observe(document.documentElement, { childList: true });

chrome.storage.local.onChanged.addListener((storage) => {
  const data = storage[STORAGE_KEY] as { newValue: DecorationTemplate[] };
  const dropdown = getDropdownDOM();

  if (!data.newValue) return dropdown?.remove();

  if (!dropdown) {
    const newDropdown = createDropdown(data.newValue);

    const parentRoot = getInputRootParentDOM();
    return parentRoot?.appendChild(newDropdown);
  }

  setDropdown(data.newValue);
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
