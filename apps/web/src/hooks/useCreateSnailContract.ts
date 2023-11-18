import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { useState } from "react";

interface SnailContractResult {
    address: `0x${string}` | undefined,
    isLoading: boolean,
    isSuccess: boolean,
    deploySnail: (network: number) => Promise<void>,
}

export default function useCreateSnailContract(): SnailContractResult {
    const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    // const { config, error } = usePrepareContractWrite({
    //     address: "0x00000", // TODO: Add contract address
    //     abi: [], // TODO: Add contract ABI
        
    // });

    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    
    const deploySnail = async (network: number) : Promise<void> => {
        setIsLoading(true);
        setIsSuccess(false);
        setAddress(undefined);
        await delay(2000);
        setAddress("0x00000");
        setIsLoading(false);
        setIsSuccess(true);
    }


    return { address, isLoading, isSuccess, deploySnail }
}