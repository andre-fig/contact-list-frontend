export function sortArray(item, field) {
  return item.sort((a, b) => a[field].localeCompare(b[field]));
}
