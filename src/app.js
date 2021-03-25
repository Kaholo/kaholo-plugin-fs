const exec = require('child_process').exec;
const fs = require("fs");

async function copyPath(action){
    let source = (action.params.SOURCE || "").trim();
    let dest = (action.params.DESTINATION || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    let cmd = "";
    if (/^win/.test(process.platform)){ // check if OS is Windows
        source = source.replace(/\//g, "\\");
        dest = dest.replace(/\//g, "\\");
        cmd = "copy";
    }
    else {
        cmd = "cp";
    }
    return executeCMD(cmd, [flags, source, dest]);
}

async function createDirectory(action){
    let path = (action.params.PATH || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!path){ 
        throw "Path was not provided";
    }
    if (/^win/.test(process.platform)){ // check if OS is Windows
        path = path.replace(/\//g, "\\");
    }
    return executeCMD("mkdir", [flags, path]);
}

async function moveDirectory(action){
    let source = (action.params.SOURCE_PATH || "").trim();
    let dest = (action.params.DEST_PATH || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    let cmd = "";
    if (/^win/.test(process.platform)){ // check if OS is Windows
        source = source.replace(/\//g, "\\");
        dest = dest.replace(/\//g, "\\");
        cmd = "move";
    }
    else {
        cmd = "mv";
    }
    return executeCMD(cmd, [flags, source, dest]);
}

function deleteDirectory(action) {
    let path = (action.params.PATH || "").trim();
    const flags = (action.params.FLAGS || "").trim();
    if (!path){
        throw "Path was not provided";
    }
    let cmd = "";
    if (/^win/.test(process.platform)){ // check if OS is Windows
        path = path.replace(/\//g, "\\");
        cmd = "rmdir";
    }
    else {
        cmd = "rm";
    }
    return executeCMD(cmd, [flags, path]);
}

function pathExsits(action) {
    let path = (action.params.PATH || "").trim();
    if (!path){
        throw "Path was not provided";
    }
    if (/^win/.test(process.platform)){ // check if OS is Windows
        path = path.replace(/\//g, "\\");
    }
    return new Promise((resolve, reject) => {
        fs.access(path, (err) => {
            if (err) return resolve(false);
            return resolve(true);
        });
    });
}

// helpers

async function executeCMD(cmd, params){
    const execString = `${cmd} ${params.filter((p) => p).join(" ")}`;
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