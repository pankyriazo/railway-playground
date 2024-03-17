export const unregister = (element: Node, callback: () => void) => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      console.log(mutation.target);
      if (mutation.target.isSameNode(element)) {
        observer.disconnect();
        callback();
      }
    }
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
};
