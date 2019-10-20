import { isIdentifier } from "@babel/types";
import traverse, { NodePath, Binding } from "@babel/traverse";
import { uniq } from "lodash";
import { findBindings } from "./findBindings";

const getTaintBindings = (path: NodePath) => {
  const taintedBy: Binding[] = [];

  if (!path.isVariableDeclarator()) return taintedBy;

  if (isIdentifier(path.node.init)) {
    const name = path.node.init.name;
    const {
      scope: {
        bindings: { [name]: binding }
      }
    } = path;
    if (binding) {
      taintedBy.push(binding);
    }
  } else {
    traverse(
      path.node.init,
      {
        enter(p) {
          if (p.isIdentifier()) {
            // TODO: Skip functions?
            const bindings = findBindings(p);
            bindings.forEach(binding => taintedBy.push(binding));
            p.skip();
          }
        }
      },
      path.scope,
      null,
      path.parentPath
    );
  }

  debugger;

  return uniq(taintedBy);
};

export { getTaintBindings };
