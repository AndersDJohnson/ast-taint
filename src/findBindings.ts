import { NodePath, Binding } from "@babel/traverse";
import { findHost } from "./findHost";

interface BindingWithUsagePath {
  binding: Binding;
  usage?: NodePath;
}

const getBindingForName = (path, name) => {
  const {
    scope: {
      bindings: { [name]: binding }
    }
  } = path;
  return binding;
};

const findBindings = (path: NodePath) => {
  const bindings: BindingWithUsagePath[] = [];

  const name = findHost(path);

  const binding = getBindingForName(path, name);

  if (binding) {
    const bindingWithMember: BindingWithUsagePath = {
      binding,
      usage: path
    };

    bindings.push(bindingWithMember);
  }

  return bindings;
};

export { BindingWithUsagePath, getBindingForName, findBindings };
