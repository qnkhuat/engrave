export enum Network {
  Ropsten = "Ropsten", 
    Kovan = "Kovan", 
    Rinkeby = "Rinkeby", 
    Goerli = "Goerli", 
    Ethereum = "Ethereum"
};

export const SupportedNetworks = [Network.Ethereum, Network.Ropsten, Network.Kovan, Network.Rinkeby, Network.Goerli];

export const MapNetworkToChainId = {
  Ropsten: "0x3",
  Kovan: "0x2A",
  Rinkeby: "0x4",
  Goerli: "0x5",
  Ethereum: "0x1",
}


export const switchNetwork = async (network: Network) => {
  const chainId = MapNetworkToChainId[network];
  await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{chainId}]});
  window.location.reload();
};

