import { NodePath, Binding } from "@babel/traverse";
import { findUp } from "./find";

const findBindings = (path: NodePath) => {
  const bindings: Binding[] = [];

  const parent = findUp(path.parentPath, path => !path.isObjectProperty());

  const memberTarget = parent && parent.isMemberExpression() ? parent : path;

  // if (path.node.id.name === "hello") {
  //   debugger;
  // }

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

  if (!name) return;

  const {
    scope: {
      bindings: { [name]: binding }
    }
  } = parent;

  bindings.push(binding);

  return bindings;
};

export { findBindings };
