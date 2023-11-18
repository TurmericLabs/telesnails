import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { defaultWagmiConfig, createWeb3Modal } from '@web3modal/wagmi/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import HomePage from './pages/home.tsx';
import { chains, projectId, metadata } from './wagmi.ts';
import Header from './components/Header.tsx';
import SnailsPage from './pages/snails.tsx';
import FirstSnailPage from './pages/first-snail.tsx';
import { createHashRouter, RouterProvider } from "react-router-dom";
import "@fontsource/londrina-solid"; 
import "@fontsource-variable/nunito"

const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/snails", element: <SnailsPage /> },
  { path: "/first-snail", element: <FirstSnailPage /> },
]);

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({ wagmiConfig, projectId, chains, themeVariables: {
  '--w3m-accent': '#00AB60',
  '--w3m-font-family': 'Nunito Variable',
} })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <Header />
      <RouterProvider router={router}/>
      <ToastContainer />
    </WagmiConfig>
  </React.StrictMode>,
);
