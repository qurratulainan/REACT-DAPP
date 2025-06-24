# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Setting up the environment
1. install node.js
2. Create new project directory
   - mkdir react-dapp
   - cd react-dapp
   - code. -> to open vscode directly from terminal
3. initiliaze npm in the project directory
   - npm init y
4. Setup a hardhat project
   - npx hardhat init
   - npx hardhat --version
   - npx create vite@latest . -- --template react
   - create manually scripts folder and deploy.js
   - npm install --save-dev @nomicfoundation/hardhat-toolbox
5. configuration (refer hardhat.config.js)
6. compile smart contract
  - npx hardhat complie
7. Node
  - npx hardhat node
  - npx hardhat run scripts/deploy.js --network localhost
8. start the deployment server
  - npm run dev
