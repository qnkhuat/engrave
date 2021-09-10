import { EthersProvider } from "./contexts/ethers";
import Home from "./pages";
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
          <Route path="/" ><Home/></Route>
        </Switch>
      </BrowserRouter>
    </EthersProvider>
  );
}

export default App;
