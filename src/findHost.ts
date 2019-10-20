import { NodePath, Binding } from "@babel/traverse";
import { findUp } from "./find";
import { isMemberExpression, isObjectProperty } from "@babel/types";

const findHost = (path: NodePath) => {
  const parent = findUp(path.parentPath, path => !path.isObjectProperty());

  const node = isMemberExpression(path.container)
    ? path.container
    : isObjectProperty(path.container) &&
      isMemberExpression(path.container.value)
    ? path.container.value
    : parent && parent.isMemberExpression()
    ? parent.node
    : path.node;

  let name;
  // @ts-ignore
  if (node.object) {
    // @ts-ignore
    let object = node.object;
    while (object) {
      // @ts-ignore
      name = object.name;
      // @ts-ignore
      object = object.object;
    }
  } else {
    // @ts-ignore
    name = node.name;
  }

  return name;
};

export { findHost };
