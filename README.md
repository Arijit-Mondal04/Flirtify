<p align="center">
  <img src="logo.png" alt="Flirtify Logo" width="200"/>
</p>

<h1 align="center">💖 Flirtify DApp</h1>

<p align="center">
  A decentralized dating & social application built on the Algorand blockchain.<br/>
  <i>"Where good conversations pay you!"</i>
</p>

---

## 🌟 Features

- *Decentralized Profiles*  
  Users can create and manage their profiles on-chain by staking a small amount of ALGO, ensuring data ownership and deterring spam.

- *Reputation System*  
  An on-chain reputation score is updated with each meaningful interaction, creating a transparent and self-regulating community.

- *Secure Messaging*  
  Users can send paid messages to each other, with payments handled by the smart contract via inner transactions, ensuring trustless and efficient transfers.

- *Non-Custodial*  
  The smart contract is non-custodial. User-staked funds are held by the contract but can be retrieved when the user opts out, ensuring full control of assets.

- *Immutable Logic*  
  Built with *PyTeal*, the smart contract logic is immutable and transparent, providing a high degree of trust in the application’s rules.

---

## 🚀 Technologies

- *Algorand* – High-speed, low-cost, carbon-negative blockchain  
- *PyTeal* – Python library for writing Algorand smart contracts (TEAL)  
- *AlgoKit* – All-in-one developer toolkit for building and deploying Algorand apps  
- *React* – Frontend framework for the user interface  
- *WalletConnect* – Secure wallet connection (supports mobile wallets like Petra Wallet)  

---

## 🛠 Getting Started

### ✅ Prerequisites
Make sure you have the following installed:
- [AlgoKit](https://github.com/algorandfoundation/algokit-cli)  
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)  
- [Node.js & npm](https://nodejs.org/)  
- [Python 3.10+](https://www.python.org/downloads/)  

---

### 📥 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/flirtify.git
cd flirtify

Bootstrap project dependencies:
Copy code
Bash
algokit project bootstrap
▶ Running the Application
1. Start the Local Development Network:
Copy code
Bash
algokit localnet start
2. Deploy the Smart Contract:
Copy code
Bash
algokit project deploy testnet
⚠ Note: This command may require your wallet mnemonic. Configure it as an environment variable or use --interactive.
3. Run the Frontend Application:
Copy code
Bash
cd frontend
npm run start
Your DApp will now be live at http://localhost:3000.
💡 How to Use
Connect Wallet – Click the Connect Wallet button on the home page. A QR code will appear.
Scan with Petra Wallet – Use your Petra Wallet app to scan the QR code.
Create Profile – Stake 0.02 ALGO to create your profile.
View Profiles – Browse other users’ profiles on-chain.
Send a Message – Pay 0.5 ALGO to send a message. This also increases your reputation score.
📝 Smart Contract Details
The main contract logic is in smart_contracts/approval_program.py:
on_creation – Initializes global state
on_opt_in – Handles profile creation & stake payment
on_send_message – Processes paid messages and updates reputation via inner transactions
on_close_out – Refunds user-staked ALGO when opting out
🤝 Contributing
Contributions are welcome!
Open an issue for feature requests or bug reports
Submit a PR for improvements
📄 License
This project is licensed under the MIT License.
