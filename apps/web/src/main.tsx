import 'bootstrap/dist/css/bootstrap.min.css';
import { defaultWagmiConfig } from '@web3modal/wagmi/react'
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import App from "./App.tsx";
import { chains, projectId, metadata } from './wagmi.ts';

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
        <App chains={chains} projectId={projectId} wagmiConfig={wagmiConfig}/>
      </WagmiConfig>
  </React.StrictMode>,
);
