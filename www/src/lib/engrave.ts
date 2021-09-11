import { ethers } from "ethers";
import { Network } from "./network";

// compile the engrave contracts tog et this
export const ABI = [
  "function add(bytes32 txHash)",
  "function getByAddress(address by, uint256 page, uint256 limit) view returns (bytes32[])",
  "function owner() view returns (address)"
];

// the contract address
export const ADDRESS = process.env.REACT_APP_ENGRAVE_ADDRESS;

export const getContractAddress = (network: string): string | undefined => {
  network = network.toLowerCase();
  switch (network) {
    case Network.Ropsten.toLowerCase(): 
      return process.env.REACT_APP_ENGRAVE_ADDRESS_ROPSTEN;

    case Network.Kovan.toLowerCase():
      return process.env.REACT_APP_ENGRAVE_ADDRESS_KOVAN;

    case Network.Goerli.toLowerCase():
      return process.env.REACT_APP_ENGRAVE_ADDRESS_GOERLI;

    case Network.Rinkeby.toLowerCase():
      return process.env.REACT_APP_ENGRAVE_ADDRESS_RINKEBY;

    case Network.Ethereum.toLowerCase():
      return process.env.REACT_APP_ENGRAVE_ADDRESS_ETHEREUM;

    default: return undefined;
  }
}

export const add = (provider: ethers.providers.Web3Provider, address: string, data: string): Promise<any> => {
  const signer = provider.getSigner();
  const engraveContract = new ethers.Contract(address, ABI, provider);
  console.log(signer.getAddress());
  return engraveContract.connect(signer).add(data);
}

export const getByAddress = (provider: ethers.providers.Web3Provider, address: string, by: string, page: number = 1, limit: number = 30) => {
  const engraveContract = new ethers.Contract(address, ABI, provider);
  return engraveContract.getByAddress(by, page, limit);
}
