import {
  createSelector,
  getInputDOM,
  getSelector,
  setSelector,
} from "../utils/dom";
import { MESSAGE_KEY } from "../utils/message";
import { STORAGE_KEY, getStorageTemplates } from "../utils/storage";

const observer = new MutationObserver(async function () {
  const button = document.querySelector(
    'button[aria-label="カレンダーの色、予定の色"]'
  );

  const tabPanel = document.querySelector('div[role="tabpanel"]');
  const tabPanelSpan = tabPanel?.querySelector("span");

  const allExpandables = tabPanelSpan?.querySelectorAll("div[data-expandable]");
  const colorSection = allExpandables?.item(allExpandables.length - 1);
  const colorSectionTrigger = colorSection?.querySelector("button");

  // 色セクションを開く
  colorSectionTrigger?.click();

  const colorTrigger = colorSection?.querySelector(
    `div[id] > 
     div > 
     div:first-child >
     div >
     div[data-dragsource-ignore="true"] >
     div:last-child >
     div:last-child >
     div:first-child >
     span >
     button
    `
  ) as HTMLButtonElement | null | undefined;

  // 色ポップアップ表示ボタンのクリック
  colorTrigger?.click();

  const colorButtons = document.querySelectorAll(
    'div[data-color][role="menuitemradio"]'
  );

  // 最初の色を選択
  (colorButtons[0] as HTMLButtonElement).click();

  const input = getInputDOM();

  if (!input) return;

  const savedTemplates = await getStorageTemplates();

  if (!savedTemplates.length) return;

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

  setSelector(data.newValue);
});

chrome.runtime.onMessage.addListener(function (request) {
  const value = JSON.parse(request)?.[MESSAGE_KEY];

  const input = getInputDOM();

  if (!input || !value) return;

  input.value = value;
});
