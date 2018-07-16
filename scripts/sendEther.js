const Tx = require("ethereumjs-tx");
const web3 = require("../web3").web3;

require("dotenv").config();

const account1 = process.env.ACCOUNT1;
const account2 = process.env.ACCOUNT2;

// Buffer will convert private key to binary data
// which is required while signing and sending over network
const acct1_pvtKey = Buffer.from(process.env.ACCT1_PVT_KEY, 'hex');

// Send Transaction
(async () => {
  // Tx Count
  const acct1_tx_count = await web3.eth.getTransactionCount(account1);
  console.log(`Transaction count of Account 1 :: ${acct1_tx_count}`);

  // Build Transaction data (values should be in hexadecimal)
  const txObj = {
    nonce: web3.utils.toHex(acct1_tx_count),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
  }
  
  // Sign Transaction

  // Create Transaction
  const tx = new Tx(txObj);
  // Sign with acct1 pvt key so to know who is the sender
  tx.sign(acct1_pvtKey);

  // Serialize
  const serializedTransaction = tx.serialize();
  const raw = '0x' + serializedTransaction.toString('hex');

  // Broadcast transaction
  const txHash = await web3.eth.sendSignedTransaction(raw);
  console.log('txHash :');
  console.log(txHash);

})();


