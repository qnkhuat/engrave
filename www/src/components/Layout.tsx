import { FC } from "react";
import { Link } from "react-router-dom";

const Layout: FC = ({ children }) => {
  return (
    <>
      <div id="header" className="border-b mb-4">
        <div className="container m-auto flex justify-between items-center h-16 font-bold">
          <div className="left">
            <Link to="/"><img className="h-12" src="/logo.svg" /></Link>
          </div>
          <div className="right">
            <a className="font-bold" href="https://github.com/qnkhuat/engrave">GitHub</a>
          </div>
        </div>
      </div>
      {children}
      <div id="footer" className="border-t my-4">
        <div className="container m-auto text-center text-sm mt-2">
          <a href={`https://github.com/qnkhuat/engrave`}><span className="underline">Github</span></a>
          <br></br>
          <p id="copy-right" className="text-gray-500 text-xs">© {new Date().getFullYear()} Engrave</p>
        </div>
      </div>
    </>
  )

}

export default Layout;
