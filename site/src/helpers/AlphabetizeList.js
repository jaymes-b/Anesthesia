export function AlphabetizeList(list) {
  return list.sort((a, b) => {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  })
}