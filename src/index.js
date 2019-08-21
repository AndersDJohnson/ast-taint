import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const isPositionWithin = (pos, loc) =>
  loc.start.line <= pos.line &&
  loc.end.line >= pos.line &&
  loc.start.column <= pos.column &&
  loc.end.column >= pos.column;

const find = (path, test, { furthest } = {}) => {
  let current = path;
  let found;
  while (current) {
    if (test(current)) {
      found = current;
      if (!furthest) return found;
    }
    current = current.parentPath;
  }
  return found;
};

// const findHostObject = path =>
//   find(path, c => c.isObjectExpression(), { furthest: true });

// TODO: Only check for variables within a certain shared scope?
const findVariable = path => find(path, c => c.isVariableDeclarator());

const findVariableRefs = path => {
  let references = [];

  const v1 = findVariable(path);

  if (!v1) return references;

  const name = v1.node.id.name;

  const binding = v1.scope.bindings[name];

  references.push(binding);

  binding.referencePaths.forEach(referencePath => {
    const v2 = findVariable(referencePath);
    references = references.concat(findRefs(v2));
  });

  return references;
};

const findCallRefs = binding => {
  let references = [];

  binding.referencePaths.forEach(referencePath => {
    const call = find(referencePath, c => c.isCallExpression());
    references = references.concat();
  });

  return references;
};

const run = ({ file, position }) => {
  const source = fs.readFileSync(file, "utf8");

  const ast = parse(source, {
    sourceType: "unambiguous"
  });

  let target;

  traverse(ast, {
    enter(path) {
      if (isPositionWithin(position, path.node.loc)) {
        target = path;
      }
    }
  });

  let refs = findVariableRefs(target);

  refs.forEach(ref => {
    console.log("ADJ var ref", ref);
  });
};

export { run };
