import { HttpsProxyAgent } from "https-proxy-agent";
import { SocksProxyAgent } from "socks-proxy-agent";
import * as fs from 'fs';
export function getProxyAgent(proxyString, type) {
    if (proxyString == undefined) {
        return undefined;
    }
    const proxyParams = proxyString.split(":");
    if (type == "http") {
        return new HttpsProxyAgent(`http://${proxyParams[2]}:${proxyParams[3]}@${proxyParams[0]}:${proxyParams[1]}`);
    }
    else if (type == "socks") {
        return new SocksProxyAgent(`socks5://${proxyParams[2]}:${proxyParams[3]}@${proxyParams[0]}:${proxyParams[1]}`);
    }
}
export function readFromFile(filePath) {
    const items = [];
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
    }
    catch (error) {
        throw Error("Canot read file");
    }
}
export function readConfig(configPath) {
    try {
        const data = fs.readFileSync(configPath, 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        throw Error("Canot read config");
    }
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
