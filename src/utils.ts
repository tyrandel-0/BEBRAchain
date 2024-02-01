import { HttpsProxyAgent } from "https-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";
import * as fs from 'fs';
import { DelayTimeRange, config, proxyType } from "./types.js";
import { FetchRequest, ethers, JsonRpcProvider, Wallet, TransactionLike } from "ethers";
import { Agent } from "agent-base"
import { erc20Abi } from "./abi/bexSwap.js";

export function getProxyAgent(proxyString: string, type: proxyType): Agent | undefined {
    if (proxyString == undefined) {
        return undefined;
    }

    const proxyParams = proxyString.split(":")

    if (type == "http") {
        return new HttpsProxyAgent(`http://${proxyParams[2]}:${proxyParams[3]}@${proxyParams[0]}:${proxyParams[1]}`);
    }
    else if (type == "socks") {
        return new SocksProxyAgent(`socks5://${proxyParams[2]}:${proxyParams[3]}@${proxyParams[0]}:${proxyParams[1]}`);
    }
}

export function readFromFile(filePath: string): string[] {
    const items: string[] = [];

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n');

        lines.forEach((line) => {
            const item = line.trim();
            if (item) {
                items.push(item);
            }
        });

        return items;
    } catch (error) {
        throw Error("Canot read file")
    }
}

export function readConfig(configPath: string): config {
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw Error("Canot read config")
    }
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function getJsonRpcProvider(url: string, proxyAgent: Agent | undefined): JsonRpcProvider {
    if (proxyAgent) {
        const fetchReq = new FetchRequest(url);
        fetchReq.getUrlFunc = FetchRequest.createGetUrlFunc({ agent: proxyAgent });
        const provider = new ethers.JsonRpcProvider(fetchReq);
        return provider;
    }
    else {
        return new ethers.JsonRpcProvider(url);
    }
}

export function getRandomInRange(min: number, max: number): string {
    let random = Math.random() * (max - min) + min;
    return random.toFixed(8);
}

export function getRandomDelayTime(range: DelayTimeRange): number {
    const { timeSecMin, timeSecMax } = range;
    const randomDelay = Math.floor(Math.random() * (timeSecMax - timeSecMin + 1)) + timeSecMin;
    return randomDelay;
}

export function convertToFloat(balance: string, decimal: number) {
    if (balance == "Error") return balance
    return parseFloat((parseInt(balance) / 10 ** decimal).toFixed(6))
}

export async function approveERC20(wallet: Wallet, tokenAddress: string, amount: bigint, to: string): Promise<string> {
    const contract = new ethers.Contract(tokenAddress, erc20Abi, wallet);
    const data = await contract.interface.encodeFunctionData("approve", [to, amount]);

    let tx:TransactionLike = {
        to: tokenAddress,
        data: data,
    }
    tx = await wallet.populateTransaction(tx)

    tx.maxFeePerGas = ethers.toNumber(tx.maxFeePerGas!) * 10
    tx.maxPriorityFeePerGas = ethers.toNumber(tx.maxPriorityFeePerGas!) * 10
    
    
    const txResponse = await wallet.sendTransaction(tx);
    return txResponse.hash
}