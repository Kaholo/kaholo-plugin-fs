const { Client: ScpClient } = require("node-scp");
const fs = require("fs/promises");

async function getScpClient(params) {
  const privateKey = params.privateKey || (
    params.keyPath && await fs.readFile(params.keyPath)
  );

  return ScpClient({
    host: params.host,
    port: params.port,
    username: params.username,
    privateKey,
    passphrase: params.passphrase,
  });
}

module.exports = {
  getScpClient,
};
