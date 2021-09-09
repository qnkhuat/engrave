const { use, expect } = require("chai");
const { ethers } = require("hardhat");
const chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised);

describe("Engrave", () => {
  let engrave, owner, addr1, addr2, addr3;
  // Fake a tx hash of transaction
  const writeTxSample1 = "0x5fc43f123ebb03d4e89396e59acb19957eb898a47a406890c43fb33be6732432";
  const writeTxSample2 = "0x328323123ebb03d4e89396e59acb19957eb898a47a406890c43fb33be6732c3a";
  beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    const Engrave = await ethers.getContractFactory("Engrave");
    engrave = await Engrave.deploy();
    await engrave.deployed();
  });

  describe("write", () => {
    it("should be able to write if input is a correct hash", async function () {
      const writeTx = await engrave.connect(addr1).write(writeTxSample1);
      await expect(writeTx.wait()).to.be.fulfilled;
    });

    it("should throw error if call with incorrect hash", async function () {
      await expect(engrave.connect(addr1).write("0x")).to.be.rejectedWith(Error);
    });

  });


  describe("getWritesByAddress", async () => {
    const numOfRequest = 5;
    beforeEach(async () => {
      const addr1Connect = await engrave.connect(addr1);
      const addr2Connect = await engrave.connect(addr2);

      for (let i = 0; i < numOfRequest; i ++) {
        const tx = await addr1Connect.write(writeTxSample1);
        await tx.wait();

        // simulatneously add data using another address
        // to make sure the getwrites address only return 
        // text added by the required address
        const tx2 = await addr2Connect.write(writeTxSample2);
        await tx2.wait();
      }
    })

    it("should returns the right tx hashes for the right address", async function () {
      let txs = await engrave.getWritesByAddress(addr1.address, 1, 30);

      txs.forEach((tx) =>  {
        expect(tx).to.be.equal(writeTxSample1);
      });

      let txs2 = await engrave.getWritesByAddress(addr2.address, 1, 30);

      txs2.forEach((tx) =>  {
        expect(tx).to.be.equal(writeTxSample2);
      })

    });

    it("should returns an emtpy array when address is not exist in database", async function () {
      let txs = await engrave.getWritesByAddress(addr3.address, 1, 30);

      expect(txs.length).to.be.equal(0);
      
    });


    it("should return limit numbef of items if database contains more than that", async function () {
      const limit = 4;
      let txs = await engrave.getWritesByAddress(addr1.address, 1, limit);
      expect(txs.length).to.equal(limit);
    });

    it("should return the correct elems if page is provided", async function () {
      const limit = 2;
      const page = 2;
      let txs = await engrave.getWritesByAddress(addr1.address, page, limit);
      expect(txs.length).to.equal(limit);
    });

    it("should throw error if limit is > 30", async function () {
      await expect(engrave.getWritesByAddress(addr1.address, 1, 31)).to.be.rejectedWith(/limit must be less than 30/);
    });

    it("should throw error if page < 1", async function () {
      await expect(engrave.getWritesByAddress(addr1.address, 0, 30)).to.be.rejectedWith(/page must be larger than 0/);
    });

  });
});
