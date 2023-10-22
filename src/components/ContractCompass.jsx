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
      setIsLoading(true); // Set loading state to true

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that highlights key information customers should know in terms and conditions, for example, cancellation policies, hidden fees, basically anything that may cuse the customer financial harm. Return the summary in an array of concise points, do not exceed 5 points.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7, // Adjust temperature as needed
        max_tokens: 300, // Adjust max_tokens as needed
      });

      const summary = response.choices[0].message.content;

      const formatSummary = summary
        .split("\n")
        .filter((point) => point.trim() !== "");

      setAnalysis(formatSummary);

      setIsLoading(false); // Set loading state back to false after the request is completed
    } catch (error) {
      console.error(`Error with OpenAI API request: ${error.message}`);
      setIsLoading(false); // Make sure to handle loading state if there's an error
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
        <img src="https://res.cloudinary.com/dheko2ynz/image/upload/v1697996833/logo_v7wqti.png" className="logo" />
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
                <div className="score score1">1</div>
                <div className="score score2">2</div>
                <div className="score score3">3</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
