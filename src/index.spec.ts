import { hello } from ".";

test("hello", () => {
  expect(hello()).toEqual("Hello world!");
  expect(hello("Ola")).toEqual("Hello Ola!");
});
