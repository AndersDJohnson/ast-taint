import { parse } from "@babel/parser";
import { findIdentifierWithName } from "../find";
import { findBindings } from "../findBindings";

describe("findBindings", () => {
  test("whatever", () => {
    const source = `a.b.c`;
    const ast = parse(source);

    const c = findIdentifierWithName(ast, "c");

    const bindings = findBindings(c);

    console.log(bindings);
  });
});
