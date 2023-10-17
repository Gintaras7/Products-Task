/**
 *
 * @param {Array} items
 * @param {string} textToSearch
 * @param {Array} keysToCheck
 * @param {[Object]} options
 * @returns {Array}
 */
export function searchForValuesInObjects(
  items,
  textToSearch,
  keysToCheck,
  options = {}
) {
  const { lowerCaseText = true } = options;

  if (!Array.isArray(keysToCheck)) {
    return items;
  }

  if (!keysToCheck.length) {
    return items;
  }

  const preparedText = lowerCaseText
    ? textToSearch.toLowerCase()
    : textToSearch;

  return items.filter((item) =>
    atLeastOneValueMatches(item, preparedText, keysToCheck)
  );
}

function atLeastOneValueMatches(item, textToSearch, keysToCheck) {
  if (typeof item !== "object") {
    return false;
  }

  return keysToCheck.some((key) => {
    if (!Object.hasOwn(item, key)) {
      return false;
    }

    return item[key]?.toLowerCase().includes(textToSearch);
  });
}
