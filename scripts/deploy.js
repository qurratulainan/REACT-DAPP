const hre = require("hardhat");

async function main() {
  // Loads the compiled contract named "Message"
  const MessageFactory = await hre.ethers.getContractFactory("Message");

  // Deploys the contract to the blockchain
  console.log("Deploying contract...");
  messageContract = await MessageFactory.deploy();
  await messageContract.waitForDeployment();

  // Gets the deployed contract’s address
  const address = await messageContract.getAddress();
  console.log("Contract deployed to:", address);
}

// If there’s an error, logs it and exits
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
