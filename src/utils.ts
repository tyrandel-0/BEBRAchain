import { HttpsProxyAgent } from "https-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";
import * as fs from 'fs';
import { config, proxyType } from "./types.js";
import { FetchRequest, ethers, JsonRpcProvider } from "ethers";
import { Agent } from "agent-base"

export function getProxyAgent(proxyString: string, type: proxyType): Agent | undefined {
    if (proxyString == undefined){
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

export function getJsonRpcProvider(url: string, proxyAgent: Agent | undefined): JsonRpcProvider{
    if (proxyAgent){
        const fetchReq = new FetchRequest(url);
        fetchReq.getUrlFunc = FetchRequest.createGetUrlFunc({ agent: proxyAgent });
        return new ethers.JsonRpcProvider(fetchReq);
    }
    else {
        return new ethers.JsonRpcProvider(url);
    }
}
