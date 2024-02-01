export const zeroAdress = "0x0000000000000000000000000000000000000000";
export const bexSwapContract = "0x0d5862FDbdd12490f9b4De54c236cff63B038074";
export const usdc_bera_PoolAddress = "0x36Af4FBAb8ebE58b4EfFE0D5d72CeFfc6eFc650A";
export const honeyMintAddress = "0x09ec711b81cD27A6466EC40960F2f8D85BB129D9";
//https://raw.githubusercontent.com/berachain/default-token-list/main/src/tokens/testnet/defaultTokenList.json
export const honeyTokenAddress = "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B";
export const bgtTokenAddress = "0xAcD97aDBa1207dCf27d5C188455BEa8a32E80B8b";
export const usdcTokenAddress = "0x6581e59A1C8dA66eD0D313a0d4029DcE2F746Cc5";
export const wBeraTokenAddress = "0x5806E416dA447b267cEA759358cF22Cc41FAE80F";
export const wEthTokenAddress = "0x8239FBb3e3D0C2cDFd7888D8aF7701240Ac4DcA4";
export const wBtcTokenAddress = "0x9DAD8A1F64692adeB74ACa26129e0F16897fF4BB";
export const aHoneyTokenAddress = "0xB74285805B9eb4Dad384431C51F64C71fB786523";
export const bexSwapAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "assetsIn",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amountsIn",
                "type": "uint256[]"
            }
        ],
        "name": "addLiquidity",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "shares",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shareAmounts",
                "type": "uint256[]"
            },
            {
                "internalType": "address[]",
                "name": "liquidity",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "liquidityAmounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum IERC20DexModule.SwapKind",
                "name": "kind",
                "type": "uint8"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "poolId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetIn",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountIn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "assetOut",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountOut",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "userData",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct IERC20DexModule.BatchSwapStep[]",
                "name": "swaps",
                "type": "tuple[]"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "batchSwap",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "address[]",
                "name": "assetsIn",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amountsIn",
                "type": "uint256[]"
            },
            {
                "internalType": "string",
                "name": "poolType",
                "type": "string"
            },
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "asset",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "weight",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct IERC20DexModule.AssetWeight[]",
                        "name": "weights",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "swapFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct IERC20DexModule.PoolOptions",
                "name": "options",
                "type": "tuple"
            }
        ],
        "name": "createPool",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "baseAsset",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "quoteAsset",
                "type": "address"
            }
        ],
        "name": "getExchangeRate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            }
        ],
        "name": "getLiquidity",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "asset",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            }
        ],
        "name": "getPoolName",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            }
        ],
        "name": "getPoolOptions",
        "outputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "asset",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "weight",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct IERC20DexModule.AssetWeight[]",
                        "name": "weights",
                        "type": "tuple[]"
                    },
                    {
                        "internalType": "uint256",
                        "name": "swapFee",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct IERC20DexModule.PoolOptions",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "getPreviewAddLiquidityNoSwap",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "shares",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shareAmounts",
                "type": "uint256[]"
            },
            {
                "internalType": "address[]",
                "name": "liqOut",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "liquidityAmounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "liquidity",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "getPreviewAddLiquidityStaticPrice",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "shares",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shareAmounts",
                "type": "uint256[]"
            },
            {
                "internalType": "address[]",
                "name": "liqOut",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "liquidityAmounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum IERC20DexModule.SwapKind",
                "name": "kind",
                "type": "uint8"
            },
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "poolId",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetIn",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountIn",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "assetOut",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amountOut",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "userData",
                        "type": "bytes"
                    }
                ],
                "internalType": "struct IERC20DexModule.BatchSwapStep[]",
                "name": "swaps",
                "type": "tuple[]"
            }
        ],
        "name": "getPreviewBatchSwap",
        "outputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "getPreviewBurnShares",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "getPreviewSharesForLiquidity",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "shares",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shareAmounts",
                "type": "uint256[]"
            },
            {
                "internalType": "address[]",
                "name": "liquidity",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "liquidityAmounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "getPreviewSharesForSingleSidedLiquidityRequest",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum IERC20DexModule.SwapKind",
                "name": "kind",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "baseAsset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "baseAssetAmount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "quoteAsset",
                "type": "address"
            }
        ],
        "name": "getPreviewSwapExact",
        "outputs": [
            {
                "internalType": "address",
                "name": "asset",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "assetIn",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "assetAmount",
                "type": "uint256"
            }
        ],
        "name": "getRemoveLiquidityExactAmountOut",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "assetOut",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "sharesIn",
                "type": "uint256"
            }
        ],
        "name": "getRemoveLiquidityOneSideOut",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            }
        ],
        "name": "getTotalShares",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "withdrawAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "assetIn",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidityBurningShares",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "liquidity",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "liquidityAmounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "pool",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "withdrawAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "assetOut",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "sharesIn",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "maxSharesIn",
                "type": "uint256"
            }
        ],
        "name": "removeLiquidityExactAmount",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "shares",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "shareAmounts",
                "type": "uint256[]"
            },
            {
                "internalType": "address[]",
                "name": "liquidity",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "liquidityAmounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum IERC20DexModule.SwapKind",
                "name": "kind",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "poolId",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "assetIn",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "assetOut",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }
        ],
        "name": "swap",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "assets",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    }
];
export const erc20Abi = [
    { "type": "event", "name": "Approval", "inputs": [{ "indexed": true, "name": "owner", "type": "address" },
            { "indexed": true, "name": "spender", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" }] },
    { "type": "event", "name": "Transfer", "inputs": [{ "indexed": true, "name": "from", "type": "address" },
            { "indexed": true, "name": "to", "type": "address" },
            { "indexed": false, "name": "value", "type": "uint256" }] },
    { "type": "function", "name": "allowance", "stateMutability": "view",
        "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }],
        "outputs": [{ "name": "", "type": "uint256" }] },
    { "type": "function", "name": "approve", "stateMutability": "nonpayable",
        "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }],
        "outputs": [{ "name": "", "type": "bool" }] },
    { "type": "function", "name": "balanceOf", "stateMutability": "view",
        "inputs": [{ "name": "account", "type": "address" }], "outputs": [{ "name": "", "type": "uint256" }] },
    { "type": "function", "name": "decimals", "stateMutability": "view", "inputs": [],
        "outputs": [{ "name": "", "type": "uint8" }] },
    { "type": "function", "name": "name", "stateMutability": "view", "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32" }] },
    { "type": "function", "name": "symbol", "stateMutability": "view", "inputs": [],
        "outputs": [{ "name": "", "type": "bytes32" }] },
    { "type": "function", "name": "totalSupply", "stateMutability": "view", "inputs": [],
        "outputs": [{ "name": "", "type": "uint256" }] },
    { "type": "function", "name": "transfer", "stateMutability": "nonpayable",
        "inputs": [{ "name": "recipient", "type": "address" }, { "name": "amount", "type": "uint256" }],
        "outputs": [{ "name": "", "type": "bool" }] },
    { "type": "function", "name": "transferFrom", "stateMutability": "nonpayable",
        "inputs": [{ "name": "sender", "type": "address" }, { "name": "recipient", "type": "address" },
            { "name": "amount", "type": "uint256" }], "outputs": [{ "name": "", "type": "bool" }] }
];
export const honeyAbi = [{ "inputs": [{ "internalType": "contract IERC20", "name": "_honey", "type": "address" }],
        "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "erc20Module",
        "outputs": [
            { "internalType": "contract IERC20Module",
                "name": "", "type": "address" }
        ],
        "stateMutability": "view", "type": "function" },
    { "inputs": [], "name": "getExchangable", "outputs": [{ "components": [
                    { "internalType": "contract IERC20", "name": "collateral", "type": "address" },
                    { "internalType": "bool", "name": "enabled", "type": "bool" },
                    { "internalType": "uint256", "name": "mintRate", "type": "uint256" },
                    { "internalType": "uint256", "name": "redemptionRate", "type": "uint256" }
                ],
                "internalType": "struct ERC20Honey.ERC20Exchangable[]",
                "name": "", "type": "tuple[]" }],
        "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "honey", "outputs": [
            { "internalType": "contract IERC20", "name": "", "type": "address" }
        ], "stateMutability": "view",
        "type": "function" },
    { "inputs": [], "name": "honeyModule",
        "outputs": [{ "internalType": "contract IHoneyModule", "name": "", "type": "address" }],
        "stateMutability": "view", "type": "function" }, {
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "contract IERC20", "name": "collateral", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{ "internalType": "contract IERC20", "name": "collateral", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "previewMint",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{ "internalType": "contract IERC20", "name": "collateral", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "previewRedeem",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view",
        "type": "function"
    }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" },
            { "internalType": "contract IERC20", "name": "collateral",
                "type": "address" }], "name": "redeem",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "nonpayable", "type": "function" }];
