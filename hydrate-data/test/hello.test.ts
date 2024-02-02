import { Hello } from "../src/hello.js";

test("hello", async () => {
  const hello = new Hello();
  expect(await hello.sayHello()).toBe("hello, world!");
});