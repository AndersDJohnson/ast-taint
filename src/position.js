import fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

const isPositionWithin = (pos, loc) =>
  loc.start.line <= pos.line &&
  loc.end.line >= pos.line &&
  loc.start.column <= pos.column &&
  loc.end.column >= pos.column;

const getPosition = ({ file, position }) => {
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

  return target;
};

export { getPosition };
