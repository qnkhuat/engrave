import React, { useState, useEffect, useContext }  from "react";
import { ethers } from "ethers";

declare global {
  interface Window { ethereum: any; }
}

interface EthersContextInterface {
  provider: ethers.providers.Web3Provider | undefined;
  gasPrice: ethers.BigNumber | undefined;
}

export const EthersContext = React.createContext<EthersContextInterface>({
  provider: undefined,
  gasPrice: undefined,

});

export const useEthersContext = () => useContext(EthersContext);

export const EthersProvider: React.FC = ({ children }) => {
  const [ provider, setProvider ] = useState<ethers.providers.Web3Provider>();
  const [ gasPrice, setGasPrice] = useState<ethers.BigNumber>();

  useEffect(() => {
    const init = async () => {
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

      setProvider(tempProvider);

      const tempGasPrice = await tempProvider.getGasPrice();
      setGasPrice(tempGasPrice);
    }

    if (!provider && window.ethereum) {
      init();
    }
  }, [window.ethereum]);

  return (
    <EthersContext.Provider
      value={{
        provider,
          gasPrice
      }}>
      {children}
    </EthersContext.Provider>
  )
}
