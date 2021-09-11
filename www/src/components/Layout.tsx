import { FC } from "react";
import { Link } from "react-router-dom";

const Layout: FC = ({ children }) => {
  return (
    <>
      <div id="header" className="border-b mb-4">
        <div className="container m-auto flex justify-between items-center h-16 font-bold">
          <div className="left">
            <Link to="/"><img alt="engrave logo" className="h-12" src="/logo.svg" /></Link>
          </div>
          <div className="right font-bold">
            <Link className="border-r-2 border-black pr-2" to="/find">Find</Link>
            <a className="pl-2" href="https://github.com/qnkhuat/engrave">GitHub</a>
          </div>
        </div>
      </div>
      {children}
      <div id="footer" className="border-t mb-4 mt-8">
        <div className="container m-auto text-center text-sm mt-2">
          <div className="flex mt-4 my-2 justify-center items-center">
            <p>Running on </p><a href="https://ipfs.io/" target="#"><img src="/IPFS_logo.png" /> </a>
          </div>
          <a href={`https://github.com/qnkhuat/engrave`}><span className="underline">Github</span></a>
          <p id="copy-right" className="text-gray-500 text-xs">© {new Date().getFullYear()} Engrave</p>
        </div>
      </div>
    </>
  )
}

export default Layout;
