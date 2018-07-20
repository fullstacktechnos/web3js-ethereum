const web3 = require("../web3").web3;

require("dotenv").config();

( async () => {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log(blockNumber);

    let blocknumber = 'latest';
    //let blocknumber = 5996993
    const block = await web3.eth.getBlock(blocknumber)
    console.log(block.hash);
    console.log(block.number);

    const blockTransCount = await web3.eth.getBlockTransactionCount(blocknumber);
    console.log(blockTransCount);

    const transData = await web3.eth.getTransactionFromBlock(block.hash, 2)
    console.log(transData)
  })();
