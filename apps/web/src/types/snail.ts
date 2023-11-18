export type Snail = {
    address: `0x${string}` | undefined;
    network: number;
    name: string;
}

export enum SnailModalOptions {
    CREATE,
    EDIT
}

export type UserSnails = {
    address: `0x${string}`;
    snails: Snail[];
}

export interface SnailModalButtonProps {
    snail?: Snail;
    showModal: (snail: Snail | undefined) => void;
}