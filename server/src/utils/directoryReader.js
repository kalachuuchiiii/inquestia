const path = require('path');
const glob = require('glob');

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

  // Find all .js files in this directory (non-recursive)
  const files = glob.sync('*.js', { cwd: directory });
  const results = {};
  const fileNames = [];

  for (const file of files) {
    const fileName = path.basename(file, '.js');
    if (!includeIndex && fileName === 'index') continue;

    results[fileName] = require(path.join(directory, file));
    fileNames.push(fileName);
  }

  return { results, fileNames };
};

/**
 * Reads all folders in a directory.
 * dir: array of path segments, e.g., ['src']
 */
exports.folderReader = (dir = []) => {
  const directory = path.join(...dir);

  // Find all folders (non-recursive)
  const folders = glob.sync('*/', { cwd: directory });
  const folderNames = [];
  const directories = {};

  for (const folder of folders) {
    const folderName = folder.replace(/\/$/, ''); // remove trailing slash
    folderNames.push(folderName);
    directories[folderName] = path.join(directory, folderName);
  }

  return { folders: folderNames, directories };
};