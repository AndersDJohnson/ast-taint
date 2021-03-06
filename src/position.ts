import * as fs from "fs";
import { parse } from "@babel/parser";
import traverse, { NodePath } from "@babel/traverse";

const isPositionWithin = (pos, loc) =>
  loc.start.line <= pos.line &&
  loc.end.line >= pos.line &&
  loc.start.column <= pos.column &&
  loc.end.column >= pos.column;

const getPosition = ({ file, position }): NodePath | undefined => {
  const source = fs.readFileSync(file, "utf8");

  const ast = parse(source, {
    sourceType: "unambiguous"
  });

  let target: NodePath;

  traverse(ast, {
    enter(path) {
      if (isPositionWithin(position, path.node.loc)) {
        target = path;
      }
    }
  });

  return target;
};

export { getPosition };
