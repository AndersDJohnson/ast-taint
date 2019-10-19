import * as fs from "fs";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
// import { Node } from '@babel/types'
import { TraverseOptions, NodePath, Node } from '@types/babel__traverse'

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
      if (isPositionWithin(position, path.node.loc) {A
        target = path;
      }
    }
  } as TraverseOptions<Node>);

  return target;
};

export { getPosition };
