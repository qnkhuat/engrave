import { useState, useEffect } from "react";

import { estimateTranasctionFee, engraveTranasction } from "../lib/transactions";
import { useEthersContext } from "../contexts/ethers";
import useModal from "../hooks/modal";

import { ReactComponent as AirplaneIcon } from "../components/icons/airplane.svg";
import AutoTextArea from "../components/AutoTextArea";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

const Home = () => {
  const { provider, gasPrice } = useEthersContext();
  const [ estimatedFee, setEstimatedFee ] = useState("0.0");
  const [ textInput, setTextInput ] = useState("");
  const [ open, toggle ] = useModal(false);

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
    <Layout>
      <div className="container m-auto">
        <div className="flex flex-col justify-center m-auto">
          <h3 className="text-xl font-bold text-center mb-6">Engrave words into ethereum chain</h3>
          <AutoTextArea placeholder="A thousand words" 
            rows={6}
            onChange={e => setTextInput(e.target.value)}
            className="w-full p-4 resize-none outline-none border-gray-200 border-2 rounded-md block m-auto"/>
          <div className="flex justify-between items-center pt-2">
            <p className="text-gray-500 text-sm pl-1">Estimated fee: {estimatedFee} ETH</p>
            <button className="flex justify-center items-center bg-gray-500 rounded-md p-2 text-white hover:bg-gray-600"
              onClick={handleEngrave}
            >
              <div className="inline-block transform rotate-90 inline-block mr-2">
                <AirplaneIcon/>
              </div> Engrave
            </button>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={toggle}>
        <div className="h-24 w-24 bg-white">
          <h3> Hi there</h3>
        </div>
      </Modal>
    </Layout>
  );
}

export default Home;
