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

/**
 * @description This method is deprecated, SSH plugin should be used instead
 * @deprecated
 */
async function scpAction() {
  console.info("This action is deprecated in favor of a new SSH Plugin, it's strongly advised to use it instead.");
  console.info("All parameters are still there, so no data is lost. You can use them the same way in the SSH Plugin.");
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
