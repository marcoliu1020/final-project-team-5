require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

const { API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;
const { INFURA_URL_rinkeby, INFURA_PK_rinkeby } = process.env;
const mainnetGwei = 21;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.6.7",
      },
    ],
  },
  
  networks: {
    // hardhat: {
    //   mining: {
    //     auto: false,
    //     interval: 1000
    //   }
    // },

    hh: {
      url: "http://127.0.0.1:8545",
    },

    localhost: {
      url: "http://127.0.0.1:7545",
    },
    
    rinkeby: {
      url: INFURA_URL_rinkeby,
      accounts: [INFURA_PK_rinkeby]
    },

    ropsten: {
      url: "https://ropsten.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/ropsten",// <---- YOUR MORALIS ID! (not limited to infura)
      accounts: {
        mnemonic: "",
      },
    },

    mainnet: {
      url: "https://mainnet.infura.io/v3/460f40a260564ac4a4f4b3fffb032dad", // <---- YOUR INFURA ID! (or it won't work)
      //      url: "https://speedy-nodes-nyc.moralis.io/XXXXXXXXXXXXXXXXXXXXXXXXX/eth/mainnet", // <---- YOUR MORALIS ID! (not limited to infura)
      gasPrice: mainnetGwei * 1000000000,
      accounts: {
        mnemonic: "",
      },
    },
  },
  
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  }
};
