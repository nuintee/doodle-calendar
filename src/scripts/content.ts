const getInputDOM = () => {
  return document.querySelector(
    'input[aria-label="タイトルを追加"]'
  ) as HTMLInputElement | null;
};

const createSelector = (options: string[]) => {
  const selector = document.createElement("select");

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

chrome.runtime.onMessage.addListener(function (request) {
  const value = JSON.parse(request)?.value;

  const input = getInputDOM();

  if (!input || !value) return;

  (input as HTMLInputElement).value = value;
});
