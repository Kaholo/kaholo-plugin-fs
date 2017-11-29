var exec = require('child_process').exec;
var q = require('q');

function executeCMD(action){
    var deferred = q.defer();
    var execString = action.method.actionString;
    for (var i =0; i< action.method.params.length;i++){
        var param = action.method.params[i].name;
        if (action.params.hasOwnProperty(param)) {
            execString = execString.replace(param, action.params[param]);
        }
        else{
            execString = execString.replace(param, '');
        }
    }
    console.log(execString);
    exec(execString,
        function(error, stdout, stderr){

            if(error || stderr){
                console.log(stderr);
                return deferred.reject({"error": stderr});
            }
            return deferred.resolve(stdout? stdout: "Success");
        }
    );
    return deferred.promise;
}


function deleteDirectory(action){
    var deferred = q.defer();
    var execString = action.method.actionString;
    for (var i =0; i< action.method.params.length;i++){
        var param = action.method.params[i].name;
        if (action.params.hasOwnProperty(param)) {
            execString = execString.replace(param, action.params[param]);
        }
        else{
            execString = execString.replace(param, '');
        }
    }
    // check if os is windows
    execString = /^win/.test(process.platform)? "rmdir " + execString: "rm " + execString;
    exec(execString,
        function(error, stdout, stderr){
            console.log(stdout);
            if(error || stderr){
                console.log(stderr);
                return deferred.reject({"error": stderr});
            }
            return deferred.resolve(stdout? stdout: "Deleted directory");
        }
    );
    return deferred.promise;
}


var functions = {
    copyPath: executeCMD,
    createDirectory: executeCMD,
    moveDirectory: executeCMD,
    deleteDirectory : deleteDirectory
}


function main(argv) {
    if (argv.length < 3) {
        console.log('{err: "not enough parameters"}');
        // Invalid Argument
        // Either an unknown option was specified, or an option requiring a value was provided without a value.
        process.exit(9);
    }
    var action = JSON.parse(argv[2]);
    functions[action.method.name](action).then(function(res) {
        console.log(res);
        process.exit(0); // Success
    }, function(err) {
        console.log("an error occured", err);
        // Uncaught Fatal Exception
        // There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.
        process.exit(1); // Failure
    });
}

main(process.argv);