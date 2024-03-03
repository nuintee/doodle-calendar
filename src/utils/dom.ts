import { CALENDAR_COLORS, ColorHex, ColorLabel } from "../constants/colors";
import { DecorationTemplate } from "../types";

const SELECTOR_ID = "template-selector";

export const getInputDOM = () => {
  return document.querySelector(
    'input[aria-label="タイトルを追加"]'
  ) as HTMLInputElement | null;
};

export const getSelector = () => {
  return document.getElementById(SELECTOR_ID) as HTMLSelectElement | null;
};

export const createDropdown = (options: DecorationTemplate[]) => {
  const input = getInputDOM();

  const details = document.createElement("details");
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
    const button = document.createElement("button");
    button.innerHTML = `
      <div style = 'height: 1rem; width: 1rem; background: ${template.hex}; border-radius: 100%'></div>
      <span>${template.label}</span>
    `;
    button.dataset["hex"] = template.hex;
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
      setColor(template.hex);

      if (!input) return;

      input.value = template.label;
      input.focus(); // NOTE: これがないと値更新が反映されない
    };

    div.appendChild(button);
  });

  details.appendChild(summary);
  details.appendChild(div);
  return details;
};

export const createOption = ({ label, hex }: DecorationTemplate) => {
  const option = document.createElement("option");
  option.value = label;
  option.innerHTML = label;
  option.dataset["hex"] = hex;

  return option;
};

export const createSelector = (options: DecorationTemplate[]) => {
  const selector = document.createElement("select");
  selector.id = SELECTOR_ID;

  options.forEach((value) => {
    selector.appendChild(createOption(value));
  });

  selector.onchange = (e) => {
    const input = getInputDOM();
    const target = e.target as HTMLSelectElement;
    const selectedOption = target.selectedOptions[0];
    const selectedHex = selectedOption.dataset["hex"] as ColorHex;

    setColor(selectedHex);

    if (!input || input.value.includes(target.value)) return;

    input.value = `${target.value} ${input.value}`;
  };

  return selector;
};

export const setSelector = (options: DecorationTemplate[]) => {
  const selector = getSelector();

  selector?.replaceChildren();
  options?.forEach((value) => {
    selector?.append(createOption(value));
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
