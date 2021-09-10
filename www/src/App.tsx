import { EthersProvider } from "./contexts/ethers";
import Home from "./pages";

const App = () => {
  return (
    <EthersProvider>
      <Home/>
    </EthersProvider>
  );
}

export default App;
