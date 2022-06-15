const fs = require("fs-extra");
const kaholoPluginLibrary = require("@kaholo/plugin-library");
const { getScpClient, shredPath } = require("./helpers");

function copy({
  source: sourcePath,
  destination: destinationPath,
  noOverwrite,
}) {
  return fs.copy(sourcePath, destinationPath, { overwrite: !noOverwrite });
}

async function createDirectory({
  path: directoryPath,
}) {
  const createdPath = await fs.mkdirs(directoryPath);

  return createdPath === undefined ? "Directory Already Exists" : "Directory Created";
}

function move({
  source: sourcePath,
  destination: destinationPath,
  overwrite,
}) {
  return fs
    .move(sourcePath, destinationPath, { overwrite })
    .catch((error) => {
      if (error.message === "dest already exists.") {
        throw new Error("Directory already exists and Overwrite disabled.");
      }
      throw error;
    });
}

async function deletePath({
  path,
  securely,
}) {
  const pathExists = await fs.pathExists(path);
  if (!pathExists) {
    return "Path does not exist";
  }

  if (securely) {
    await shredPath(path);
  }

  return fs.remove(path);
}

async function exists({ path }) {
  return { exists: await fs.pathExists(path) };
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
