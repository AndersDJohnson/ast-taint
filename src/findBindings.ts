import { NodePath, Binding } from "@babel/traverse";
import { findHost } from "./findHost";

interface BindingWithUsagePath {
  binding: Binding;
  usage?: NodePath;
}

const findBindings = (path: NodePath) => {
  const bindings: BindingWithUsagePath[] = [];

  const name = findHost(path);

  const {
    scope: {
      bindings: { [name]: binding }
    }
  } = path;

  const bindingWithMember: BindingWithUsagePath = {
    binding,
    usage: path
  };

  bindings.push(bindingWithMember);

  return bindings;
};

export { BindingWithUsagePath, findBindings };
