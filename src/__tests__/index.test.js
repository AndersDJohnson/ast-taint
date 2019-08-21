import { run } from "..";

describe("run", () => {
  it("should find type", () => {
    const ran = run({
      file: `${__dirname}/../test-apps/main/index.js`,
      position: { line: 3, column: 19 }
    });

    console.log(ran);
  });
});
