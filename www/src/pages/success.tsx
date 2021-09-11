import React, { useState } from "react";
import { Link, RouteComponentProps } from "react-router-dom";

import useModal from "../hooks/modal";

import Layout from "../components/Layout";
import Modal from "../components/Modal";
import Message from "../components/message";
import { useEthersContext } from "../contexts/ethers";

import { add } from "../lib/engrave";

interface Params {
  txHash: string;
}

interface Props extends RouteComponentProps<Params> {}

const Success: React.FC<Props> = (props) => {
  const { txHash } = props.match.params;
  const [ open, toggle ] = useModal(true);
  const [ added, setAdded ] = useState(false);
  const { provider } = useEthersContext();

  const handleReject = () => {
    toggle(false);
  }

  const handleAccept = () => {
    if(provider) {
      add(provider, txHash).then(() => {
        setAdded(true);
        toggle(false);
      }).catch(alert);
    }
  }

  return <Layout>
    <div className="container m-auto">
      <img alt="hedgehog saying okay" src="/hedgehog.jpg" className="w-2/5 m-auto"/>
      <p>Your message has been queued to add to the chain!</p>
      <p>Check the status of your transaction <a className="alink" href={`https://etherscan.io/tx/${txHash}`}>here</a></p>
      <p>Once the transaction is succeed, you can view your message in the <strong>Input Data</strong> section</p>
      <p>Click <strong>View Input As</strong> {'>'} <strong>UTF-8</strong> to read your meassage</p>
      <button onClick={handleAccept} className={`border mt-4 p-2 rounded-lg bg-blue-400 text-white ${open || added ? 'hidden' : ''}`}>Add to Engrave database</button>
    </div>
    <Modal open={open} onClose={() => toggle(false)}>
      <Message messageType="success" className="w-96">
        <strong className="text-xl">Yes!</strong>
        <p>Do you want to add this message to <strong>Engrave</strong> database?</p>
        <p>By doing this you can easily find all the messages you added with your wallet address at our <Link className="alink" target="_blank" to="/find">Find</Link> page</p>
        <p>This is totally optional</p>
        <div className="w-full mt-4 flex justify-center">
          <button onClick={handleAccept} className="border p-2 mr-4 rounded-lg bg-blue-400 text-white">Okay</button>
          <button onClick={handleReject} className="border p-2 rounded-lg bg-red-400 text-white">No, Thanks</button>
        </div>
      </Message>
    </Modal>

  </Layout>
}

export default Success;
