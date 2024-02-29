const insertedNodes: Node[] = [];
const observer = new MutationObserver(function () {
  const input = document.querySelector('input[aria-label="タイトルを追加"]');

  if (!input) return;

  (input as HTMLInputElement).value = `💡 Test`;
});
observer.observe(document.documentElement, { childList: true });
console.log(insertedNodes);

chrome.runtime.onMessage.addListener(function (request) {
  const value = JSON.parse(request)?.value;

  const input = document.querySelector('input[aria-label="タイトルを追加"]');

  console.log({ input, value });

  if (!input || !value) return;

  (input as HTMLInputElement).value = value;
});
