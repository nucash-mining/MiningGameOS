import { ethers } from 'ethers';
import FileManagerABI from '../web3/FileManagerABI.json'; // Adjust the path to where your ABI file is located

// Contract address (replace with your deployed contract's address)
const contractAddress = '0x8F6679b1BB9D536BB955121D75D21501BEAe58ca';

// Function to initialize Ethereum wallet connection
const getSigner = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);  // Changed to `BrowserProvider`
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    return provider.getSigner();
  } else {
    console.error('No Ethereum wallet found');
    throw new Error('No Ethereum wallet found');
  }
};

// Function to create a folder on-chain
export const createFolderOnChain = async (folderName) => {
  try {
    const signer = await getSigner();
    const contract = new ethers.Contract(contractAddress, FileManagerABI, signer);

    // Call the smart contract function to create a folder
    const tx = await contract.createFolder(folderName);
    await tx.wait(); // Wait for transaction to be mined

    console.log('Folder created on-chain!');
  } catch (err) {
    console.error('Error creating folder:', err);
  }
};

// Example function to save user settings
export const saveSettingsToContract = async (settings) => {
  try {
    const signer = await getSigner();
    const contract = new ethers.Contract(contractAddress, FileManagerABI, signer);

    // Assuming your smart contract has a function `saveSettings`
    const tx = await contract.saveSettings(settings);
    await tx.wait(); // Wait for the transaction to be mined

    console.log('Settings saved to the contract!');
  } catch (err) {
    console.error('Error saving settings:', err);
  }
};
