import { run } from "..";

describe("run", () => {
  it.skip("should work for simple", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/simple/index.js`,
      position: { line: 1, column: 35 }
    });

    expect(ran).toBe("OK");
  });

  it.only("should find source const then explore taint", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/main/index.js`,
      position: { line: 12, column: 18 }
    });

    console.log(ran);
  });

  it.skip("will find host object for property access target", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/main/index.js`,
      position: { line: 10, column: 36 }
    });

    console.log(ran);
  });

  it.skip("to find property coming from object as param", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/main/index.js`,
      position: { line: 4, column: 38 }
    });

    expect(ran).toMatchObject({
      kind: "param"
    });
  });
});
