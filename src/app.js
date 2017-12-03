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


let functions = {
    copyPath: executeCMD,
    createDirectory: executeCMD,
    moveDirectory: executeCMD,
    deleteDirectory: deleteDirectory,
    exists: pathExsits
};


function main(argv) {
    if (argv.length < 3) {
        console.log('{err: "not enough parameters"}');
        // Invalid Argument
        // Either an unknown option was specified, or an option requiring a value was provided without a value.
        process.exit(9);
    }
    let action = JSON.parse(argv[2]);
    functions[action.method.name](action).then(function (res) {
        console.log(res);
        process.exit(0); // Success
    }, function (err) {
        console.log("an error occured", err);
        // Uncaught Fatal Exception
        // There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.
        process.exit(1); // Failure
    });
}

main(process.argv);