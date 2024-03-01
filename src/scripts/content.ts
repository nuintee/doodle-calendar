const OPTIONS = ["📈 SquadBeyond", "👨‍⚕️ TEN"];

const insertedNodes: Node[] = [];
const observer = new MutationObserver(function () {
  const input = document.querySelector('input[aria-label="タイトルを追加"]');

  if (!input) return;

  const selector = document.createElement("select");
  OPTIONS.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;

    selector.appendChild(option);
  });

  const parentLabel = input.parentElement;

  if (parentLabel) {
    parentLabel.style.paddingLeft = "1rem";
  }

  selector.onchange = (e) =>
    ((input as HTMLInputElement).value = (
      e?.target as HTMLSelectElement
    )?.value);

  parentLabel?.appendChild(selector);
});
observer.observe(document.documentElement, { childList: true });
console.log(insertedNodes);

chrome.runtime.onMessage.addListener(function (request) {
  const value = JSON.parse(request)?.value;

  const input = document.querySelector('input[aria-label="タイトルを追加"]');

  if (!input || !value) return;

  (input as HTMLInputElement).value = value;
});
