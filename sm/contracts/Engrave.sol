pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Engrave {

  struct Write {
    string text;
    uint time;
  }
  address owner;

  // 0.001834
  //Write[] public database;
  uint32 numOfWriters;
  mapping(address => uint32) public addressMapping;
  mapping(uint32 => Write[]) public database;

  constructor(){
    owner = msg.sender;
  }

  function _addNewWriter(address writer) private returns (uint32) {
    require(addressMapping[writer] == 0, "writer must not exsited in address mapping");
    numOfWriters += 1;
    uint32 writerIndex = numOfWriters;
    addressMapping[writer] = writerIndex;

    return writerIndex;
  }

  function write(string memory text) 
    public 
    {
      require(bytes(text).length > 0, "text must be non-empty");

      Write memory newWrite = Write({text: text, time: block.timestamp });

      uint32 writerIndex = addressMapping[msg.sender];
      if (writerIndex == 0) { 
        writerIndex = _addNewWriter(msg.sender);
      }
      //console.log("Adding: %d, %s", writerIndex, msg.sender);
      database[writerIndex].push(newWrite);
    }

  function getWritesByAddress(address from, uint page, uint limit)
    public
    view
    returns (string[] memory, uint[] memory) {
      require(page >= 1, "page must be larger than 0");
      require(limit <= 30, "limit must be less than 30");

      page = page - 1; // so users can use page start at 1

      uint32 writerIndex = addressMapping[from];

      uint startIndex = page * limit;
      if (writerIndex == 0 || startIndex >= database[writerIndex].length) {
        string[] memory texts;
        uint[] memory times;
        return (texts, times);
      } 

      uint numReturnValues = database[writerIndex].length - startIndex;
      if (numReturnValues > limit) {
        numReturnValues = limit;
      }

      string[] memory texts = new string[](numReturnValues);
      uint[] memory times = new uint[](numReturnValues);

      for (uint i = 0; i < numReturnValues ; i++) {
        texts[i] = database[writerIndex][i + startIndex].text;
        times[i] = database[writerIndex][i + startIndex].time;
      }

      return (texts, times);
    }

  // return the most recent writes
  //function getWrites(uint page, uint limit)
  //  public
  //  view
  //  returns (string[] memory, uint[] memory) {
  //    require(page >= 1, "page must be larger than 0");
  //    require(limit <= 30, "limit must be less than 30");

  //    page = page - 1; // so users can use page start at 1

  //    //uint writerIndex = addressMapping[from];
  //    
  //    uint startIndex = page * limit;
  //    if (writerIndex == 0 || startIndex >= database[writerIndex].length) {
  //      string[] memory texts;
  //      uint[] memory times;
  //      return (texts, times);
  //    } 

  //    uint numReturnValues = database[writerIndex].length - startIndex;
  //    if (numReturnValues > limit) {
  //      numReturnValues = limit;
  //    }

  //    string[] memory texts = new string[](numReturnValues);
  //    uint[] memory times = new uint[](numReturnValues);

  //    for (uint i = 0; i < numReturnValues ; i++) {
  //      texts[i] = database[writerIndex][i + startIndex].text;
  //      times[i] = database[writerIndex][i + startIndex].time;
  //    }

  //    return (texts, times);
  //  }



}
