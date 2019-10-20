import { NodePath, Binding } from "@babel/traverse";
import { findHost } from "./findHost";

const findBindings = (path: NodePath) => {
  const bindings: Binding[] = [];

  const name = findHost(path);

  const {
    scope: {
      bindings: { [name]: binding }
    }
  } = path;

  bindings.push(binding);

  return bindings;
};

export { findBindings };
