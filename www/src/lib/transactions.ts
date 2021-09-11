import { ethers } from "ethers";

export const estimateTranasctionFee = async (
  { provider, gasPrice, data, value } : 
  { provider: ethers.providers.Provider, 
    gasPrice: ethers.BigNumber, 
    data: string, 
    value: string
  }): Promise<string> => {
  const estimatedGas = await provider.estimateGas({
    to: "0xB2b54857e14C57dE8F9Ddb9fC92a1b8709159A0B", // a fake address that used to estimate only
    value: ethers.utils.parseEther(value),
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
  });
  const transactionFee = gasPrice.mul(estimatedGas);
  return ethers.utils.formatUnits(transactionFee);
}

export const sendTransaction = (
  { signer, to, data, value } :
  { signer: ethers.Signer, 
    to: string, 
    data: string, 
    value: string }): Promise<ethers.Transaction> => {
  return signer.sendTransaction({
    to: to,
    value: ethers.utils.parseEther(value),
    data: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(data)),
  });
}

export const engraveTranasction = async ({provider, data} : {provider: ethers.providers.Web3Provider, data: string}) => {
  data = data.trim();
  const signer = provider.getSigner(); 
  const signerAddress = await signer.getAddress();
  return sendTransaction({signer, to:signerAddress, data, value: "0.0"});
}

export const getTransaction = async () => {

}

export const isTransactionHash = (txHash: string): boolean => {
  if (txHash.startsWith("0x")) return txHash.length == 66;
  else return txHash.length == 64;
}


