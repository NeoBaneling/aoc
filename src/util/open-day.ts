import PromptSync from 'prompt-sync';
import fs from 'fs';
import { getDay, getTemplate, getYear } from './helpers';

const prompt = PromptSync();
const args = process.argv;

const day = getDay(args, true);

const year = getYear(args, 3);

// If there is not a folder for this year
if (!fs.existsSync(`src/${year}`)) {
  // Create the folder
  fs.mkdirSync(`src/${year}`);
}

const path = `src/${year}/${day}`;

// If there is a folder for this day
if (fs.existsSync(path)) {
  // Throw an error saying [day] has already been added
  console.log(
    `🎉  Good news! Day ${day} already exists! Run it with "yarn start ${day} 1"`
  );
  process.exit();
}

// Create a folder for this day
fs.mkdirSync(path);
// Duplicate the boilerplate "day" file
fs.writeFileSync(`${path}/index.ts`, getTemplate(day));

// Prompt the user for the example puzzle input
const ex = prompt.hide('🧚  Paste the example puzzle input: ');

// Save the set in an ex.txt file
fs.writeFileSync(`${path}/ex.txt`, ex);

// Prompt the user for the given puzzle input
const act = prompt.hide('🎊  Paste your provided puzzle input: ');

// Save the set in an act.txt file
fs.writeFileSync(`${path}/act.txt`, act);

// Return with success, providing the path to the day's file
console.log(
  `⭐️  Fa-la-la! Day ${day} has been opened at /src/${year}/${day}/index.ts. Happy coding!`
);
