import { faucet } from './faucet.js';
import inquirer from 'inquirer';
import { readConfig, readFromFile } from './utils.js';
import { checkBalances } from './balanceChecker.js';
import { completeGalxeSwapTask } from './bexSwap.js';
import { completeGalxeHoneyMintTask } from './honeyMint.js';
const config = readConfig("./config.json");
const wallets = readFromFile("./wallets.txt");
const proxies = readFromFile("./proxy.txt");
const privateKeys = readFromFile("./private_keys.txt");
async function main() {
    let questions = [
        {
            type: 'list',
            name: 'menu',
            message: 'Выберите действие:',
            choices: [
                'Подоить кран',
                'Чекнуть балансы',
                'Swap on Bex (Galxe task)',
                'Mint honey (Galxe task)',
                new inquirer.Separator(),
                'Выход'
            ]
        }
    ];
    const answers = await inquirer.prompt(questions);
    switch (answers['menu']) {
        case "Подоить кран":
            await faucet(wallets, config._2captchaApiKey, proxies, config.ProxyType, config.DelayTimeRange);
            break;
        case "Чекнуть балансы":
            await checkBalances(config.Rpc, wallets, proxies, config.ProxyType);
            break;
        case "Swap on Bex (Galxe task)":
            await completeGalxeSwapTask(config.Rpc, privateKeys, config.DelayTimeRange, proxies, config.ProxyType);
            break;
        case "Mint honey (Galxe task)":
            await completeGalxeHoneyMintTask(config.Rpc, privateKeys, config.DelayTimeRange, proxies, config.ProxyType);
            break;
    }
}
main();
