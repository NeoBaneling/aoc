import PromptSync from 'prompt-sync';
import fs from 'fs';
import { getDay, getYear } from './helpers';

console.log('🔭  Booting StarTracker 3000');

const prompt = PromptSync();
// Get [day, part, type] from args
const args = process.argv;

const day = getDay(args, false);
const year = getYear(args, 5);

// If there is not a folder for this year OR there is not a folder for this day
if (!fs.existsSync(`src/${year}`) || !fs.existsSync(`src/${year}/${day}`)) {
  // Throw an error, saying [day] needs to be created with 'yarn add day'
  console.log(
    `🧊  Oops! It looks like day ${day} has not been opened for ${year}! Open it with "yarn open ${day}"`
  );
  process.exit();
}

let part: string;

// Get part from args
if (args.length < 4) {
  part = prompt('🦌  Would you like to run part 1 or part 2? ');
} else {
  part = args[3];
}

// While part is not valid
while (Number(part) < 1 || Number(part) > 2) {
  console.log('🧊  Oops! The problem part must be either 1 or 2.');
  //Prompt for a valid part
  part = prompt('🦌  Which part would you like to run? ');
}

const isTest = args[4] ? args[4].toLowerCase() === 'y' : false;

const runTest = async () => {
  const module = await import(`../${year}/${day}/index.ts`);
  console.log(
    `⛄️  Running problem ${year}.${day}.${part} with ${
      isTest ? 'example' : 'given'
    } puzzle input...\n`
  );
  const res = new module.default()[part === '1' ? 'runPartOne' : 'runPartTwo'](
    `src/${year}/${day}`,
    isTest
  );
  console.log(`⭐️  Result: ${res}`);
};

runTest();
