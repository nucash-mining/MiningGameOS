import React, { useState, useEffect } from "react"; // Import useEffect to handle dragging
import polLogo from '../assets/PolLogo.png'; // Polygon Logo
import altLogo from '../assets/AltLogo.png'; // Altcoin Logo

function ConnectWindow({ connectToChain, closeWindow, minimizeWindow, walletAddress, logout, currentChain, setCurrentChain }) {
  const [isSelectingNetwork, setIsSelectingNetwork] = useState(false);

  // Function to format wallet address
  const formatWalletAddress = (address) => {
    if (address) {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    return "";
  };

  // Make the window draggable
  useEffect(() => {
    const dragElement = document.querySelector(".connect-window");
    let offsetX = 0, offsetY = 0, mouseX = 0, mouseY = 0;

    const dragMouseDown = (e) => {
      e.preventDefault();
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    };

    const elementDrag = (e) => {
      e.preventDefault();
      offsetX = mouseX - e.clientX;
      offsetY = mouseY - e.clientY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      dragElement.style.top = (dragElement.offsetTop - offsetY) + "px";
      dragElement.style.left = (dragElement.offsetLeft - offsetX) + "px";
    };

    const closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    };

    const header = document.querySelector(".window-header");
    if (header) {
      header.onmousedown = dragMouseDown;
    }

    return () => {
      if (header) {
        header.onmousedown = null;
      }
    };
  }, []);

  return (
    <div className="connect-window">
      <div className="window-header">
        <button className="minimize-btn" onClick={minimizeWindow}>_</button>
        <button className="close-btn" onClick={closeWindow}>X</button>
      </div>

      {walletAddress ? (
        isSelectingNetwork ? (
          <>
            <h3>Select Blockchain</h3>
            <div className="chain-option" onClick={() => { connectToChain("Altcoinchain"); setCurrentChain("Altcoinchain"); setIsSelectingNetwork(false); }}>
              <img src={altLogo} alt="Altcoinchain" className="chain-logo" />
              <p style={{ fontWeight: "bold", textAlign: "left" }}>Altcoinchain</p>
            </div>
            <div className="chain-option" onClick={() => { connectToChain("Polygon"); setCurrentChain("Polygon"); setIsSelectingNetwork(false); }}>
              <img src={polLogo} alt="Polygon" className="chain-logo" />
              <p style={{ fontWeight: "bold", textAlign: "left" }}>Polygon</p>
            </div>
          </>
        ) : (
          <div className="wallet-info">
            <h3>Connected Chain: {currentChain}</h3>
            <img
              src={currentChain === "Altcoinchain" ? altLogo : polLogo}
              alt={currentChain}
              className={`chain-logo ${walletAddress ? "chain-logo-scaled" : ""}`}  // Apply scaled class when connected
            />
            <p>Connected Wallet: {formatWalletAddress(walletAddress)}</p>
            <button onClick={logout}>Disconnect</button>
            <button onClick={() => setIsSelectingNetwork(true)}>Switch Network</button>
          </div>
        )
      ) : (
        <>
          <h3>Select Blockchain</h3>
          <div className="chain-option" onClick={() => { connectToChain("Altcoinchain"); setCurrentChain("Altcoinchain"); }}>
            <img src={altLogo} alt="Altcoinchain" className="chain-logo" />
            <p style={{ fontWeight: "bold", textAlign: "left" }}>Altcoinchain</p>
          </div>
          <div className="chain-option" onClick={() => { connectToChain("Polygon"); setCurrentChain("Polygon"); }}>
            <img src={polLogo} alt="Polygon" className="chain-logo" />
            <p style={{ fontWeight: "bold", textAlign: "left" }}>Polygon</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ConnectWindow;
