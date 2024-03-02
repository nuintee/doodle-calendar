const SELECTOR_ID = "__TEMPLATE_SELECTOR";

const getInputDOM = () => {
  return document.querySelector(
    'input[aria-label="タイトルを追加"]'
  ) as HTMLInputElement | null;
};

const getSelector = () => {
  return document.getElementById(SELECTOR_ID) as HTMLSelectElement | null;
};

const createSelector = (options: string[]) => {
  const selector = document.createElement("select");
  selector.id = SELECTOR_ID;

  options.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;

    selector.appendChild(option);
  });

  selector.onchange = (e) => {
    const input = getInputDOM();
    const target = e.target as HTMLSelectElement;

    if (!input || input.value.includes(target.value)) return;

    input.value = `${target.value} ${input.value}`;
  };

  console.log({ selector });

  return selector;
};

const observer = new MutationObserver(async function () {
  const input = getInputDOM();

  if (!input) return;

  const savedTemplates = (await chrome.storage.local.get())["T"];

  const selector = createSelector(savedTemplates);

  const parentLabel = input.parentElement;
  parentLabel?.appendChild(selector);
});

observer.observe(document.documentElement, { childList: true });

chrome.storage.local.onChanged.addListener(({ T }) => {
  const selector = getSelector();

  if (!T.newValue) return selector?.remove();

  if (!selector) {
    const newSelector = createSelector(T.newValue);
    const input = getInputDOM();
    const parentLabel = input?.parentElement;
    return parentLabel?.appendChild(newSelector);
  }

  selector?.replaceChildren();
  T.newValue?.forEach((value: string) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;

    selector?.append(option);
  });
});

chrome.runtime.onMessage.addListener(function (request) {
  const value = JSON.parse(request)?.value;

  const input = getInputDOM();

  if (!input || !value) return;

  (input as HTMLInputElement).value = value;
});
