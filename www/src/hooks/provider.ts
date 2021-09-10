import {  useState, useEffect } from "react";
import { ethers } from "ethers";

declare global {
  interface Window { ethereum: any; }
}

const useProvider = (): ethers.providers.Web3Provider | undefined => {
  const [ provider, setProvider ] = useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);

    tempProvider.on("network", (_, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        window.location.reload();
      };
    });

    setProvider(tempProvider);
  }, [window.ethereum]);
  return provider;
};

export default useProvider;

// A Web3Provider wraps a standard Web3 provider, which is
  // what Metamask injects as window.ethereum into each page
  //const provider = new ethers.providers.Web3Provider(window.ethereum);
  //provider.on("network", (_, oldNetwork) => {
  //  // When a Provider makes its initial connection, it emits a "network"
  //  // event with a null oldNetwork along with the newNetwork. So, if the
  //  // oldNetwork exists, it represents a changing network
  //  if (oldNetwork) {
  //    window.location.reload();
  //  }
  //});

  // The Metamask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  //const signer = provider.getSigner();

  //useEffect(() => {
  //  const abc = async () => {
  //    for (let i = 0; i < 100; i ++) {
  //      const txInfo = await provider.getTransaction("0x0b79e7e284424afec1aebc2eb66a500726c66236cb9683b415798e12ee465172");
  //      console.log(txInfo);
  //    }
  //    
  //    const daiAddress = "0x59a202b7F57182a4a6944276Be46288E0d112A63";
  //    const daiAbi = [
  //      "function getWritesByAddress(address by, uint256 page, uint256 limit) view returns (bytes32[])",
  //      "function owner() view returns (address)",
  //      "function write(bytes32 writeTx)"
  //    ]
  //    const daiContract = new ethers.Contract(daiAddress, daiAbi, provider);
  //    const daiWithSigner = daiContract.connect(signer);
  //    const signerAddress = await signer.getAddress();
  //    const tx = await signer.sendTransaction({
  //      to: signerAddress,
  //      value: ethers.utils.parseEther("0.0"),
  //      data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes("ngockq")),
  //    });
  //    console.log(tx);
  //    const writeResult = await daiWithSigner.write("0x0b79e7e284424afec1aebc2eb66a500726c66236cb9683b415798e12ee465172");
  //    console.log("Write result", writeResult);
  //    //try{  
  //    //  const res = await daiContract.getWritesByAddress(signer.getAddress(), 1, 30);
  //    //  console.log("REs ne: ", res);
  //    //} catch (err) {
  //    //  console.error(err);
  //    //}
  //  }
  //  abc();
  //  //
  //  //daiContract.getSenderWrites().then(console.log);
  //}, [])

