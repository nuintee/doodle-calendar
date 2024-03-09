import { CustomMessageEvent, DecorationTemplate } from '../types';
import {
  createDropdown,
  getDropdownDOM,
  getInputDOM,
  getInputRootParentDOM,
  setColor,
  setDropdown
} from '../utils/dom';
import { STORAGE_KEY, getStorageTemplates } from '../utils/storage';

const app = document.createElement('div');
app.id = 'selector-app';

const observer = new MutationObserver(async function () {
  const inputDOM = getInputDOM();
  const dropdownDOM = getDropdownDOM();

  if (!inputDOM) return;

  const savedTemplates = await getStorageTemplates();

  if (!savedTemplates.length) return;

  const dropdown = createDropdown(savedTemplates);
  const rootParent = getInputRootParentDOM();

  if (!rootParent || !!dropdownDOM) return;

  rootParent.style.height = '100%';
  rootParent.style.padding = '1rem 0px';

  rootParent?.appendChild(dropdown);
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

chrome.runtime.onMessage.addListener(async function (
  request: CustomMessageEvent
) {
  if (request.event === 'APPLY') {
    const template = request?.payload;

    const input = getInputDOM();

    if (!input || !template) return;

    input.value = template.label;

    setColor(template.hex);
  }
});
