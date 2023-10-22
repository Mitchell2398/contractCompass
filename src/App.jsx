import { useState } from "react";
import BrowserHeader from "./components/BrowserHeader";
import Tc from "./components/Tc";
import ContractCompass from "./components/contractCompass";

function App() {
  const [displayApp, setDisplayApp] = useState(false);

  return (
    <>
      <BrowserHeader setDisplayApp={setDisplayApp} />
      <div className="wrapper">
        <Tc />
        {displayApp && <ContractCompass setDisplayApp={setDisplayApp}  />}
      </div>
    </>
  );
}

export default App;
