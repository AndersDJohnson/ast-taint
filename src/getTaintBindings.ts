import { isIdentifier } from "@babel/types";
import traverse, { NodePath } from "@babel/traverse";
import { BindingWithUsagePath } from "./findBindings";

const getBindingForName = (path, name) => {
  const {
    scope: {
      bindings: { [name]: binding }
    }
  } = path;
  return binding;
};

const getTaintBindings = (path: NodePath) => {
  const taintedBy: BindingWithUsagePath[] = [];

  if (!path.isVariableDeclarator()) return taintedBy;

  if (isIdentifier(path.node.init)) {
    const binding = getBindingForName(path, path.node.init.name);
    if (binding) {
      const bindingWithMember: BindingWithUsagePath = {
        binding
      };
      taintedBy.push(bindingWithMember);
    }
  } else {
    traverse(
      path.node.init,
      {
        enter(p) {
          if (p.isIdentifier()) {
            const binding = getBindingForName(p, p.node.name);
            const bindingWithMember: BindingWithUsagePath = {
              binding,
              usage: p
            };
            taintedBy.push(bindingWithMember);
            if (p.parentPath.isMemberExpression()) {
              p.skip();
            }
          }
        }
      },
      path.scope,
      null,
      path.parentPath
    );
  }

  debugger;

  return taintedBy;
};

export { getTaintBindings };
