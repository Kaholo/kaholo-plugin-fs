const fs = require("fs-extra");
const kaholoPluginLibrary = require("kaholo-plugin-library");
const { getScpClient } = require("./helpers");

function copy({
  source: sourcePath,
  destination: destinationPath,
  noOverwrite,
}) {
  const overwrite = !noOverwrite;

  return fs.copy(sourcePath, destinationPath, { overwrite });
}

async function createDirectory({
  path: directoryPath,
}) {
  const directoryExists = await fs.pathExists(directoryPath);

  if (!directoryExists) {
    await fs.mkdirs(directoryPath);
  }

  return directoryExists ? "Directory Already Exists" : "Directory Created";
}

function move({
  source: sourcePath,
  destination: destinationPath,
  noOverwrite,
}) {
  const overwrite = !noOverwrite;

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
