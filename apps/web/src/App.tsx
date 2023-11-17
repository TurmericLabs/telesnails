import { createWeb3Modal } from '@web3modal/wagmi/react'
import SnailsTable from './components/SnailsTable';

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
        <SnailsTable />
      </div>
    </>
  );
}

export default App;
