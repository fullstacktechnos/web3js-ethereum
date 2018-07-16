const web3 = require("../web3").web3;
require("dotenv").config();

const account1 = process.env.ACCOUNT1;
const account2 = process.env.ACCOUNT2;

// Account Balance
(async() => {
  
  const acct1_balance = await web3.eth.getBalance(account1);
  console.log(`Account 1 balance => ${web3.utils.fromWei(acct1_balance, 'ether')} in Ether`);
  
  const acct2_balance = await web3.eth.getBalance(account2);
  console.log(`Account 2 balance => ${web3.utils.fromWei(acct2_balance, 'ether')} in Ether`);

})();