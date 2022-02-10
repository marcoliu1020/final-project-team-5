const hre = require("hardhat");

async function main() {

  // deploy TestERC20 contract
  const contractName = "TestERC20";
  const factory = await hre.ethers.getContractFactory(contractName);
  const contractTestERC20 = await factory.deploy();
  await contractTestERC20.deployed();
  // deploy TestStaking contract
  const contractName_2 = "TestStaking";
  const factory_1 = await hre.ethers.getContractFactory(contractName_2);
  const contractTestStaking = await factory_1.deploy(
                                                contractTestERC20.address,
                                                "0x01d5b5044c5c6a97e071c5753fb7b6d40949cc06", // NFT contract
  );
  await contractTestStaking.deployed();

  console.log("contract aadress");
  console.log(contractName + " deployed to:", contractTestERC20.address);
  // console.log(contractName_1 + " deployed to:", contractTestERC721.address);
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
