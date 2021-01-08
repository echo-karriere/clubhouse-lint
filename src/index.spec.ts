import { checkCommit } from ".";

describe("checkCommit", () => {
  describe("allows correct commits", () => {
    it("properly formatted", () => {
      expect(checkCommit("[CH-123]: test message")).toBeUndefined();
    });

    it("without Clubhouse references", () => {
      expect(checkCommit("Fix commit message")).toBeUndefined();
    });
  });

  describe("disallows incorrect commits", () => {
    it("lowercase GH-", () => {
      expect(() => checkCommit("[ch-123]: wrong")).toThrow(/The reference should be upper case/);
    });

    it("mixed case GH-", () => {
      expect(() => checkCommit("[Ch-123]: wrong")).toThrow(/The reference should be upper case/);
      expect(() => checkCommit("[cH-123]: wrong")).toThrow(/The reference should be upper case/);
    });

    it("missing dash", () => {
      expect(() => checkCommit("[CH123]: wrong")).toThrow(/The reference should have a dash/);
    });

    it("fails commit from git helper", () => {
      expect(() => checkCommit("Create husky hook for commit message linting [ch97]")).toThrow(
        /You should start your commit message/,
      );
    });

    it("missing colon", () => {
      expect(() => checkCommit("[CH-123] wrong")).toThrow(/Your reference should have a colon/);
    });
  });
});
