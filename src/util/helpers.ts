import PromptSync from 'prompt-sync';

export const getDay = (args: string[], isOpening: boolean): string => {
  const prompt = PromptSync();
  let day: string;

  // Get day from args
  if (args.length < 3) {
    day = prompt(
      `🎁  Which day would you like to ${isOpening ? 'open' : 'run'}? `
    );
  } else {
    day = args[2];
  }

  // While day is not valid
  while (Number(day) < 1 || Number(day) > 25) {
    console.log('🧊  Oops! The day must be between 1 and 25 (inclusive).');
    // Prompt for a valid day
    day = prompt(
      `🎁  Which day would you like to ${isOpening ? 'open' : 'run'}? `
    );
  }

  return day;
};

export const getYear = (args: string[], yearIndex: number): string => {
  let year = '';
  if (args.length > yearIndex - 1) {
    year = args[yearIndex];
  }
  if (!year || !year.match(/20[0-9][0-9]/)) {
    year = new Date().getFullYear().toString();
  }
  return year;
};

export const getTemplate = (
  day: string
): string => `import Day from '../../util/day';

export default class Day_${day} extends Day {
  /**
   * The first part to your problem
   * @param input The puzzle's text input, where each index is one line
   * @returns Your answer to the problem
   */
  one = (input: string[]): number => {
    // solve the problem

    // return your answer
    return -1;
  };

  /**
   * The second part to your problem
   * @param input The puzzle's text input, where each index is one line
   * @returns Your answer to the problem
   */
  two = (input: string[]): number => {
    // solve the problem

    // return your answer
    return -1;
  };
}
`;
