import { parse } from "@babel/parser";
import { findIdentifierWithName } from "../find";
import { findBindings } from "../findBindings";

describe("findBindings", () => {
  test("finds binding for simple property in object expression", () => {
    const source = `
      const c = {};
      c
    `;
    const ast = parse(source);

    const c = findIdentifierWithName(ast, "c");

    const bindings = findBindings(c);

    expect(bindings).toHaveLength(1);
    expect(bindings[0]).toMatchObject({
      identifier: {
        name: "c"
      }
    });
  });

  test("finds host binding for property in object expression", () => {
    const source = `
      const a = {};
      a.b.c
    `;
    const ast = parse(source);

    const c = findIdentifierWithName(ast, "c");

    const bindings = findBindings(c);

    expect(bindings).toHaveLength(1);
    expect(bindings[0]).toMatchObject({
      identifier: {
        name: "a"
      }
    });
  });
});
