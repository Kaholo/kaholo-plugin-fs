const { Client, ScpClient } = require('node-scp');

/***
 * @returns {Promise<ScpClient>} Builds SCP Client
 ***/
async function getScpClient(params){
    const privateKey =  params.privateKey || (params.keyPath ? 
                        fs.readFileSync(params.keyPath) : undefined);
    return Client({
        host: params.host,
        port: 22,
        username: params.username,
        privateKey: privateKey,
        passphrase: params.passphrase,
    });
}

module.exports = {
    getScpClient
};