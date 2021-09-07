pragma solidity ^0.8.0;


contract Engrave {

  struct Write {
    address writer;
    string text;
    uint time;
  }

  Write[] database;

  function write(string memory text) public {
    Write memory newWrite = Write({text: text, time: block.timestamp, writer: msg.sender });
    database.push(newWrite);
  }


  function getAllWrites() 
    public 
    view
    returns (address[] memory, string[] memory, uint[] memory) {
      address[] memory addrs = new address[](database.length);
      string[] memory texts = new string[](database.length);
      uint[] memory times = new uint[](database.length);

      for (uint i = 0; i < database.length; i++) {
        Write memory writeTemp = database[i];
        addrs[i] = writeTemp.writer;
        texts[i] = writeTemp.text;
        times[i] = writeTemp.time;
      }

      return (addrs, texts, times);
    }


  function getWritesByAddress(address from) 
    public 
    view
    returns (address[] memory, string[] memory, uint[] memory) {
      address[] memory addrs = new address[](database.length);
      string[] memory texts = new string[](database.length);
      uint[] memory times = new uint[](database.length);

      for (uint i = 0; i < database.length; i++) {
        Write memory writeTemp = database[i];
        if (writeTemp.writer == from) {
          addrs[i] = writeTemp.writer;
          texts[i] = writeTemp.text;
          times[i] = writeTemp.time;
        }
      }
      return (addrs, texts, times);
    }

}
