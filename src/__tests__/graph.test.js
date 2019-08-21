import { getGraph } from "../graph";

describe("graph", () => {
  it("should get graph", () => {
    const graph = getGraph({
      file: `${__dirname}/../test-apps/graph/index.js`,
      position: { line: 14, column: 14 }
    });

    console.log(graph);
  });
});
