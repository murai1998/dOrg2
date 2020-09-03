const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    // develop: {
    //   port: 8545
    // }
    development: {
      host: "xdai.poanetwork.dev",

      network_id: "*" // Match any network id
    }
  }
};
