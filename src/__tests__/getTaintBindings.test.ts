import { parse } from "@babel/parser";
import { findVariableDeclaratorWithName } from "../find";
import { getTaintBindings } from "../getTaintBindings";

describe("findHost", () => {
  test("finds simple variable", () => {
    const source = `
    const b = 1;
    const a = b;
    `;
    const ast = parse(source);
    const v = findVariableDeclaratorWithName(ast, "a");

    const bindings = getTaintBindings(v);

    expect(bindings).toHaveLength(1);
    expect(bindings).toMatchObject([
      {
        identifier: {
          name: "b"
        }
      }
    ]);
  });

  test("finds expression with simple variables", () => {
    const source = `
    const b = 1;
    const c = 2;
    const a = b + c;
    `;
    const ast = parse(source);
    const v = findVariableDeclaratorWithName(ast, "a");

    const bindings = getTaintBindings(v);

    expect(bindings).toHaveLength(2);
    expect(bindings).toMatchObject([
      {
        identifier: {
          name: "b"
        }
      },
      {
        identifier: {
          name: "c"
        }
      }
    ]);
  });

  test.only("finds expression with object expression variables", () => {
    const source = `
    const b = 1;
    const c = {
      d: 2
    };
    const a = b + c.d;
    `;
    const ast = parse(source);
    const v = findVariableDeclaratorWithName(ast, "a");

    const bindings = getTaintBindings(v);

    expect(bindings).toHaveLength(2);
    expect(bindings).toMatchObject([
      {
        identifier: {
          name: "b"
        }
      },
      {
        identifier: {
          name: "c"
        }
      }
    ]);
  });
});
