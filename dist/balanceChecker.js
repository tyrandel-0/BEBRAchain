import { Contract, ethers } from 'ethers';
import { convertToFloat, getJsonRpcProvider, getProxyAgent } from './utils.js';
import { aHoneyTokenAddress, bgtTokenAddress, erc20Abi, honeyTokenAddress, usdcTokenAddress, wBeraTokenAddress, wBtcTokenAddress, wEthTokenAddress } from './abi/bexSwap.js';
export async function checkBalances(providerUrl, wallets, proxies, proxyType) {
    let data = [];
    for (let i = 0; i < wallets.length; i++) {
        const proxyAgent = (proxies && proxyType) ? getProxyAgent(proxies[i], proxyType) : undefined;
        const provider = getJsonRpcProvider(providerUrl, proxyAgent);
        const [balanceBERA, balanceHoney, balanceBgt, balanceStgUsdc, balanceWbera, balanceWeth, balanceWbtc, balanceAhoney] = await Promise.all([
            checkNative(provider, wallets[i]),
            checkERC20(provider, wallets[i], honeyTokenAddress),
            checkERC20(provider, wallets[i], bgtTokenAddress),
            checkERC20(provider, wallets[i], usdcTokenAddress),
            checkERC20(provider, wallets[i], wBeraTokenAddress),
            checkERC20(provider, wallets[i], wEthTokenAddress),
            checkERC20(provider, wallets[i], wBtcTokenAddress),
            checkERC20(provider, wallets[i], aHoneyTokenAddress),
        ]);
        data.push({
            "wallet": wallets[i],
            "BERA": convertToFloat(balanceBERA, 18),
            "Honey": convertToFloat(balanceHoney, 18),
            "BGT": convertToFloat(balanceBgt, 18),
            "STGUSDC": convertToFloat(balanceStgUsdc, 18),
            "WBERA": convertToFloat(balanceWbera, 18),
            "WETH": convertToFloat(balanceWeth, 18),
            "WBTC": convertToFloat(balanceWbtc, 8),
            "AHoney": convertToFloat(balanceAhoney, 18)
        });
    }
    console.table(data);
}
async function checkNative(provider, wallet) {
    return (await provider.getBalance(ethers.getAddress(wallet))).toString();
}
export async function checkERC20(provider, wallet, tokenAddress) {
    try {
        const tokenContract = new Contract(tokenAddress, erc20Abi, provider);
        const balance = await tokenContract.balanceOf(wallet);
        return balance.toString();
    }
    catch (error) {
        return "Error";
    }
}
