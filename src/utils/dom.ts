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
