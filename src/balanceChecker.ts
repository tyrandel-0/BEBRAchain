import { ethers } from 'ethers';
import { getJsonRpcProvider, getProxyAgent } from './utils.js';
import { proxyType } from './types.js';

export async function checkBalances(providerUrl: string, wallets: string[], proxies?: string[], proxyType?: proxyType) {
    let data: any = []

    for (let i = 0; i < wallets.length; i++) {
        const proxyAgent = (proxies && proxyType) ? getProxyAgent(proxies[i], proxyType) : undefined
        console.log(proxyAgent)
        const provider = getJsonRpcProvider(providerUrl, proxyAgent)
        const balance = await provider.getBalance(ethers.getAddress(wallets[i]));
        const balanceBERA = ethers.formatEther(balance);
        data.push(
            {
                "wallet" : wallets[i],
                "BERA": balanceBERA
            }
        )
    }

    console.table(data)
}