import { DecorationTemplate } from "../types";
import {
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

  const details = document.createElement("details");
  details.style.position = "relative";

  const summary = document.createElement("summary");
  summary.innerText = "テンプレート";

  const div = document.createElement("div");
  div.style.backgroundColor = "#FFF";
  div.style.border = "1px solid gray";
  div.style.position = "absolute";
  div.style.isolation = "isolate";
  div.style.zIndex = "1";
  div.style.listStyle = "none";

  savedTemplates.forEach((template) => {
    const button = document.createElement("button");
    button.innerHTML = `
      <div style = 'height: 1rem; width: 1rem; background: ${template.hex}; border-radius: 100%'></div>
      <span>${template.label}</span>
    `;
    button.dataset["hex"] = template.hex;
    button.style.padding = "0.25rem 0.5rem";
    button.style.background = "ghostwhite";
    button.style.width = "100%";
    button.style.textAlign = "start";
    button.style.display = "flex";
    button.style.gap = "0.25rem";
    button.style.cursor = "pointer";
    button.style.borderRadius = "0.25rem";
    button.style.border = "none";
    button.onclick = () => {
      setColor(template.hex);

      input.value = template.label;
      input.focus(); // NOTE: これがないと値更新が反映されない
    };

    div.appendChild(button);
  });

  details.appendChild(summary);
  details.appendChild(div);

  const parentLabel = input.parentElement;
  const parentDiv = parentLabel?.parentElement;

  if (!parentDiv) return;

  parentDiv.style.paddingBottom = "0px";
  parentDiv.style.marginBottom = "1rem";
  parentDiv?.appendChild(details);
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
