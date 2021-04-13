const fs = require('fs-extra');

async function copy(action){
    const source = (action.params.source || "").trim();
    const dest = (action.params.destination || "").trim();
    const overwrite = !action.params.noOverwrite;
    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    return fs.copy(source, dest, { overwrite : overwrite });
}

async function createDirectory(action){
    const path = (action.params.path || "").trim();
    return fs.mkdirs(path);
}

async function move(action){
    const source = (action.params.source || "").trim();
    const dest = (action.params.destination || "").trim();
    const overwrite = !action.params.noOverwrite;

    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    return fs.move(source, dest, { overwrite : overwrite });
}

async function deletePath(action) {
    const path = (action.params.path || "").trim();
    return fs.remove(path);
}

async function exists(action) {
    const path = (action.params.path || "").trim();
    return fs.pathExists(path);
}

module.exports = {
    copy,
    createDirectory,
    move,
    deletePath,
    exists
};