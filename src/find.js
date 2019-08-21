const find = (path, test, { furthest } = {}) => {
  let current = path;
  let found;
  while (current) {
    if (test(current)) {
      found = current;
      if (!furthest) return found;
    }
    current = current.parentPath;
  }
  return found;
};

export { find };
