import { CALENDAR_COLORS, ColorHex, ColorLabel } from "../constants/colors";
import { DecorationTemplate } from "../types";

const SELECTOR_ID = "template-selector";
const DROPDOWN_ID = "template-dropdown";

export const getInputDOM = () => {
  return document.querySelector(
    'input[aria-label="タイトルを追加"]'
  ) as HTMLInputElement | null;
};

export const getSelector = () => {
  return document.getElementById(SELECTOR_ID) as HTMLSelectElement | null;
};
export const createDropdownItem = ({ label, hex }: DecorationTemplate) => {
  const input = getInputDOM();
  const button = document.createElement("button");
  button.innerHTML = `
      <div style = 'height: 1rem; width: 1rem; background: ${hex}; border-radius: 100%'></div>
      <span>${label}</span>
    `;
  button.dataset["hex"] = hex;
  button.style.padding = "0.5rem";
  button.style.background = "#FFF";
  button.style.width = "100%";
  button.style.textAlign = "start";
  button.style.display = "flex";
  button.style.gap = "0.25rem";
  button.style.cursor = "pointer";
  button.style.borderRadius = "0.25rem";
  button.style.border = "none";

  // ホバー対応
  button.onmouseenter = () => {
    button.style.background = "#f3f4f6";
  };

  button.onmouseleave = () => {
    button.style.background = "#FFF";
  };

  button.onclick = () => {
    setColor(hex);

    if (!input) return;

    input.value = label;
    input.focus(); // NOTE: これがないと値更新が反映されない
  };

  return button;
};

export const createDropdown = (options: DecorationTemplate[]) => {
  const details = document.createElement("details");
  details.id = DROPDOWN_ID;
  details.style.position = "relative";
  details.style.width = "200px";
  details.style.maxWidth = "100%";

  const summary = document.createElement("summary");
  summary.style.cursor = "pointer";
  summary.innerText = "テンプレート";

  const div = document.createElement("div");
  div.style.width = "100%";
  div.style.backgroundColor = "#FFF";
  div.style.border = "none";
  div.style.position = "absolute";
  div.style.isolation = "isolate";
  div.style.zIndex = "1";
  div.style.listStyle = "none";
  div.style.borderRadius = "10px";
  div.style.boxShadow = "0px 0px 15px -5px #949494";

  options.forEach((template) => {
    const button = createDropdownItem(template);

    div.appendChild(button);
  });

  details.appendChild(summary);
  details.appendChild(div);
  return details;
};

export const getDropdownDOM = () => {
  return document.querySelector(
    `details#${DROPDOWN_ID}`
  ) as HTMLDetailsElement | null;
};

export const setDropdown = (options: DecorationTemplate[]) => {
  const dropdown = getDropdownDOM();

  dropdown?.replaceChildren();
  options?.forEach((value) => {
    dropdown?.append(createDropdownItem(value));
  });
};

export const setColor = (key: ColorLabel | ColorHex) => {
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

  const colorIndex = CALENDAR_COLORS.findIndex(
    (color) => color.label === key || color.hex === key
  );

  (colorButtons[colorIndex] as HTMLButtonElement).click();
};
