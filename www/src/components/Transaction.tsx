import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useEthersContext } from "../contexts/ethers";
interface Props {
  tx: ethers.providers.TransactionResponse;
  showTime?: boolean;
  className?: string;
}

const Transaction: React.FC<Props> = ({ tx, showTime=false, className="" }) => {
  const [ time, setTime ] = useState<Date>();
  const { provider } = useEthersContext();

  useEffect(() => {
    if(provider && showTime && tx.blockNumber) {
      provider.getBlock(tx.blockNumber).then(res => setTime(new Date(res.timestamp * 1000)));
    }
  }, [tx, showTime]);

  return <div className={`text-sm ${className}`}>
    <p><strong>Sender: </strong> {tx.from}</p>
    <p><strong>Hash: </strong> {tx.hash}</p>
    <p><strong>Status: </strong> {tx.blockNumber ? "Success" : "Pending"}</p>
    {tx.blockNumber && <p><strong>Block:</strong> {tx.blockNumber}</p>}
    <p><strong>Etherscan: </strong> <a className="alink" target="#" href={`https://etherscan.io/tx/${tx.hash}`}>link</a></p>
    {time && <p><strong>Time:</strong> {time.toLocaleString()}</p>}
    <p><strong>Data: </strong></p><p className="whitespace-pre-line"> {ethers.utils.toUtf8String(tx.data)}</p>
  </div>
}

export default Transaction;
