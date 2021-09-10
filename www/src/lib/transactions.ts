import { ethers } from "ethers";

export const estimateTranasctionFee = async (provider: ethers.providers.Web3Provider, data: string, value: string): Promise<string> => {
  const gasPrice = await provider.getGasPrice();
  const estimatedGas = await provider?.estimateGas({
    to: "0xB2b54857e14C57dE8F9Ddb9fC92a1b8709159A0B", // a fake address that used to estimate only
    value: ethers.utils.parseEther(value),
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),

  });
  const transactionFee = gasPrice.mul(estimatedGas);
  return ethers.utils.formatUnits(transactionFee);
}

export const sendTransaction = (signer: ethers.Signer, to: string, data: string, value: string): Promise<ethers.Transaction> => {
  return signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(value),
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
  });
}

export const engraveTranasction = async (provider: ethers.providers.Web3Provider, data: string): Promise<ethers.Transaction> => {
  // send a 0 value tranasction to signer but has value
  const signer = provider.getSigner(); 
  const signerAddress = await signer.getAddress();
  console.log("signer address", signerAddress);
  return sendTransaction(signer, signerAddress, data, "0.0");
}
