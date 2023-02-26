export function nextTick(callback) {
  let timerFunc;
  if (typeof Promise !== 'undefined') {
    const p = Promise.resolve();
    timerFunc = () => {
      p.then(callback);
    };
  } else if (
    typeof MutationObserver !== 'undefined' &&
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  ) {
    let counter = 1;
    const observer = new MutationObserver(callback);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, { characterData: true });
    timerFunc = () => {
      counter = (counter + 1) % 2;
      textNode.data = String(counter); // 数据更新
    };
  } else if (typeof setImmediate !== 'undefined') {
    timerFunc = () => {
      setImmediate(callback);
    };
  } else {
    timerFunc = () => {
      setTimeout(callback, 0);
    };
  }
  timerFunc();
}

export function uuid() {
  const uuid = window.crypto.getRandomValues(new Uint8Array(8));
  return uuid.toString().split(',').join('');
}
