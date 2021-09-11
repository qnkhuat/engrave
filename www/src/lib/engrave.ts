import { ethers } from "ethers";

// compile the engrave contracts tog et this
export const ABI = [
  "function add(bytes32 txHash)",
  "function getByAddress(address by, uint256 page, uint256 limit) view returns (bytes32[])",
  "function owner() view returns (address)"
];

// the contract address
export const ADDRESS = process.env.REACT_APP_ENGRAVE_ADDRESS;

export const add = (provider: ethers.providers.Web3Provider, data: string): Promise<any> => {
  if (!ADDRESS) throw new Error("Engrave contract address not found");
  const signer = provider.getSigner();
  const engraveContract = new ethers.Contract(ADDRESS, ABI, provider);
  console.log(signer.getAddress());
  return engraveContract.connect(signer).add(data);
}

export const getByAddress = (provider: ethers.providers.Web3Provider, by: string, page: number = 1, limit: number = 30) => {
  if (!ADDRESS) throw new Error("Engrave contract address not found");
  const engraveContract = new ethers.Contract(ADDRESS, ABI, provider);
  return engraveContract.getByAddress(by, page, limit);
}
