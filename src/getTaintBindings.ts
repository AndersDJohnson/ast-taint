import { isIdentifier } from "@babel/types";
import traverse, { NodePath } from "@babel/traverse";
import {
  BindingWithUsagePath,
  getBindingForName,
  findBindings
} from "./findBindings";

const getTaintBindings = (path: NodePath) => {
  const taintedBy: BindingWithUsagePath[] = [];

  if (!path.isVariableDeclarator()) return taintedBy;

  if (isIdentifier(path.node.init)) {
    const binding = getBindingForName(path, path.node.init.name);
    if (binding) {
      const bindingWithMember: BindingWithUsagePath = {
        binding,
        usage: path
      };
      taintedBy.push(bindingWithMember);
    }
  } else {
    traverse(
      path.node.init,
      {
        enter(p) {
          if (p.isIdentifier()) {
            // only value identifiers for object properties
            if (p.key === "key") return;
            const bindings = findBindings(p);
            bindings.forEach(bindingWithMember => {
              taintedBy.push(bindingWithMember);
            });
          }
        }
      },
      path.scope,
      null,
      path.parentPath
    );
  }

  return taintedBy;
};

export { getTaintBindings };
