const { use, expect } = require("chai");
const { ethers } = require("hardhat");
const chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised);

describe("Engrave", () => {
  let engrave, owner, addr1, addr2;
  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Engrave = await ethers.getContractFactory("Engrave");
    engrave = await Engrave.deploy();
    await engrave.deployed();
  });

  describe("write", () => {
    it("should be able to write non-empty string", async function () {
      const text = "engrave";
      const writeTx = await engrave.connect(addr1).write(text);
      await expect(writeTx.wait()).to.be.fulfilled;
    });

    it("should throw error if call with empty string", async function () {
      await expect(engrave.connect(addr1).write("")).to.be.rejectedWith(/text must be non-empty/);
    });

  });


  describe("getWritesByAddress", async () => {
    const numOfRequest = 5;
    const toAddTexts = Array.from(Array(numOfRequest).keys()).map((i) => `text ${i}`);
    beforeEach(async () => {
      const addr1Connect = await engrave.connect(addr1);
      const addr2Connect = await engrave.connect(addr2);

      for (const text of toAddTexts) {
        const tx = await addr1Connect.write(text)
        await tx.wait();

        // simulatneously add data using another address
        // to make sure the getwrites address only return 
        // text added by the required address
        const tx2 = await addr2Connect.write(text);
        await tx2.wait();
      }
    })

    it("should returns 2 arrays: texts, times", async function () {
      let [ texts, times ]= await engrave.getWritesByAddress(addr1.address, 1, 30);
      texts.forEach((text, i) =>  {
        expect(text).to.be.equal(toAddTexts[i]);
        expect(texts.length).to.equal(numOfRequest);
        // TODO: Add test for time because. It's a big number
      })
    });

    it("should return limit numbef of items if database contains more than that", async function () {
      const limit = 4;
      let [ texts, _ ]= await engrave.getWritesByAddress(addr1.address, 1, limit);
      expect(texts.length).to.equal(limit);
    });

    it("should return the correct elems if page is provided", async function () {
      const limit = 2;
      const page = 2;
      let [ texts, _ ]= await engrave.getWritesByAddress(addr1.address, page, limit);
      expect(texts.length).to.equal(limit);

      texts.forEach((text, i) => {
        expect(text).to.be.equal(toAddTexts[(page-1) * limit + i]);
      });
    });

    it("should throw error if limit is > 30", async function () {
      await expect(engrave.getWritesByAddress(addr1.address, 1, 31)).to.be.rejectedWith(/limit must be less than 30/);
    });

    it("should throw error if page < 1", async function () {
      await expect(engrave.getWritesByAddress(addr1.address, 0, 30)).to.be.rejectedWith(/page must be larger than 0/);
    });

  });
});
