import { EthersProvider } from "./contexts/ethers";
import Home from "./pages";
import Success from "./pages/success";
import Find from "./pages/find";
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <EthersProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/success/:txHash" render={(props) => <Success {...props}/>}></Route>
          <Route path="/find/:hash" render={(props) => <Find{...props}/>}></Route>
          <Route path="/find" render={(props) => <Find{...props}/>}></Route>
          <Route path="/" ><Home/></Route>
        </Switch>
      </BrowserRouter>
    </EthersProvider>
  );
}

export default App;
