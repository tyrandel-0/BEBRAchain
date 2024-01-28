import { ethers } from 'ethers';

export async function checkBalances(providerUrl: string, wallets: string[]) {
    const provider = new ethers.JsonRpcProvider(providerUrl);

    let data: any = []

    for (let address of wallets) {
        const balance = await provider.getBalance(ethers.getAddress(address));
        const balanceBERA = ethers.formatEther(balance);
        data.push(
            {
                "wallet" : address,
                "BERA": balanceBERA
            }
        )
    }

    console.table(data)
}