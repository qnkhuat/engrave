import React from "react";

interface Props {
  txHash: string;
}

const EngraveSuccess: React.FC<Props> = ({ txHash }) => {
  return <div className="bg-white">
    <p>Your message has been queued to add to the chain</p>
    <p>Check the status of your process <a className="alink" href={`https://etherscan.io/tx/${txHash}`}>here</a></p>
    <p>Once the transaction is sucess, you can view your message in the <strong>Input Data</strong> data section</p>
    <p>Click <strong>View Input As</strong> `{'>'}`<strong>UTF-8</strong> to read your meassage</p>
    <p>{txHash}</p>
  </div>

}

export default EngraveSuccess;
