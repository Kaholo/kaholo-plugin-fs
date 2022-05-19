const fs = require("fs-extra");
const kaholoPluginLibrary = require("kaholo-plugin-library");
const { getScpClient } = require("./helpers");

function copy(params) {
  const sourcePath = params.source.trim();
  const destinationPath = params.destination.trim();
  const overwrite = !params.noOverwrite;

  return fs.copy(sourcePath, destinationPath, { overwrite });
}

function createDirectory(params) {
  const directoryPath = params.path.trim();

  return fs.mkdirs(directoryPath);
}

function move(params) {
  const sourcePath = params.source.trim();
  const destinationPath = params.destination.trim();
  const overwrite = !params.noOverwrite;

  return fs.move(sourcePath, destinationPath, { overwrite });
}

function deletePath(params) {
  const trimmedPath = params.path.trim();

  return fs.remove(trimmedPath);
}

function exists(params) {
  const trimmedPath = params.path.trim();

  return fs.pathExists(trimmedPath);
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
