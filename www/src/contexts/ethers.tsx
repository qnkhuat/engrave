import React, { useState, useEffect, useContext }  from "react";
import { ethers } from "ethers";

declare global {
  interface Window { ethereum: any; }
}

interface EthersContextInterface {
  provider: ethers.providers.Web3Provider | undefined;
  gasPrice: ethers.BigNumber | undefined;
  network: ethers.providers.Network | undefined;
}

export const EthersContext = React.createContext<EthersContextInterface>({
  provider: undefined,
  gasPrice: undefined,
  network: undefined,
});

export const useEthersContext = () => useContext(EthersContext);

export const EthersProvider: React.FC = ({ children }) => {
  const [ provider, setProvider ] = useState<ethers.providers.Web3Provider>();
  const [ gasPrice, setGasPrice] = useState<ethers.BigNumber>();
  const [ network, setNetwork] = useState<ethers.providers.Network>();

  useEffect(() => {
    const initProvider = async () => {
      window.ethereum.enable();

      const tempProvider = new ethers.providers.Web3Provider(window.ethereum, "any");

      tempProvider.on("network", (_, oldnetwork) => {
        // when a provider makes its initial connection, it emits a "network"
        // event with a null oldnetwork along with the newnetwork. so, if the
        // oldnetwork exists, it represents a changing network
        if (oldnetwork) {
          window.location.reload();
        };

      });

      const tempNetwork = await tempProvider.getNetwork();
      setNetwork(tempNetwork);
      setProvider(tempProvider);
    }

    if (!provider && window.ethereum) {
      initProvider();
    }
  }, [window.ethereum]);

  // periodically update gas price
  useEffect(() => {
    if( provider ) {
      const loadGasPrice = () => {
        provider.getGasPrice().then(setGasPrice);
      }

      loadGasPrice();
      const loadGasPriceInterval = setInterval(() => {
        loadGasPrice();
      }, 15 * 1000);
      return () => clearInterval(loadGasPriceInterval);
    }
  }, [provider]);

  return (
    <EthersContext.Provider
      value={{
        provider,
          network,
          gasPrice
      }}>
      {children}
    </EthersContext.Provider>
  )
}
