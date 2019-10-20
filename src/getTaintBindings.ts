import traverse, { NodePath, Binding } from "@babel/traverse";
import { findBindings } from "./findBindings";

const getTaintBindings = (path: NodePath) => {
  const taintedBy: Binding[] = [];

  if (!path.isVariableDeclarator()) return taintedBy;

  traverse(
    path.node.init,
    {
      enter(p) {
        if (p.isIdentifier()) {
          const bindings = findBindings(p);
          bindings.forEach(binding => taintedBy.push(binding));
        }
      }
    },
    path.scope,
    null,
    path.parentPath
  );

  debugger;

  return taintedBy;
};

export { getTaintBindings };
