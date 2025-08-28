const path = require('path');
const requireDirectory = require('require-directory');

/**
 * Reads a single JS file.
 * dir: array of path segments, e.g., ['src', 'models', 'User.js']
 */
exports.readOneFile = (dir = []) => {
  const fullPath = path.join(...dir);
  return require(fullPath);
};

/**
 * Reads all JS files in a directory.
 * dir: array of path segments, e.g., ['src', 'models']
 * options: { includeIndex: boolean }
 */
exports.fileReader = (dir = [], { includeIndex = false } = {}) => {
  const directory = path.join(...dir);

  // Load all JS files in the directory using require-directory
  const results = requireDirectory(module, directory, {
    visit: (obj, name) => {
      if (!includeIndex && name === 'index') return undefined;
      return obj;
    },
    rename: (name) => name, // keep original file names
    recurse: false, // non-recursive, same as glob sync('*.js')
  });

  const fileNames = Object.keys(results);
  return { results, fileNames };
};

/**
 * Reads all folders in a directory.
 * dir: array of path segments, e.g., ['src']
 */
exports.folderReader = (dir = []) => {
  const directory = path.join(...dir);

  // Load all subfolders as modules (non-recursive)
  const results = requireDirectory(module, directory, {
    visit: (obj, name) => {
      if (name === 'index') return undefined;
      return obj;
    },
    rename: (name) => name,
    recurse: false,
  });

  const folders = Object.keys(results);
  const directories = {};
  for (const folder of folders) {
    directories[folder] = path.join(directory, folder);
  }

  return { folders, directories };
};