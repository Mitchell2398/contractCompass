import React from "react";

function BrowserHeader(props) {

  function displayApp () {
    props.setDisplayApp(prevState => !prevState)
  }
  return (
    <div className="browser-header">
      <div className="left-section">
        <input type="text" className="url-input" placeholder="Enter URL" value="www.insurance.com/terms&conditions" readOnly />
        <button className="search-button">Go</button>
      </div>
      <div className="right-section">
        <img className="extension" src="./src/assets/icon.png" onClick={displayApp}></img>
      </div>
    </div>
  );
}

export default BrowserHeader;
