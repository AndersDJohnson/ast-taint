import { run } from "..";

describe("run", () => {
  it.skip("should work for simple", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/simple/index.js`,
      position: { line: 1, column: 35 }
    });

    expect(ran).toBe("OK");
  });

  it.skip("should find source", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/main/index.js`,
      position: { line: 12, column: 18 }
    });

    console.log(ran);
  });

  it.only("will fail when target doesn't have binding", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/main/index.js`,
      position: { line: 10, column: 36 }
    });

    console.log(ran);
  });

  it("to find property coming from object as param", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/main/index.js`,
      position: { line: 4, column: 38 }
    });

    expect(ran).toMatchObject({
      kind: "param"
    });
  });
});
