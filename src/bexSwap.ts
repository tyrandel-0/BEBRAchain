import { TransactionLike, Wallet, ethers } from 'ethers';
import { bexSwapAbi, bexSwapContract, usdc_bera_PoolAddress, usdcTokenAddress, zeroAdress } from './abi/bexSwap.js'
import { getJsonRpcProvider, getProxyAgent, getRandomDelayTime, getRandomInRange, sleep } from './utils.js';
import { DelayTimeRange, proxyType } from './types.js';

export async function completeGalxeSwapTask(providerUrl: string, privateKeys: string[], delayTimeRange: DelayTimeRange, proxies?: string[], proxyType?: proxyType) {
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
        updateStatus(walletIndex, `waiting for ${delay} seconds before start`);
        await sleep(delay * 1000);
        const swapAmount = getRandomInRange(0.0001, 0.0013);
        updateStatus(walletIndex, `swap from Bera to Usdc for ${swapAmount} Bera started`);
        const txHash = await bexSwap(wallet, zeroAdress, usdcTokenAddress, usdc_bera_PoolAddress, swapAmount, "0");
        updateStatus(walletIndex, `tx sent: ${txHash}`);
        updateStatus(walletIndex, `tx result: ${((await wallet.provider?.waitForTransaction(txHash, undefined, 1200000))?.status == 1) ? "success!" : "failed("}`);
    } catch (error) {
        updateStatus(walletIndex, `execute error`);
        errors.set(1, error!.toString())
    }

    endedWallets++
}

async function bexSwap(wallet: Wallet, fromToken: string, toToken: string, poolAddr: string, amountIn: string, minOutput: string): Promise<string>{
    const contract = new ethers.Contract(bexSwapContract, bexSwapAbi, wallet);
    const kind = 0;
    const swaps = [
        {
            poolId: poolAddr, 
            assetIn: fromToken, 
            amountIn: ethers.parseUnits(amountIn, 18), 
            assetOut: toToken, 
            amountOut: ethers.parseUnits(minOutput, 18), 
            userData: ethers.randomBytes(0), 
        },
    ];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; //20 min
    const data = await contract.interface.encodeFunctionData("batchSwap", [kind, swaps, deadline])

    let tx:TransactionLike = {
        to: bexSwapContract,
        data: data,
        value: swaps[0].amountIn,
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