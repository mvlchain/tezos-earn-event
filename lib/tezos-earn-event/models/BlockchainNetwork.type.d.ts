export declare const BlockchainNetwork: {
    ETHEREUM: 'ETHEREUM';
    ETHEREUM_ROPSTEN: 'ETHEREUM_ROPSTEN';
    ETHEREUM_KOVAN: 'ETHEREUM_KOVAN';
    ETHEREUM_RINKEBY: 'ETHEREUM_RINKEBY';
    ETHEREUM_GOERLI: 'ETHEREUM_GOERLI';
    ETHEREUM_LOCAL: 'ETHEREUM_LOCAL';
    BSC: 'BSC';
    BSC_TEST: 'BSC_TEST';
    POLYGON: 'POLYGON';
    POLYGON_TEST: 'POLYGON_TEST';
    SOLANA: 'SOLANA';
    BITCOIN: 'BITCOIN';
    XTZ: 'XTZ';
    XTZ_GHOST: 'XTZ_GHOST';
    IN_MIGRATION: 'IN_MIGRATION';
};
export type BlockchainNetwork = (typeof BlockchainNetwork)[keyof typeof BlockchainNetwork];
