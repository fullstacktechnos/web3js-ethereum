const Web3 = require("web3");
require("dotenv").config();

const infura_url = `https://rinkeby.infura.io/${process.env.INFURA_APIKEY}`;

module.exports.web3 = new Web3(infura_url);
 
