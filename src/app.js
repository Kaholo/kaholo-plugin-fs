const fs = require('fs-extra');

async function copy(action){
    const source = (action.params.source || "").trim();
    const dest = (action.params.destination || "").trim();
    const overwrite = !action.params.noOverwrite;
    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    return fs.copySync(source, dest, { overwrite : overwrite });
}

async function createDirectory(action){
    const path = (action.params.path || "").trim();
    return fs.mkdirsSync(path);
}

async function move(action){
    const source = (action.params.source || "").trim();
    const dest = (action.params.destination || "").trim();
    const overwrite = !action.params.noOverwrite;

    if (!source || !dest){
        throw "Either Source or Destination was not provided";
    }
    return fs.moveSync(source, dest, { overwrite : overwrite });
}

async function deletePath(action) {
    const path = (action.params.path || "").trim();
    return fs.removeSync(path);
}

async function exists(action) {
    const path = (action.params.path || "").trim();
    return fs.pathExistsSync(path);
}

module.exports = {
    copy,
    createDirectory,
    move,
    deletePath,
    exists
};