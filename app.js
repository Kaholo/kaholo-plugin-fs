const fs = require("fs-extra");
const kaholoPluginLibrary = require("kaholo-plugin-library");
const { getScpClient } = require("./helpers");

function copy(params) {
  const source = params.source.trim();
  const dest = params.destination.trim();
  const overwrite = !params.noOverwrite;

  return fs.copy(source, dest, { overwrite });
}

function createDirectory(params) {
  const path = params.path.trim();

  return fs.mkdirs(path);
}

function move(params) {
  const source = params.source.trim();
  const dest = params.destination.trim();
  const overwrite = !params.noOverwrite;

  return fs.move(source, dest, { overwrite });
}

function deletePath(params) {
  const path = params.path.trim();

  return fs.remove(path);
}

function exists(params) {
  const path = params.path.trim();

  return fs.pathExists(path);
}

async function scpAction(params) {
  const { actionType, localPath, remotePath } = params;
  const client = await getScpClient(params);

  switch (actionType) {
    case "Download File":
      await client.downloadFile(remotePath, localPath);
      return "Success";

    case "Download Directory":
      await client.downloadDir(remotePath, localPath);
      return "Success";

    case "Upload File":
      await client.uploadFile(localPath, remotePath);
      return "Success";

    case "Upload Directory":
      await client.uploadDir(localPath, remotePath);
      return "Success";

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
