const hre = require("hardhat");

async function main() {
  // deployer
  // const deployer = await hre.ethers.getSigner();
  // console.log("Deployer's account:", deployer.address);
  // console.log("=====================================");

  // deploy TestERC20 contract
  const contractName = "TestERC20";
  const factory = await hre.ethers.getContractFactory(contractName);
  const contractTestERC20 = await factory.deploy();
  await contractTestERC20.deployed();
  // deploy TestERC721 contract
  const contractName_1 = "TestERC721";
  const factory_0 = await hre.ethers.getContractFactory(contractName_1);
  const contractTestERC721 = await factory_0.deploy();
  await contractTestERC721.deployed();
  // deploy TestStaking contract
  const contractName_2 = "TestStaking";
  const factory_1 = await hre.ethers.getContractFactory(contractName_2);
  const contractTestStaking = await factory_1.deploy(
                                                contractTestERC20.address,
                                                contractTestERC721.address,
                                                // "0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06", // NFT contract
  );
  await contractTestStaking.deployed();

  // TX hash
  console.log("TX hash");
  console.log("TestERC20   TX hash:", contractTestERC20.deployTransaction.hash);
  console.log("TestERC721  TX hash:", contractTestER721.deployTransaction.hash);
  console.log("TestStaking TX hash:", contractTestStaking.deployTransaction.hash);
  console.log("=====================================");
  // contract aadress
  console.log("contract aadress");
  console.log(contractName + " deployed to:", contractTestERC20.address);
  console.log(contractName_1 + " deployed to:", contractTestERC721.address);
  console.log(contractName_2 + " deployed to:", contractTestStaking.address);
  console.log("=====================================");

  // deployer transfer tokens to "MyTokenSale" contract
  await contractTestERC20.transfer(contractTestStaking.address, 1000000);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
