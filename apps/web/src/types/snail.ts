export type Snail = {
    address: string;
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