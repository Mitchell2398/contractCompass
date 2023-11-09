import React, { useState } from "react";

export default function ContractCompass(props) {
  const [summary, setSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  function startSummaryFunc() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSummary(true);
    }, 4000);
  }

  function disableApp() {
    props.setDisplayApp(false);
  }

  window.onload = function onLoad() {
    progressBar = new ProgressBar.Circle("#progress", {
      color: "red",
      strokeWidth: 10,
      duration: 2000, // milliseconds
      easing: "easeInOut",
    });

    progressBar.animate(0.63); // percent
  };

  return (
    <div className="compass-container">
      <div className="compassHeader">
        <img
          src="https://res.cloudinary.com/dheko2ynz/image/upload/v1697996833/logo_v7wqti.png"
          className="logo"
        />
        <button className="close-btn" onClick={disableApp}>
          X
        </button>
      </div>

      <div className="compass-content">
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : !summary ? (
          <div className="introContainer">
            <p className="introText">
              Click start analysis to get a summary of the terms and conditions
              now
            </p>
            <button className="startSummaryBtn" onClick={startSummaryFunc}>
              Start Analysis
            </button>
          </div>
        ) : (
          <>
          
            <div className="summary-textbox">
              <h3>Here's what we found</h3>
              <ul>
                <li><strong>Vehicle Coverage Details:</strong> It's crucial to know exactly what your vehicle insurance covers as indicated in your policy schedule, covering damage, theft, and liability.</li>
                <li><strong>Premium Payment Obligations: </strong> Regular premium payments are required, and missing payments can lead to a severe penalty, <span className="highlight">increasing your policy premium by 200%</span></li>
                <li><strong>Exclusion Clauses:</strong> The policy includes some standard and one particularly odd exclusion; <span className="highlight">Any accident that happens after 5pm.</span> This unusual clause could have significant implications for claim validity.</li>
                <li><strong>Cancellation Terms:</strong> The contract's cancellation clause, which <span className="highlight">demands a kidney</span> is not just atypical but suggests a potentially serious issue with the contract's legality or intent.</li>
                <li><strong>Claims Process and Disputes:</strong>The process for notifying and processing claims is outlined, including the right of the company to investigate. In disputes over claim value, an independent appraisal may be necessary, which could lengthen the claims process.</li>
              </ul>
            </div>
            <div className="scoreWrapper">

              <div className="scoreContainer">
                <div className="score score3">70</div>
                <div className="percent">Clarity</div>
              </div>
              
              <div className="scoreContainer">
                <div className="score score1">40</div>
                <div className="percent">Fairness</div>
              </div>
              <div className="scoreContainer">
                <div className="score score2">0</div>
                <div className="percent">ESG</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
