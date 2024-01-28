import { ethers } from 'ethers';
import { getJsonRpcProvider, getProxyAgent } from './utils.js';
export async function checkBalances(providerUrl, wallets, proxies, proxyType) {
    let data = [];
    for (let i = 0; i < wallets.length; i++) {
        const proxyAgent = (proxies && proxyType) ? getProxyAgent(proxies[i], proxyType) : undefined;
        const provider = getJsonRpcProvider(providerUrl, proxyAgent);
        const balance = await provider.getBalance(ethers.getAddress(wallets[i]));
        const balanceBERA = ethers.formatEther(balance);
        data.push({
            "wallet": wallets[i],
            "BERA": balanceBERA
        });
    }
    console.table(data);
}
