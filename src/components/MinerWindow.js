import React from 'react';

const MinerWindow = ({ onClose }) => {
  return (
    <div className="miner-window">
      <div className="window-header">
        <button className="minimize">_</button>
        <button className="maximize">[]</button>
        <button className="close" onClick={onClose}>X</button>
      </div>
      <div className="window-body">
        <h2>THA Mining</h2>
        <p>Manage your mining rig, start mining, and track rewards.</p>
        {/* Web3.js code to interact with the smart contract */}
      </div>
    </div>
  );
};

export default MinerWindow;
