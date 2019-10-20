import { getPosition } from "../position";

describe("run", () => {
  it("should work for simple", () => {
    const position = getPosition({
      file: `${__dirname}/../test-apps/simple/index.js`,
      position: { line: 1, column: 35 }
    });

    expect(position).toMatchObject({
      type: "StringLiteral"
    });
  });
});
