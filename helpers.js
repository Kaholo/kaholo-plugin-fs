const fs = require("fs/promises");
const ShredFile = require("shredfile");

const exec = require("util").promisify(require("child_process").exec);

const SHRED_ITERATIONS = 5;
const LOCATE_SHRED_BINARY_COMMAND = "which shred";
const LIST_ALL_FILES_COMMAND = "find $DIR_PATH -type f";

async function shredPath(path) {
  const shredBinaryPath = await exec(LOCATE_SHRED_BINARY_COMMAND).then(
    ({ stdout }) => stdout.trim(),
  );
  const shredder = new ShredFile({
    shredBinaryPath,
    force: true,
    iterations: SHRED_ITERATIONS,
  });

  const pathStat = await fs.lstat(path);

  if (pathStat.isDirectory()) {
    const filesList = await exec(LIST_ALL_FILES_COMMAND, {
      env: {
        DIR_PATH: path,
      },
    }).then(({ stdout }) => (
      stdout.trim().split("\n").filter(Boolean)
    ));

    return filesList.length ? shredder.shred(filesList) : true;
  }

  return shredder.shred(path);
}

module.exports = {
  shredPath,
};
