import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { estimateTranasctionFee, engraveTranasction } from "../lib/transactions";
import { useEthersContext } from "../contexts/ethers";
import useModal from "../hooks/modal";

import { ReactComponent as AirplaneIcon } from "../components/icons/airplane.svg";
import AutoTextArea from "../components/AutoTextArea";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Message from "../components/message";


const Home = () => {
  const history = useHistory();
  const [ providerNotFoundModal, toggleProviderNotFoundModal ] = useModal(false);
  const { provider, gasPrice } = useEthersContext();
  const [ estimatedFee, setEstimatedFee ] = useState("0.0");
  const [ textInput, setTextInput ] = useState("");

  useEffect(() => {
    const checkProviderTimeout = setTimeout(() => {
      if(!provider) toggleProviderNotFoundModal(true);
    }, 1000);

    return () => clearTimeout(checkProviderTimeout);
  }, [provider]);


  // check input and calculate price to engrave into the chain
  useEffect(() => {
    const updatePriceEstimationTimeout = setTimeout(() => {
      if( textInput === "" ) {
        setEstimatedFee("0.0");
      } else if ( provider && gasPrice ){
        estimateTranasctionFee({provider, gasPrice, data:textInput, value:"0.0"})
          .then((price) => setEstimatedFee(price.slice(0, 7)))
          .catch(console.error);
      }
    }, 200);
    return () => clearTimeout(updatePriceEstimationTimeout);
  }, [textInput, gasPrice])

  const handleEngrave = () => {
    if (provider) {
      if(textInput == "") return;
      engraveTranasction({provider, data: textInput})
        .then((tx) => {
          history.push(`/success/${tx.hash}`);
        });
    } else {
      toggleProviderNotFoundModal(true);
    }
  }

  return (
    <Layout>
      <div className="container m-auto">
        <div className="flex flex-col justify-center m-auto">
          <h3 className="text-xl font-bold text-center mb-6">Engrave message into ethereum chain</h3>
          <AutoTextArea placeholder="A quote, a song lyric, a message you want to keep or ..." 
            rows={6}
            onChange={e => setTextInput(e.target.value)}
            className="w-full p-4 resize-none outline-none border-gray-200 border-2 rounded-md block m-auto"/>
          <div className="flex justify-between items-center pt-2">
            <p className="text-gray-500 text-sm pl-1">Estimated fee: {estimatedFee} ETH</p>
            <button className={`flex justify-center items-center rounded-md p-2 text-white 
              ${provider && textInput.length > 0 ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-400 hover:bg-gray-500'} `}
              onClick={handleEngrave}
            >
              <div className="inline-block transform rotate-90 inline-block mr-2">
                <AirplaneIcon/>
              </div> Engrave
            </button>
          </div>
        </div>
      </div>
      <Modal open={providerNotFoundModal} onClose={() => toggleProviderNotFoundModal(false)}>
        <Message messageType="error">
          <p>No provider was found!</p>
          <p>Please follow this <a className="alink" target="#" href="https://metamask.io/download.html">link</a> to install metamask</p>
        </Message>
      </Modal>
    </Layout>
  );
}

export default Home;
