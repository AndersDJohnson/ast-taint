import { File as BabelFile } from "@babel/types";
import traverse, { NodePath } from "@babel/traverse";

interface Opts {
  furthest?: boolean;
}

type Test = (path: NodePath) => boolean;

const find = (ast: BabelFile, test: Test) => {
  let found: NodePath;
  traverse(ast, {
    enter(p) {
      if (test(p)) {
        if (!found) found = p;
      }
    }
  });
  return found;
};

const findIdentifierWithName = (ast: BabelFile, name: string) =>
  find(ast, p => p.isIdentifier() && p.node.name === name);

const findVariableDeclaratorWithName = (ast: BabelFile, name: string) =>
  find(
    ast,
    // @ts-ignore
    p => p.isVariableDeclarator() && p.node.id.name === "a"
  );

const findUp = (path: NodePath, test: Test, opts: Opts = {}) => {
  const { furthest } = opts;
  let current = path;
  let found: typeof current;
  while (current) {
    if (test(current)) {
      found = current;
      if (furthest) continue;
      return found;
    }
    current = current.parentPath;
  }
  return found;
};

export { find, findUp, findIdentifierWithName, findVariableDeclaratorWithName };
