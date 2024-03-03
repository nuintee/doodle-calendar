import { DecorationTemplate } from "../types";
import { ColorButton } from "../ui/ColorButton";
import {
  createSelector,
  getInputDOM,
  getSelector,
  setColor,
  setSelector,
} from "../utils/dom";
import { MESSAGE_KEY } from "../utils/message";
import { STORAGE_KEY, getStorageTemplates } from "../utils/storage";
import ReactDOM from "react-dom";

const app = document.createElement("div");
app.id = "selector-app";

const observer = new MutationObserver(async function () {
  const input = getInputDOM();

  if (!input) return;

  const savedTemplates = await getStorageTemplates();

  if (!savedTemplates.length) return;

  // NOTE: React注入がうまくいかない場合に復元
  // const selector = createSelector(savedTemplates);
  // parentLabel?.appendChild(selector);

  const parentLabel = input.parentElement;
  parentLabel?.appendChild(app);
  ReactDOM.render(
    <ColorButton color="#039BE5" onClick={() => {}} />,
    document.getElementById(app.id)
  );
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
