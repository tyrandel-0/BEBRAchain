import axios from 'axios';
import { getProxyAgent, getRandomDelayTime, sleep } from './utils.js';
export async function faucet(wallets, _2captchaApiKey, proxies, proxyType, delayTimeRange) {
    for (let i = 0; i < wallets.length; i++) {
        data.push({ wallet: wallets[i], status: "in progress" });
        walletFaucet(i, wallets[i], _2captchaApiKey, proxies[i], proxyType, getRandomDelayTime(delayTimeRange));
    }
    setInterval(updateData, 100);
}
async function walletFaucet(walletIndex, address, apiKey, proxy, proxyType, delay) {
    const proxyAgent = getProxyAgent(proxy, proxyType);
    updateStatus(walletIndex, `waiting for ${delay} seconds before start`);
    await sleep(delay * 1000);
    updateStatus(walletIndex, "solving Captcha...");
    let captchaSolution;
    try {
        captchaSolution = await solveCaptcha(apiKey, proxyAgent);
        if (captchaSolution == undefined) {
            updateStatus(walletIndex, "solving Captcha error");
            endedWallets++;
            return;
        }
    }
    catch (error) {
        updateStatus(walletIndex, "solving Captcha error");
        endedWallets++;
        return;
    }
    const url = `https://artio-80085-faucet-api-recaptcha.berachain.com/api/claim?address${address}`;
    updateStatus(walletIndex, "faucet...");
    try {
        const response = await axios.post(url, {
            address: address,
        }, {
            httpsAgent: proxyAgent,
            headers: {
                'Authorization': `Bearer ${captchaSolution}`
            },
        });
        updateStatus(walletIndex, "faucet success! Status code: " + response.status);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error;
            if (axiosError.response) {
                updateStatus(walletIndex, "faucet failed: status code: " + axiosError.response.status);
                errors.set(axiosError.response.status, axiosError.response.statusText.toString());
            }
            else if (axiosError.request) {
                updateStatus(walletIndex, "faucet failed: " + axiosError.request);
            }
            else {
                updateStatus(walletIndex, "faucet failed: " + axiosError.message);
            }
        }
        else {
            updateStatus(walletIndex, "faucet error: " + error);
        }
    }
    endedWallets++;
}
async function solveCaptcha(apiKey, proxyAgent) {
    try {
        const id = (await sendForDecision(apiKey, proxyAgent)).slice(3);
        await sleep(40000);
        const solution = (await getSolution(apiKey, id, proxyAgent)).slice(3);
        return solution;
    }
    catch (error) {
        throw error;
    }
}
async function sendForDecision(apiKey, proxyAgent) {
    const url = `https://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&version=v3&min_score=0.9&action=submit&googlekey=6LfOA04pAAAAAL9ttkwIz40hC63_7IsaU2MgcwVH&pageurl=https://artio.faucet.berachain.com/`;
    try {
        const response = await axios.get(url, { httpsAgent: proxyAgent });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}
async function getSolution(apiKey, captchaId, proxyAgent) {
    const url = `https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}`;
    try {
        const response = await axios.get(url, { httpsAgent: proxyAgent });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}
async function walletFaucetTest(walletIndex, address, apiKey, proxy, proxyType) {
    const proxyAgent = getProxyAgent(proxy, proxyType);
    const url = "https://api.ipify.org/";
    try {
        const response = await axios.get(url, {
            httpsAgent: proxyAgent,
        });
        updateStatus(walletIndex, "request succes!: " + response.status + " Ip: " + response.data);
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error;
            if (axiosError.response) {
                updateStatus(walletIndex, "faucet failed: status code: " + axiosError.response.status);
                errors.set(axiosError.response.status, axiosError.response.statusText.toString());
            }
            else if (axiosError.request) {
                updateStatus(walletIndex, "faucet failed: " + axiosError.request);
            }
            else {
                updateStatus(walletIndex, "faucet failed: " + axiosError.message);
            }
        }
        else {
            updateStatus(walletIndex, "faucet error: " + error);
        }
    }
}
let data = [];
let endedWallets = 0;
const errors = new Map();
function displayTable() {
    console.clear();
    console.table(data);
}
function updateData() {
    displayTable();
    if (data.length == endedWallets) {
        for (const [key, value] of errors) {
            console.log(key + " : " + value);
        }
        process.exit(0);
    }
}
function updateStatus(index, status) {
    data[index] = {
        wallet: data[index].wallet,
        status: status
    };
}
