const { Client } = require("node-scp");
const fs = require("fs/promises");

/**
 * Builds SCP Client
 * @returns {Promise<ScpClient>}
*/
async function getScpClient(params) {
  const privateKey = params.privateKey || (
    params.keyPath && await fs.readFile(params.keyPath)
  );
  return Client({
    host: params.host,
    port: params.port ? parseInt(params.port, 10) : 22,
    username: params.username,
    privateKey,
    passphrase: params.passphrase,
  });
}

module.exports = {
  getScpClient,
};
