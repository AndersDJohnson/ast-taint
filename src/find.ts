import { NodePath } from "@babel/traverse";

interface Opts {
  furthest?: boolean;
}

const findUp = (
  path: NodePath,
  test: (path: NodePath) => boolean,
  opts: Opts = {}
) => {
  const { furthest } = opts;
  let current = path;
  let found;
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

export { findUp };
