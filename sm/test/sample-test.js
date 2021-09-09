const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Engrave", function () {
  let engrave, owner, addr1;
  beforeEach(async () => {
    [owner, addr1] = await ethers.getSigners();
    const Engrave = await ethers.getContractFactory("Engrave");
    engrave = await Engrave.deploy();
    await engrave.deployed();
  });

  it("should able to write text", async function () {
    await engrave.connect(addr1).write("What's up");
  });

  it("returns all texts wrote by address", async function () {
    const texts = ["text 1", "text 2"];
    texts.forEach(async (text) => await engrave.connect(addr1).write(text));
    
    await network.provider.send("evm_increaseTime", [3600])
    await network.provider.send("evm_mine")
    
    let result = await engrave.getWritesByAddress(addr1.address);
    expect(result).to.equal(texts);
  });

  it("returns all texts ever written in database", async function () {
    const texts = ["text 1", "text 2"];
    texts.forEach(async (text) => await engrave.connect(addr1).write(text));
    let result = await engrave.getAllWrites();
    expect(result).to.equal(texts);
  });

});
