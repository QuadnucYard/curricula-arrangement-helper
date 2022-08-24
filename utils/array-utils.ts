function removeOne<T>(arr: T[], value: T) {
  const idx = arr.indexOf(value);
  if (idx != -1) arr.splice(idx, 1);
}

const array_utils = {
  removeOne,
};

export default array_utils;
