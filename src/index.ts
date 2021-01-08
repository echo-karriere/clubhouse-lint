import fs from "fs";

export const main = (): void => {
  if (!process.env.HUSKY_GIT_PARAMS) throw new Error("Can't find $HUSKY_GIT_PARAMS");
  const commit = readFile(process.env.HUSKY_GIT_PARAMS);
  return checkCommit(commit);
};

const RE_CORRECT_REF = RegExp(/^\[CH-\d+\]:/);
const RE_WRONG_CASE_REF = RegExp(/^\[(ch|cH|Ch)(-|)\d+\]:/);
const RE_MISSING_DASH_REF = RegExp(/^\[CH\d+\]:/);
const RE_CH_COMMIT_HELPER_REF = RegExp(/\[ch\d+\]/);
const RE_MISSING_COLON = RegExp(/^\[CH-\d+\]\s/);

export const checkCommit = (commit: string): void => {
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
