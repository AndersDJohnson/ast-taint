import { getPosition } from "./position";
import { find } from "./find";

// // TODO: Only check for variables within a certain shared scope?
// const findVariable = path => find(path, c => c.isVariableDeclarator());

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
//       const call = find(refPath, c => c.isCallExpression());
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

const run = ({ file, position }) => {
  // x. in a given function...

  const target = getPosition({ file, position });

  console.log(target);

  // Goal: find dispatches
  // Either (A) in scope or (B) in another function receiving arguments this taints.

  // First, let's taint any variables we participate in.

  // if (target.parentPath)

  // const refs = findVariableRefs(target);
  // console.log(refs);
};

export { run };
