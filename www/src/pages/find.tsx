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
    if(!provider) return;
    setError("");
    setTxs([]); // reset

    const findTransaction = (txHash: string) => provider!.getTransaction(txHash).
      then((res) => {
        setTxs(lastState => [...lastState, res]);
      }).catch(() => {
        setError(`Transactions not found for hash: ${txHash}`)
      });

    const findByAddress = async (address:string) => {
      try {
        const res: string[] = await getByAddress(provider!, address);

        if (res.length == 0) {
          setError(`Transactions not found for address: ${address}`);
          return;
        }

        res.forEach((txHash: string) => {
          // ethers api limit 5 req/qs
          setTimeout(() => {
            findTransaction(txHash).catch(() => findTransaction(txHash));
          }, 200);
        })
      } catch (err) {
        setError(`Transactions not found for address: ${address}`);
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
    if( provider && inputValue && inputValue.length > 0 ) {
      const findTimeout = setTimeout(() => {
       handleFind(inputValue);
      }, 200);
      return () => clearTimeout(findTimeout);
    }
  }, [provider, inputValue]);

  return <Layout>
    <div className="container m-auto">
      <p className="font-bold text-center text-lg mb-4">Find the messages you added to the chain</p>
      <div className="rounded border pl-2 flex mb-4 overflow-hidden">
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}
          placeholder="Wallet address or transaction hash" className="w-full outline-none"/>
        <button onClick={() => handleFind(inputValue)}
          className="outline-none rounded-r px-4 py-2 ml-2 bg-blue-400 text-white">Find</button>
      </div>
      {txs.map( (tx) => <Transaction key={tx.hash} showTime tx={tx} className="mb-4 border-b pb-4"></Transaction>)}
      {error && <p>{error}</p>}
    </div>
  </Layout>
}

export default Find;
