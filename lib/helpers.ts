export const convertFirstCapitals = (words: string[]) =>
  words.map((word: string) => {
    if (word.length == 1) return word.toUpperCase();

    return word.charAt(0).toUpperCase() + word.slice(1);
  });
