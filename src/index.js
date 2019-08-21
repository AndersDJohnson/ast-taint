import { getPosition } from "./position";
import { find } from "./find";

// const findHostObject = path =>
//   find(path, c => c.isObjectExpression(), { furthest: true });

// TODO: Only check for variables within a certain shared scope?
const findVariable = path => find(path, c => c.isVariableDeclarator());

const findVariableRefs = path => {
  let references = [];

  const v1 = findVariable(path);

  if (!v1) return references;

  const name = v1.node.id.name;

  const binding = v1.scope.bindings[name];

  references.push(binding);

  binding.referencePaths.forEach(referencePath => {
    const v2 = findVariable(referencePath);
    references = references.concat(findRefs(v2));
  });

  return references;
};

const findCallRefs = binding => {
  let references = [];

  binding.referencePaths.forEach(referencePath => {
    const call = find(referencePath, c => c.isCallExpression());
    references = references.concat();
  });

  return references;
};

const run = ({ file, position }) => {
  const target = getPosition({ file, position });

  let refs = findVariableRefs(target);

  refs.forEach(ref => {
    console.log("ADJ var ref", ref);
  });
};

export { run };
