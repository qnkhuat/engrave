/*
This contract is used to store all transactions hashes that used Engrave service to add messages to the ETH chain
*/
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Engrave {

  address public owner;
  mapping(address => bytes32[]) database;

  constructor(){
    owner = msg.sender;
  }

  function add(bytes32 txHash) public {
    require(txHash.length > 0, "txHash must be-non-zero");
    database[msg.sender].push(txHash);
  }

  function getByAddress(address by, uint page, uint limit)
    public
    view
    returns (bytes32[] memory) {
      require(page >= 1, "page must be larger than 0");
      require(limit <= 30, "limit must be less than 30");

      page = page - 1; // so users can use page start at 1

      uint startIndex = page * limit;
      if (startIndex >= database[by].length) {
        bytes32[] memory txs;
        return txs;
      } 

      uint numReturnValues = database[by].length - startIndex;
      if (numReturnValues > limit) {
        numReturnValues = limit;
      }

      bytes32[] memory txs = new bytes32[](numReturnValues);

      for (uint i = 0; i < numReturnValues; i++) {
        txs[i] = database[by][i + startIndex];
      }
      return txs;
    }

}
