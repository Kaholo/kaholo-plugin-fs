const fs = require("fs-extra");
const kaholoPluginLibrary = require("@kaholo/plugin-library");

const { shredPath } = require("./helpers");

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
  path: pathInfo,
  securely,
}) {
  if (securely) {
    await shredPath(pathInfo.absolutePath);
  }
  return fs.remove(pathInfo.absolutePath);
}

async function exists({ path }) {
  return { exists: await fs.pathExists(path) };
}

/**
 * @description This method is deprecated, SSH plugin should be used instead
 * @deprecated
 */
async function scpAction() {
  console.info("This action is deprecated. Please use the new SSH Plugin instead.");
  console.info("SSH Plugin: <a href=\"https://github.com/Kaholo/kaholo-plugin-ssh\">https://github.com/Kaholo/kaholo-plugin-ssh</a>");
  throw new Error("Method is deprecated");
}

module.exports = kaholoPluginLibrary.bootstrap({
  copy,
  createDirectory,
  move,
  deletePath,
  exists,
  scpAction,
});
