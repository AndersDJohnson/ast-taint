import { NodePath, Binding } from "@babel/traverse";
import { findUp } from "./find";

const findHost = (path: NodePath) => {
  const parent = findUp(path.parentPath, path => !path.isObjectProperty());

  const memberTarget = parent && parent.isMemberExpression() ? parent : path;

  let name;
  if (memberTarget.isMemberExpression()) {
    const { node } = memberTarget;
    let object = node.object;
    while (object) {
      // @ts-ignore
      name = object.name;
      // @ts-ignore
      object = object.object;
    }
  } else {
    const { node } = memberTarget;
    // @ts-ignore
    name = node.name;
  }

  return name;
};

export { findHost };
