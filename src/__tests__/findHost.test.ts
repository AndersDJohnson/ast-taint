import { parse } from "@babel/parser";
import { findIdentifierWithName } from "../find";
import { findHost } from "../findHost";

describe("findHost", () => {
  test("finds simple variable", () => {
    const source = `c`;
    const ast = parse(source);

    const c = findIdentifierWithName(ast, "c");

    const name = findHost(c);

    expect(name).toBe("c");
  });

  test("finds parent of object expression", () => {
    const source = `a.b.c`;
    const ast = parse(source);

    const c = findIdentifierWithName(ast, "c");

    const name = findHost(c);

    expect(name).toBe("a");
  });
});
