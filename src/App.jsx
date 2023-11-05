import { useState } from "react";
import BrowserHeader from "./components/BrowserHeader";
import Tc from "./components/Tc";
import ContractCompass from "./components/contractCompass";


function App() {
  const [displayApp, setDisplayApp] = useState(false);

  return (
    <div className="wrapper">
      <BrowserHeader setDisplayApp={setDisplayApp} />

      <Tc />
      {displayApp && <ContractCompass setDisplayApp={setDisplayApp} />}
    </div>
  );
}

export default App;
