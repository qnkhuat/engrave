pragma solidity ^0.8.0;


contract Engrave {

  struct Write {
    address writer;
    string text;
    uint time;
  }

  // 0.001834
  Write[] public database;
  address owner;

  constructor(){
    owner = msg.sender;
  }

  function write(string memory text) 
    public 
    returns (Write memory){

      Write memory newWrite = Write({text: text, time: block.timestamp, writer: msg.sender });
      database.push(newWrite);
      return newWrite;
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

  function getWritesByAddress(address from, uint8 limit, uint8 page)
    public
    view
    returns (address[] memory, string[] memory, uint[] memory) {
      require(limit < 30, "limit has to be less than 30");

      address[] memory addrs = new address[](database.length);
      string[] memory texts = new string[](database.length);
      uint[] memory times = new uint[](database.length);

      for (uint i = page*limit; i < database.length; i++) {
        if (i > (page + 1 ) * limit) {
          break;
        }
        Write memory writeTemp = database[i];
        if (writeTemp.writer == from) {
          addrs[i] = writeTemp.writer;
          texts[i] = writeTemp.text;
          times[i] = writeTemp.time;
        }
      }
      return (addrs, texts, times);
    }

  //function resetDatabase(uint16 keep) public {
  //  require(msg.sender == owner, "only owner is allowed to reset database");
  //  if (keep < database.length) {
  //    Write[] memory newDatabase = database[database.length - keep : database.length];
  //    database = newDatabase;
  //  }
  //}

}
