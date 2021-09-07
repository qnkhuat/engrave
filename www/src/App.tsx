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


  const blockNumber = provider.getBlockNumber().then(console.log);
  // Send 1 ether to an ens name.
  const tx = signer.sendTransaction({
    to: "0x46F05f5f6AEBdE7413F094097f9800F07A7Ab610",
    value: ethers.utils.parseEther("1.0"),
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("yo wassup")),
  });
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
