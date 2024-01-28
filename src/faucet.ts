import axios, { AxiosError } from 'axios';
import { getProxyAgent, sleep } from './utils.js';
import { proxyType } from './types.js';

async function sendForDecision(apiKey: string, proxyAgent: any): Promise<string> {
	const url = `https://2captcha.com/in.php?key=${apiKey}&method=userrecaptcha&version=v3&min_score=0.9&action=submit&googlekey=6LfOA04pAAAAAL9ttkwIz40hC63_7IsaU2MgcwVH&pageurl=https://artio.faucet.berachain.com/`;
	try {
		const response = await axios.get(url, { httpsAgent: proxyAgent });
		return response.data;
	} catch (error) {
		throw error;
	}
}

async function getSolution(apiKey: string, captchaId: string, proxyAgent: any): Promise<string> {
	const url = `https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}`
	try {
		const response = await axios.get(url, { httpsAgent: proxyAgent });
		return response.data;
	} catch (error) {
		throw error;
	}
}

async function solveCaptcha(apiKey: string, proxyAgent: any): Promise<string> {
	try {
		const id = (await sendForDecision(apiKey, proxyAgent)).slice(3);
		await sleep(40000);
		const solution = (await getSolution(apiKey, id, proxyAgent)).slice(3);
		return solution;
	} catch (error) {
		throw error
	}

}

async function walletFaucet(walletIndex: number, address: string, apiKey: string, proxy: string, proxyType: proxyType) {
	const proxyAgent = getProxyAgent(proxy, proxyType);

	updateStatus(walletIndex, "solving Captcha...")
	let captchaSolution;
	try {
		captchaSolution = await solveCaptcha(apiKey, proxyAgent)
		if (captchaSolution == undefined) {
			updateStatus(walletIndex, "solving Captcha error")
			endedWallets++
			return
		}
	} catch (error) {
		updateStatus(walletIndex, "solving Captcha error")
		endedWallets++
		return
	}
	const url = `https://artio-80085-ts-faucet-api-2.berachain.com/api/claim?address=${address}`;

	updateStatus(walletIndex, "faucet...")
	try {
		const response = await axios.post(url,
			{
				address: address,
			},
			{
				httpsAgent: proxyAgent,
				headers: {
					'Authorization': `Bearer ${captchaSolution}`
				},
			})
		
		updateStatus(walletIndex, "faucet success! Status code: " + response.status)
		// return {
		// 	responseBody: response.data,
		// 	statusCode: response.status,
		// 	statusText: response.statusText
		// }

	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				updateStatus(walletIndex, "faucet failed: status code: " + axiosError.response.status);
				errors.set(axiosError.response.status, axiosError.response.statusText.toString());
				// if (axiosError.response.status == 401){
				// 	errors.set(walletIndex, captchaSolution);
				// }
			} else if (axiosError.request) {
				updateStatus(walletIndex, "faucet failed: " + axiosError.request);
			} else {
				updateStatus(walletIndex, "faucet failed: " + axiosError.message);
			}
		} else {
			updateStatus(walletIndex, "faucet error: " + error);
		}
	}

	endedWallets++;
}

async function walletFaucetTest(walletIndex: number, address: string, apiKey: string, proxy: string, proxyType: proxyType) {
	const proxyAgent = getProxyAgent(proxy, proxyType);
	const url = "https://api.ipify.org/";
	try {
		const response = await axios.get(url,
			{
				httpsAgent: proxyAgent,
			})
		
		updateStatus(walletIndex, "request succes!: " + response.status + " Ip: " + response.data)
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				updateStatus(walletIndex, "faucet failed: status code: " + axiosError.response.status);
				errors.set(axiosError.response.status, axiosError.response.statusText.toString());
				// if (axiosError.response.status == 401){
				// 	errors.set(walletIndex, captchaSolution);
				// }
			} else if (axiosError.request) {
				updateStatus(walletIndex, "faucet failed: " + axiosError.request);
			} else {
				updateStatus(walletIndex, "faucet failed: " + axiosError.message);
			}
		} else {
			updateStatus(walletIndex, "faucet error: " + error);
		}
	}
}

export async function faucet(wallets: string[], _2captchaApiKey: string, proxies: string[], proxyType: proxyType) {
	for (let i = 0; i < wallets.length; i++) {
		data.push({ wallet: wallets[i], status: "in progress" });
		walletFaucet(i, wallets[i], _2captchaApiKey, proxies[i], proxyType);
	}

	// for (let i = 0; i < wallets.length; i++) {
	// 	data.push({ wallet: wallets[i], status: "in progress" });
	// 	await walletFaucet(i, wallets[i], _2captchaApiKey, proxies[i], proxyType);
	// }

	setInterval(updateData, 100);
}

let data: any[] = [];
let endedWallets = 0;
const errors = new Map<number, string>();

function displayTable() {
	console.clear();
	console.table(data);
}

function updateData() {
	displayTable();
	if (data.length == endedWallets) {
		for (const [key, value] of errors){
			console.log(key + " : " + value)
		}
		process.exit(0);
	}
}

function updateStatus(index: number, status: string) {
	data[index] = {
		wallet: data[index].wallet,
		status: status
	}
}