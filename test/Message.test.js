const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Message Contract", function () {
  let MessageContract, messageContract, owner, addr1, addr2;

  beforeEach(async function () {
    MessageContract = await ethers.getContractFactory("Message");
    [owner, addr1, addr2] = await ethers.getSigners();
    messageContract = await MessageContract.deploy();
    await messageContract.waitForDeployment();
  });

  it("should set and get a message for the sender", async function () {
    const message = "Hello from owner!";
    await messageContract.setMessage(message);
    expect(await messageContract.getMessage()).to.equal(message);
  });

  it("should store messages per address", async function () {
    await messageContract.connect(addr1).setMessage("Message 1");
    await messageContract.connect(addr2).setMessage("Message 2");

    const msg1 = await messageContract.connect(addr1).getMessage();
    const msg2 = await messageContract.connect(addr2).getMessage();

    expect(msg1).to.equal("Message 1");
    expect(msg2).to.equal("Message 2");
  });

  it("should emit MessageUpdated event when a message is set", async function () {
    await expect(messageContract.setMessage("Event Test"))
      .to.emit(messageContract, "MessageUpdated")
      .withArgs(owner.address, "Event Test");
  });
});
