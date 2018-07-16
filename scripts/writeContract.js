const Tx = require("ethereumjs-tx");
const web3 = require("../web3").web3;

require("dotenv").config();

const account1 = process.env.ACCOUNT1;
const account2 = process.env.ACCOUNT2;

const acct1_pvtKey = Buffer.from(process.env.ACCT1_PVT_KEY, "hex");

const contractAddress = process.env.CONTRACT_ADDRESS;

const contractAbi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ name: "_initialSupply", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_from", type: "address" },
      { indexed: true, name: "_to", type: "address" },
      { indexed: false, name: "_value", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_owner", type: "address" },
      { indexed: true, name: "_spender", type: "address" },
      { indexed: false, name: "_value", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_spender", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "_from", type: "address" },
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

const contract = new web3.eth.Contract(contractAbi, contractAddress);


(async () => {
  const acct1_tx_count = await web3.eth.getTransactionCount(account1);
  
  // 'to' is the smart contract address and 'data' should contain 
  // the function with proper arguments in hex that we should suppose to call 
  // on the contract to write a transaction on blockchain.

  const data = contract.methods.transfer(account2, 1000).encodeABI();

  const txObj = {
    nonce: web3.utils.toHex(acct1_tx_count),
    gasLimit: web3.utils.toHex(100000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: contractAddress,
    data: data
  };

  // Sign Transaction
  const tx = new Tx(txObj);
  tx.sign(acct1_pvtKey);
  const serializedTransaction = tx.serialize();
  const raw = "0x" + serializedTransaction.toString("hex");

  // Broadcast transaction
  const txHash = await web3.eth.sendSignedTransaction(raw);
  console.log("txHash :");
  console.log(txHash);

})();
