import { getPosition } from "./position";
import { find } from "./find";

const getGraph = ({ file, position }) => {
  const target = getPosition({ file, position });

  console.log(target);

  const call = find(target, c => c.isCallExpression());

  console.log("ADJ call", call);
};

export { getGraph };

// x. in a given function...
// 0. find all variables derivative of target variable
// 1. for each such variable
// 2. find all functions called with variable
// 3. lookup those functions, considering args
