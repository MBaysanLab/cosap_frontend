export function romanToInt(roman) {
  const symbolValues = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  for (let i = 0; i < roman.length; i++) {
    if (i > 0 && symbolValues[roman[i]] > symbolValues[roman[i - 1]]) {
      result += symbolValues[roman[i]] - 2 * symbolValues[roman[i - 1]];
    } else {
      result += symbolValues[roman[i]];
    }
  }
  return result;
}

export function extractAllFilesFromFileMap(fileMap) {
  let files = [];
  for (const key in fileMap) {
    if (!Object.keys(fileMap[key]).includes("childrenIds")) {
      files.push(fileMap[key].path);
    } else {
      files = files.concat(extractAllFilesFromFileMap(fileMap[key].children));
    }
  }
  return files;
}
