export function searchForValuesInObjects(items, textToSearch, keysToCheck) {
    if (textToSearch.length === 0 || keysToCheck.length === 0) {
        return items;
    }

    return items.filter((item) => {
        return keysToCheck.some(
            (key) => item[key] && item[key].includes(textToSearch)
        );
    });
}