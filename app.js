const fs = require('fs-extra');
const { getScpClient } = require("./helpers");

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

async function scpAction(action){
    const {actionType, localPath, remotePath} = action.params;
    if (!actionType || !localPath || !remotePath) throw "Missing one of the required parameters";
    const client = await getScpClient(action.params);
    switch (actionType){
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
            throw "Unknown Action Type";
    }
}

module.exports = {
    copy,
    createDirectory,
    move,
    deletePath,
    exists,
    scpAction
};