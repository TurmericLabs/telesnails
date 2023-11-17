import { createWeb3Modal } from '@web3modal/wagmi/react'

interface AppProps {
  wagmiConfig: any;
  projectId: string;
  chains: any[];
}

function App({ wagmiConfig, projectId, chains }: AppProps) {

  createWeb3Modal({ wagmiConfig, projectId, chains })

  return (
    <>
      <div>
        <w3m-button />
      </div>
    </>
  );
}

export default App;
