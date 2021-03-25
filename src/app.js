let exec = require('child_process').exec;
let fs = require("fs");

async function copyPath(action){
    const source = (action.params.SOURCE || "").trim();
    const dest = (action.params.DESTINATION || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    const cmd = /^win/.test(process.platform) ? "copy" : "cp"; // check if windows or not
    return executeCMD(`${cmd} ${flags} ${source} ${dest}`);
}

async function createDirectory(action){
    const path = (action.params.PATH || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!path){
        throw "Path was not provided";
    }
    return executeCMD(`mkdir ${flags} ${path}`);
}

async function moveDirectory(action){
    const source = (action.params.SOURCE_PATH || "").trim();
    const dest = (action.params.DEST_PATH || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    return executeCMD(`mv ${flags} ${source} ${dest}`);
}

function deleteDirectory(action) {
    const path = (action.params.PATH || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!path){
        throw "Path was not provided";
    }
    const cmd = /^win/.test(process.platform) ? "rmdir" : "rm"; // check if os is windows
    return executeCMD(`${cmd} ${flags} ${path}`);
}

function pathExsits(action) {
    const path = (action.params.PATH || "").trim();
    if (!path){
        throw "Path was not provided";
    }
    return fs.existsSync(path);
}

// helpers

async function executeCMD(execString){
    console.log(execString);
    return new Promise((resolve, reject) => {
        exec(execString, function (error, stdout, stderr) {
            if (error || stderr) {
                console.log(error || stderr);
                return reject(error || stderr );
            }
            return resolve(stdout ? stdout : "Success");
        });
    });
}

module.exports = {
    copyPath: copyPath,
    createDirectory: createDirectory,
    moveDirectory: moveDirectory,
    deleteDirectory: deleteDirectory,
    exists: pathExsits
};