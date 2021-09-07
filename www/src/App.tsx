import { useEffect } from "react";
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";

declare global {
  interface Window { ethereum: any; }
}

const App = () => {

  // A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // The Metamask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();

  useEffect(() => {

    //signer.getAddress().then(addr => signer.sendTransaction({
    //  to: addr,
    //  value: ethers.utils.parseEther("0.0"),
    //  data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("yo wassupfsdddddfjsdklfjsdklfjsdklfjlsdkjflsdkjflsdkjfklsdj fklj fjsdl kfjsdklf jsdklf jsdkl fklsdaj fklj afkladjflk sadjklfsdjfkljsdak jfsdkljf lsdjfksd jfklasj fkljsd fkljdsa klfd")),
    //}).then(console.log));

  }, [])



  useEffect(() => {
    const abc = async () => {
      const daiAddress = "0x9cc28ef5c0FA1e332F464A84A31fD6398d4b33Fe";
      const daiAbi = [
        "function getAllWrites() view returns (address[], string[], uint256[])",
        "function getWriteByAddress(address from) view returns (address[], string[], uint256[])",
        "function write(string text)"
      ];
      const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);

      const daiWithSigner = daiContract.connect(signer);
      //await daiWithSigner.write("ngockq");
      const res = await daiContract.getAllWrites();

      console.log("RES ne: ", res);
    }
    abc();
    //
    //daiContract.getSenderWrites().then(console.log);

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
