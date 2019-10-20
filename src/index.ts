import { NodePath } from "@babel/traverse";
import { Identifier, VariableDeclarator } from "@babel/types";
import { getPosition } from "./position";
import { getTaintBindings } from "./getTaintBindings";
import { findBindings } from "./findBindings";

// // TODO: Only check for variables within a certain shared scope?
// const findVariable = path => findUp(path, c => c.isVariableDeclarator());

// const findVariableRefs = path => {
//   let references = [];
//
//   const v1 = findVariable(path);
//
//   if (!v1) return references;
//
//   const name = v1.node.id.name;
//
//   const binding = v1.scope.bindings[name];
//
//   references.push(binding);
//
//   binding.referencePaths.forEach(referencePath => {
//     const v2 = findVariable(referencePath);
//     references = references.concat(findVariableRefs(v2));
//   });
//
//   return references;
// };

// const walk = path => {
//   let refs = [];
//   // 0. find all variables derivative of target variable
//   // TODO: Annotate these indicating if only a nested key is infected.
//   let _refs = findVariableRefs(path);
//
//   refs = refs.concat(_refs);
//
//   // 1. for each such variable
//   // 2. find all functions called with variable
//   // 3. lookup those functions, considering args
//   _refs.forEach(ref => {
//     // console.log("ADJ var ref", ref);
//     ref.referencePaths.forEach(refPath => {
//       const call = findUp(refPath, c => c.isCallExpression());
//       if (!call) return;
//
//       // const v3 = findVariable(call);
//       //
//       // if (v3) {
//       //   refs = refs.concat(walk(v3));
//       // }
//     });
//   });
//
//   return refs;
// };

// TODO: Handle multi-init consts?
const findTaintForConst = (path: NodePath) => {
  const taintedBy = getTaintBindings(path);

  return taintedBy.map(t => findTaintForConst(t.path));
};

const run = ({ file, position }) => {
  try {
    const target = getPosition({ file, position });

    console.log(target);

    if (!target.isIdentifier()) {
      throw new Error("Can only target identifiers.");
    }

    const bindings = findBindings(target);

    if (!bindings || !bindings.length) {
      throw new Error("Can only resolve fields with bindings.");
    }

    // TODO: Not just the first
    const binding = bindings[0];

    const {
      path: { node }
    } = binding;

    if (node.type !== "VariableDeclarator" && node.type !== "Identifier") {
      throw new Error(
        "Can only resolve identifiers with variable declarators in scope."
      );
    }

    const { kind, path } = binding;

    // TODO: Handle multi-init consts?
    if (kind === "const") {
      findTaintForConst(path);
      debugger;
    }

    return {
      kind,
      name: binding.identifier.name
    };
  } catch (error) {
    console.error(error);
  }
};

export { run };
