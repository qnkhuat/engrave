import React, { useEffect, useState, useCallback } from "react";
import Layout from "../components/Layout";
import Transaction from "../components/Transaction";
import { useEthersContext } from "../contexts/ethers";
import { RouteComponentProps } from "react-router-dom";
import { getByAddress } from "../lib/engrave";
import { isTransactionHash } from "../lib/transactions";
import { ethers } from "ethers";
import { formatHexString } from "../lib/util";

interface Params {
  hash?: string;
}

interface Props extends RouteComponentProps<Params> {}

const Find: React.FC<Props> = (props) => {
  const { hash } = props.match.params;
  const [ inputValue, setInputValue ] = useState(hash || "");
  const { provider } = useEthersContext();

  const [ txs, setTxs ] = useState<ethers.providers.TransactionResponse[]>([]);
  const [ error, setError ] = useState("");

  const handleFind = useCallback((query: string) => {
    console.log("query: ", query);
    if(!provider) return;
    setError("");
    setTxs([]); // reset

    const findTransaction = (txHash: string) => provider!.getTransaction(txHash).
      then((res) => {
        setTxs(lastState => [...lastState, res]);
      }).catch(() => {
        setError(`Not found any transactions for hash: ${txHash}`)
      });

    const findByAddress = async (address:string) => {
      try {
        const res: string[] = await getByAddress(provider!, address);

        if (res.length == 0) {
          setError(`Not found any transactions for address: ${address}`);
          return;
        }

        res.forEach((txHash: string) => {
          // ethers api limit 5 req/qs
          setTimeout(() => {
            findTransaction(txHash).catch(() => findTransaction(txHash));
          }, 200);
        })
      } catch (err) {
        setError(`Not found any transactions for address: ${address}`);
      }
    };

    const formattedQuery = formatHexString(query);

    if (isTransactionHash(formattedQuery)) {
      findTransaction(formattedQuery);
    } else { 
      findByAddress(formattedQuery);
    }
  }, [provider]);

  useEffect(() => {
    if( inputValue && inputValue.length > 0 ) handleFind(inputValue);
  }, [provider])


  return <Layout>
    <div className="container m-auto">
      <div className="border rounded pl-2 flex mb-4">
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
          placeholder="Tx hash or address" className="w-full outline-none" />
        <button onClick={() => handleFind(inputValue)}
          className="outline-none rounded p-2 ml-2 bg-blue-400 text-white">Find</button>
      </div>
      {txs.map( (tx) => <Transaction key={tx.hash} showTime tx={tx} className="mb-4"></Transaction>)}
      {error && <p>{error}</p>}
    </div>
  </Layout>
}

export default Find;
