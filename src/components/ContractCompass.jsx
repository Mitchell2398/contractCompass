import React, { useState } from "react";
import OpenAI from "openai";
import { prompt } from "../promt";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ContractCompass(props) {
  const [startSummary, setStartSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [analysis, setAnalysis] = useState([]);

  function startSummaryFunc() {
    setStartSummary(true);
    generateRequest();
  }
  async function generateRequest() {
    console.log("function running");
    if (!openai.apiKey) {
      window.alert(
        "OpenAI API key not configured, please follow instructions in README.md"
      );
      return;
    }

    try {
      setIsLoading(true);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You need to highlight key information in terms and conditions, especially about cancellation policies, hidden fees, or anything financially impactful. Also include a 'unusal polices section' at the end for any unsual terms that aren't normally in terms and conditions for example a large increase in policy or nedding to give up an organ in order to cancel. Make the summary is concise.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 350,
      });

      const summary = response.choices[0].message.content;

      // Process and format the summary
      const formatSummary = summary
        .split("\n")
        .filter((point) => point.trim() !== "");

      setAnalysis(formatSummary);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error with OpenAI API request: ${error.message}`);
      setIsLoading(false);
      throw error;
    }
  }

  function disableApp() {
    props.setDisplayApp(false);
  }

  const renderAnalysis = analysis.map((text, index) => (
    <li key={index}>{text}</li>
  ));

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
        {!startSummary ? (
          <>
            <button className="startSummaryBtn" onClick={startSummaryFunc}>
              Start Analysis
            </button>
            <p>
              Click start analysis to get a summary of the terms and conditions
              now
            </p>
          </>
        ) : (
          <>
            {isLoading ? (
              // Display the loading spinner
              <div className="loading-spinner"></div>
            ) : (
              <ul className="summary-textbox">{renderAnalysis}</ul>
            )}
            {/* Conditionally render scoreWrapper when isLoading is false */}
            {!isLoading && (
              <div className="scoreWrapper">
                <div className="scoreContainer">
                  <div className="score score1">Honesty</div>
                  <div className="percent">60%</div>
                </div>
                <div className="scoreContainer">
                  <div className="score score2">Fairness:</div>
                  <div className="percent">40%</div>
                </div>
                <div className="scoreContainer">
                  <div className="score score3">ESG</div>
                  <div className="percent">N/A</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
