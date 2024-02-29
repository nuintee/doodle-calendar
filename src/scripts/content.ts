const insertedNodes: Node[] = [];
const observer = new MutationObserver(function () {
  const input = document.querySelector('input[aria-label="タイトルを追加"]');

  if (!input) return;

  (input as HTMLInputElement).value = `💡 Test`;
});
observer.observe(document.documentElement, { childList: true });
console.log(insertedNodes);
