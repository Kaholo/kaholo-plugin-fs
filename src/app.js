let exec = require('child_process').exec;
let fs = require("fs");
let q = require('q');

function executeCMD(action) {
    let deferred = q.defer();
    let execString = action.method.actionString;
    for (let i = 0; i < action.method.params.length; i++) {
        let param = action.method.params[i].name;
        if (action.params.hasOwnProperty(param)) {
            execString = execString.replace(param, action.params[param]);
        }
        else {
            execString = execString.replace(param, '');
        }
    }
    console.log(execString);
    exec(execString,
        function (error, stdout, stderr) {

            if (error || stderr) {
                console.log(stderr);
                return deferred.reject({ "error": stderr });
            }
            return deferred.resolve(stdout ? stdout : "Success");
        }
    );
    return deferred.promise;
}


function deleteDirectory(action) {
    let deferred = q.defer();
    let execString = action.method.actionString;
    for (let i = 0; i < action.method.params.length; i++) {
        let param = action.method.params[i].name;
        if (action.params.hasOwnProperty(param)) {
            execString = execString.replace(param, action.params[param]);
        }
        else {
            execString = execString.replace(param, '');
        }
    }
    // check if os is windows
    execString = /^win/.test(process.platform) ? "rmdir " + execString : "rm " + execString;
    exec(execString,
        function (error, stdout, stderr) {
            console.log(stdout);
            if (error || stderr) {
                console.log(stderr);
                return deferred.reject({ "error": stderr });
            }
            return deferred.resolve(stdout ? stdout : "Deleted directory");
        }
    );
    return deferred.promise;
}

function pathExsits(action) {
    return new Promise((resolve, reject) => {
        let path = action.params.PATH;
        fs.exists(path, function (exists) {
            return resolve({ "res": exists })
        });
    });
}


module.exports = {
    copyPath: executeCMD,
    createDirectory: executeCMD,
    moveDirectory: executeCMD,
    deleteDirectory: deleteDirectory,
    exists: pathExsits
};