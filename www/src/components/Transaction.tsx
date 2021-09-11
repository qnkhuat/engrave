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

  console.log(ethers.utils.toUtf8String(tx.data));
  return <div className={`text-sm ${className}`}>
    <p><strong>Hash:</strong> {tx.hash}</p>
    <p><strong>Data:</strong></p><p className="whitespace-pre-line"> {ethers.utils.toUtf8String(tx.data)}</p>
    {time && <p><strong>Time:</strong> {time.toLocaleString()}</p>}
  </div>
}

export default Transaction;
