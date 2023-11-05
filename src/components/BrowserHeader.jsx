import React from "react";

function BrowserHeader(props) {

  function displayApp () {
    props.setDisplayApp(prevState => !prevState)
  }
  return (
    <div className="sticky">
    <div className="browser-header">
      <div className="left-section">
        <input type="text" className="url-input" placeholder="Enter URL" value="www.galwayinsurance.com/terms&conditions" readOnly />
        <button className="search-button">Go</button>
      </div>
      <div className="right-section">
        <img className="extension" src="https://res.cloudinary.com/dheko2ynz/image/upload/v1697996833/icon_cwrxww.png" onClick={displayApp}></img>
      </div>
    </div>
     <div className='HeaderContainer'>
     <h1 className='logoGalway'>Galway Insurance</h1>
     <ul className='navItems'>
         <li className='navItem'>Compare plans</li>
         <li className='navItem'>Benefits</li>
         <li className='navItem'>Get Quote</li>
         <li className='navItem'>Contact us</li>
     </ul>
 </div>
 </div>

  );
}

export default BrowserHeader;
