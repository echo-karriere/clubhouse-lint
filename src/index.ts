import fs from "fs";

/**
 * Main entry point of linter, checks that the environment variable exists and
 * then runs the check if it does. Does not work outside of `husky`.
 */
export const main = (): void => {
  if (!process.env.HUSKY_GIT_PARAMS) throw new Error("Can't find $HUSKY_GIT_PARAMS");
  const commit = readFile(process.env.HUSKY_GIT_PARAMS);
  try {
    checkCommit(commit);
  } catch ({ message }) {
    console.error(`\u001B[31mCLUBHOUSE-LINT:\u001B[0m ${message as string}`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

// Regex for a correct reference `[CH-123]:`
const RE_CORRECT_REF = RegExp(/^\[CH-\d+\]:/);
// Regex for when the reference has the wrong case: `[ch-123]`
const RE_WRONG_CASE_REF = RegExp(/^\[(ch|cH|Ch)(-|)\d+\]:/);
// Regex for when the reference is missing a dash: `[CH123]:`
const RE_MISSING_DASH_REF = RegExp(/^\[CH\d+\]:/);
// Regex for when you've copied the commit from Clubhouse: `Commit message [ch123]`
const RE_CH_COMMIT_HELPER_REF = RegExp(/\[ch\d+\]/);
// Regex for when the message is missing a colon: `[CH-123]`
const RE_MISSING_COLON = RegExp(/^\[CH-\d+\]\s/);

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
