// debounce function
export function debounce(func: () => void, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay); //call the func after the delay
  };
}
