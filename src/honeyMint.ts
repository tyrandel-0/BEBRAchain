import { JsonRpcProvider, TransactionLike, Wallet, assert, ethers } from 'ethers';
import { bexSwapAbi, bexSwapContract, honeyAbi, honeyMintAddress, usdc_bera_PoolAddress, usdcTokenAddress, zeroAdress } from './abi/bexSwap.js'
import { approveERC20, convertToFloat, getJsonRpcProvider, getProxyAgent, getRandomDelayTime, getRandomInRange, sleep } from './utils.js';
import { DelayTimeRange, proxyType } from './types.js';
import { checkERC20 } from './balanceChecker.js';

export async function completeGalxeHoneyMintTask(providerUrl: string, privateKeys: string[], delayTimeRange: DelayTimeRange, proxies?: string[], proxyType?: proxyType) {
    for (let i = 0; i < privateKeys.length; i++) {
        const proxyAgent = (proxies && proxyType) ? getProxyAgent(proxies[i], proxyType) : undefined
        const provider = getJsonRpcProvider(providerUrl, proxyAgent)
        const privateKey = privateKeys[i];
        const wallet = new ethers.Wallet(privateKey, provider);

        data.push({ wallet: wallet.address, status: "in progress" });
        completeTaskForWallet(wallet, i, getRandomDelayTime(delayTimeRange));
    }

    setInterval(updateData, 100);
}

async function completeTaskForWallet(wallet: Wallet, walletIndex: number, delay: number) {
    try {
        updateStatus(walletIndex, `checking USDC balance`);
        const usdcBalanceString = await checkERC20(wallet.provider as JsonRpcProvider, wallet.address, usdcTokenAddress)
        if (usdcBalanceString == "Error") {
            updateStatus(walletIndex, "cannot get usdc balance");
            endedWallets++;
            return
        }

        const usdcBalance = ethers.toBigInt(usdcBalanceString);

        if (usdcBalance < 150) {
            updateStatus(walletIndex, "usdc balance to low!");
            endedWallets++;
            return
        }

        updateStatus(walletIndex, `waiting for ${delay} seconds before start`);
        await sleep(delay * 1000);

        const mintAmount = getRandomInRange(convertToFloat("151", 18) as number, (convertToFloat(usdcBalanceString, 18) as number) * 0.8);
        updateStatus(walletIndex, `approve ${mintAmount} USDC started`);

        const approveTxHash = await approveERC20(wallet, usdcTokenAddress, ethers.parseUnits(mintAmount, 18), honeyMintAddress);
        updateStatus(walletIndex, `approve tx sent: ${approveTxHash}`);
        updateStatus(walletIndex, `approve tx result: ${((await wallet.provider?.waitForTransaction(approveTxHash, undefined, 1200000))?.status == 1) ? "success!" : "failed("}`);
        await sleep(4000);

        updateStatus(walletIndex, `mint Honey for ${mintAmount} USDC started`);
        const txHash = await mintHoney(wallet, mintAmount);
        updateStatus(walletIndex, `mint tx sent: ${txHash}`);
        updateStatus(walletIndex, `mint tx result: ${((await wallet.provider?.waitForTransaction(approveTxHash, undefined, 1200000))?.status == 1) ? "success!" : "failed("}`);
    } catch (error) {
        updateStatus(walletIndex, `execute error`);
        errors.set(1, error!.toString())
    }

    endedWallets++
}

async function mintHoney(wallet: Wallet, mintAmount: string): Promise<string> {
    const contract = new ethers.Contract(honeyMintAddress, honeyAbi, wallet);
    const data = await contract.interface.encodeFunctionData("mint", [wallet.address, usdcTokenAddress, ethers.parseUnits(mintAmount, 18)]);

    let tx:TransactionLike = {
        to: honeyMintAddress,
        data: data,
    }
    tx = await wallet.populateTransaction(tx)

    tx.maxFeePerGas = ethers.toNumber(tx.maxFeePerGas!) * 10
    tx.maxPriorityFeePerGas = ethers.toNumber(tx.maxPriorityFeePerGas!) * 10
    
    const txResponse = await wallet.sendTransaction(tx);
    return txResponse.hash
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
