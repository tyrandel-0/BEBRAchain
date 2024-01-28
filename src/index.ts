import { faucet } from './faucet.js';
import inquirer from 'inquirer';
import { readConfig, readFromFile } from './utils.js';
import { checkBalances } from './balanceChecker.js';

const config = readConfig("./config.json")
const wallets = readFromFile("./wallets.txt")
const proxies = readFromFile("./proxy.txt")

async function main() {
    let questions = [
        {
            type: 'list',
            name: 'menu',
            message: 'Выберите действие:',
            choices: [
                'Подоить кран',
                'Чекнуть балансы',
                new inquirer.Separator(),
                'Выход'
            ]
        }
    ];
    
    const answers = await inquirer.prompt(questions);
    switch(answers['menu']){
        case "Подоить кран":
            await faucet(wallets, config._2captchaApiKey, proxies, config.ProxyType);
        case "Чекнуть балансы":
            await checkBalances('https://artio.rpc.berachain.com/', wallets, proxies, config.ProxyType);
    }
} main()
