import { useState, useEffect } from "react";

import { useEthersContext, EthersProvider } from "../contexts/ethers";
import { estimateTranasctionFee, engraveTranasction } from "../lib/transactions";

import AutoTextArea from "../components/AutoTextArea";
import { ReactComponent as AirplaneIcon }from "../components/icons/airplane.svg";

const Home = () => {
  const { provider, gasPrice } = useEthersContext();
  const [ estimatedFee, setEstimatedFee ] = useState("0.0");
  const [ textInput, setTextInput ] = useState("");

  useEffect(() => {
    const updatePriceEstimationTimeout = setTimeout(() => {
      if( textInput == "" ) {
        setEstimatedFee("0.0");
      } else if ( provider && gasPrice ){
        estimateTranasctionFee({provider, gasPrice, data:textInput, value:"0.0"})
          .then((price) => setEstimatedFee(price.slice(0, 7)))
          .catch(console.error);
      }
    }, 200);
    return () => clearTimeout(updatePriceEstimationTimeout);
  }, [textInput])

  const handleEngrave = () => {
    if (provider) {
      const tx = engraveTranasction({provider, data: textInput})
        .then(() => alert("succeed"))
        .catch(alert);
    } 
  }

  return (
    <EthersProvider>
      <div className="container m-auto">
        <div id="navbar">
        </div>
        <div className="flex flex-col justify-center w-4/5 max-w-2xl m-auto">
          <h3 className="text-xl font-bold text-center my-12">Engrave words into ethereum chain</h3>
          <AutoTextArea placeholder="A thousand words" 
            rows={5}
            onChange={e => setTextInput(e.target.value)}
            className="w-full p-4 resize-none outline-none border-gray-200 border-2 rounded-md block m-auto"/>
          <div className="flex justify-between items-center pt-2">
            <p className="text-gray-500 text-sm pl-1">Estimated transaction's fee: {estimatedFee} ETH</p>
            <button className="flex justify-center items-center bg-gray-500 rounded-md p-2 text-white hover:bg-gray-600"
              onClick={handleEngrave}
            >
              <div className="inline-block transform rotate-90 inline-block mr-2">
                <AirplaneIcon/>
              </div> Send
            </button>
          </div>
        </div>
      </div>
    </EthersProvider>
  );
}

export default Home;
