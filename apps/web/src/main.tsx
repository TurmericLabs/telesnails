import 'bootstrap/dist/css/bootstrap.min.css';
import { defaultWagmiConfig, createWeb3Modal } from '@web3modal/wagmi/react'
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import App from "./App.tsx";
import { chains, projectId, metadata } from './wagmi.ts';
import Header from './components/Header.tsx';

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({ wagmiConfig, projectId, chains })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <Header />
        <App />
      </WagmiConfig>
  </React.StrictMode>,
);
