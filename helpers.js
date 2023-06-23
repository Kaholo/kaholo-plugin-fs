const childProcess = require("child_process");
const util = require("util");
const { helpers } = require("@kaholo/plugin-library");

const exec = util.promisify(childProcess.exec);
const execFile = util.promisify(childProcess.execFile);

const SHRED_ITERATIONS = 5;
const LIST_ALL_FILES_COMMAND = "find $DIR_PATH -type f";

async function shredPath(path) {
  const filesToRemove = [];

  const pathInfo = await helpers.analyzePath(path);
  if (pathInfo.type === "directory") {
    const listedFiles = await exec(LIST_ALL_FILES_COMMAND, {
      env: {
        DIR_PATH: path,
      },
    }).then(({ stdout }) => stdout.trim().split("\n").filter(Boolean));

    filesToRemove.push(...listedFiles);
  } else {
    filesToRemove.push(path);
  }

  const args = ["-n", SHRED_ITERATIONS, "-f", "-z"].concat(filesToRemove);
  return execFile("shred", args);
}

module.exports = {
  shredPath,
};
