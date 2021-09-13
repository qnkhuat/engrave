import { FC } from "react";
import { Link } from "react-router-dom";

import Modal from "./Modal";
import { SupportedNetworks, switchNetwork } from "../lib/network";
import useModal from "../hooks/modal";
import { useEthersContext } from "../contexts/ethers";

const Layout: FC = ({ children }) => {
  const [ open, toggle ] = useModal(false);
  const { network } = useEthersContext();

  return (
    <>
      <div id="header" className="border-b border-black mb-4">
        <div className="container m-auto flex justify-between items-center h-16 font-bold">
          <div className="left">
            <Link to="/"><img alt="engrave logo" className="h-12" src="/logo.svg" /></Link>
          </div>
          <div className="right font-bold flex relative">
            <a className="pr-2 border-r-2 border-black" href="https://github.com/qnkhuat/engrave">GitHub</a>
            <Link className="px-2 border-r-2 border-black " to="/find">Find</Link>
            <a onClick={() => toggle(true)} className="pl-2 cursor-pointer" >Switch network ▼</a>
          </div>
        </div>
      </div>
      {children}
      <div id="footer" className="border-t mb-4 mt-8">
        <div className="container m-auto text-center text-sm mt-2">
          <div className="flex mt-4 my-2 justify-center items-center">
            <p>Hosting on </p><a className="ml-1" href="https://ipfs.io/" target="#"><img src="/IPFS_logo.png" /> </a>
          </div>
          <a href={`https://github.com/qnkhuat/engrave`}><span className="underline">Github</span></a>
          <p id="copy-right" className="text-gray-500 text-xs">© {new Date().getFullYear()} Engrave</p>
        </div>
      </div>
      <Modal open={open} onClose={() => toggle(false)}>

        <div className="bg-white p-4 flex flex-col space-y-2 rounded w-72">
          <p className="font-bold mb-4 text-center">Select network to switch</p>
          {SupportedNetworks.map(net =>  {
            const isConnected = net.toLowerCase() == network?.name.toLowerCase() ||
              (net.toLowerCase() == 'ethereum' && network?.name == "homestead");
            return <button 
              key={net}
              onClick={() => {if(!isConnected) switchNetwork(net)}} 
              className="text-white w-36 mx-auto p-2 mb-4 border rounded bg-blue-400 hover:bg-blue-500">{net}{ isConnected ? " (connected)" :"" }</button>
          })}
        </div>

      </Modal>
    </>
  )
}

export default Layout;
