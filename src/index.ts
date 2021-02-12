import fs from "fs";

/**
 * Main entry point of linter, checks that the environment variable exists and
 * then runs the check if it does. Does not work outside of `husky`.
 */
export const main = (): void => {
  const cliArguments = process.argv;
  if (cliArguments.length !== 3) throw new Error(`Incorrect CLI arguments, expected 3 but got ${cliArguments.length}`);
  const commit = readFile(cliArguments[2]);
  try {
    checkCommit(commit);
  } catch ({ message }) {
    console.error(`\u001B[31mCLUBHOUSE-LINT:\u001B[0m ${message as string}`);
    process.exit(1);
  }
};

// Regex for a correct reference `[CH-123]:`
const RE_CORRECT_REF = new RegExp(/^\[CH-\d+]:/);
// Regex for when the reference has the wrong case: `[ch-123]`
const RE_WRONG_CASE_REF = new RegExp(/^\[(ch|cH|Ch)(-|)\d+]:/);
// Regex for when the reference is missing a dash: `[CH123]:`
const RE_MISSING_DASH_REF = new RegExp(/^\[CH\d+]:/);
// Regex for when you've copied the commit from Clubhouse: `Commit message [ch123]`
const RE_CH_COMMIT_HELPER_REF = new RegExp(/\[ch\d+]/);
// Regex for when the message is missing a colon: `[CH-123]`
const RE_MISSING_COLON = new RegExp(/^\[CH-\d+]\s/);

export const checkCommit = (commit: string): void => {
  // If the commit is correct or does not contain a reference, it is valid.
  if (!commit.toLowerCase().includes("[ch")) return;
  if (RE_CORRECT_REF.exec(commit) !== null) return;

  if (RE_WRONG_CASE_REF.exec(commit) !== null) {
    throw new Error(`The reference should be upper case: '[CH-123]', not '[ch-123]'`);
  }

  if (RE_MISSING_DASH_REF.exec(commit) !== null) {
    throw new Error(`The reference should have a dash: '[CH-123]', not '[CH123]'`);
  }

  if (RE_CH_COMMIT_HELPER_REF.exec(commit) !== null) {
    throw new Error(`You should start your commit message like this: '[CH-123]: <message>'`);
  }

  if (RE_MISSING_COLON.exec(commit) !== null) {
    throw new Error(`Your reference should have a colon at the end: '[CH-123]:', not '[CH-123]'`);
  }

  throw new Error(`Unrecognized commit, aborting... Use '--no-verify' if this is a mistake`);
};

const readFile = (filename: string): string => fs.readFileSync(filename, { encoding: "utf-8" });
