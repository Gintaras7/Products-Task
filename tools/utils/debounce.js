/* @TODO: 
 function should return "timeoutID" so in vue unmount()
 hook could be cleared this interval
*/
export function debounce(fn, delay = 250) {
  let timeoutID = null;

  return function (...args) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }

    timeoutID = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
