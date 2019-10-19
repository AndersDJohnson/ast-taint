import { run } from "..";

describe("run", () => {
  it("should work for simple", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/simple/index.js`,
      position: { line: 1, column: 35 }
    });

    expect(ran).toBe("OK");
  });

  // it("should find type", () => {
  //   const ran = run({
  //     file: `${__dirname}/../test-apps/main/index.js`,
  //     position: { line: 4, column: 30 }
  //   });
  //
  //   console.log(ran);
  // });
});
