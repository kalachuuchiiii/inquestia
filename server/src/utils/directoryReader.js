const path = require("path"); 
const fs = require("fs"); 

exports.readOneFile = (dir = []) => {
  const directory = path.join(...dir);
  const result = require(directory);
  
  return result;
}

exports.fileReader = (dir = [], {includeIndex = false} = {}) => {
  const directory = path.join(...dir);
  const filesInThisDirectory = fs.readdirSync(directory);
  const files = [];
  const fileNames = [];
  const results = {};
  
  for(const file of filesInThisDirectory){
    const stat = fs.statSync(path.join(directory, file));
    const isFile = stat.isFile() && file.endsWith(".js");
    if(!isFile) continue; 
    files.push(file);
  }
  
  for(const file of files){
    const fullPath = path.join(directory, file);
    const fileName = path.basename(file, ".js");
    if(!includeIndex && fileName === "index") continue;
    fileNames.push(fileName);
    results[fileName] = require(fullPath);
  }

  return {
    results, 
    fileNames
  }
}

exports.folderReader = (dir = []) => {
  const directory = path.join(...dir);
  const folders = []; 
  const directories = {};
  
  const foldersInThisDirectory = fs.readdirSync(directory);
  
  for(const folder of foldersInThisDirectory){
    const stat = fs.statSync(path.join(directory, folder));
    const isFolder = stat.isDirectory() && (!folder.endsWith(".js"));
    
    if(!isFolder)continue; 
    folders.push(folder);
  }
  
  for(const folder of folders){
    directories[folder] = path.join(directory, folder);
  }
  
  return {
    folders, 
    directories
  }
}