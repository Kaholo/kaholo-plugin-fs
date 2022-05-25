const fs = require("fs-extra");
const kaholoPluginLibrary = require("kaholo-plugin-library");
const { getScpClient } = require("./helpers");

function copy({
  source: sourcePath,
  destination: destinationPath,
  noOverwrite,
}) {
  return fs.copy(sourcePath, destinationPath, { overwrite: !noOverwrite });
}

function createDirectory({
  path: directoryPath,
}) {
  return fs.mkdirs(directoryPath);
}

function move({
  source: sourcePath,
  destination: destinationPath,
  overwrite,
}) {
  return fs.move(sourcePath, destinationPath, { overwrite });
}

function deletePath({ path }) {
  return fs.remove(path);
}

function exists({ path }) {
  return fs.pathExists(path);
}

async function scpAction(params) {
  const {
    actionType,
    localPath,
    remotePath,
  } = params;
  const scpClient = await getScpClient(params);

  switch (actionType) {
    case "Download File":
      await scpClient.downloadFile(remotePath, localPath);
      break;
    case "Download Directory":
      await scpClient.downloadDir(remotePath, localPath);
      break;
    case "Upload File":
      await scpClient.uploadFile(localPath, remotePath);
      break;
    case "Upload Directory":
      await scpClient.uploadDir(localPath, remotePath);
      break;
    default:
      throw new Error("Unknown Action Type");
  }
}

module.exports = kaholoPluginLibrary.bootstrap({
  copy,
  createDirectory,
  move,
  deletePath,
  exists,
  scpAction,
});
