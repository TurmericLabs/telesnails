import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { defaultWagmiConfig, createWeb3Modal } from '@web3modal/wagmi/react'
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import App from "./App.tsx";
import { chains, projectId, metadata } from './wagmi.ts';
import Header from './components/Header.tsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SnailsPage from './pages/snails.tsx';
import "@fontsource/londrina-solid"; 

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/snails", element: <SnailsPage /> }
]);

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ wagmiConfig, projectId, chains, themeVariables: {
  '--w3m-accent': '#00AB60',
} })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <Header />
      <RouterProvider router={router}/>
    </WagmiConfig>
  </React.StrictMode>,
);
