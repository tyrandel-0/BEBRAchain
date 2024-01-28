\
BEBRAchain
--------------------------
Функционал:

1) Запрос монет из крана ... `done`
2) Чекер балансов ...`in progress`
3) Выполнение onchain действий ... `in progress`

### 1\. Установка Node.js

Убедитесь, что у вас установлен Node.js. Вы можете скачать его с [официального сайта Node.js](https://nodejs.org/).

### 2\. Установка зависимостей

Откройте терминал и перейдите в папку с проектом. Затем выполните команду:

`npm install`

Это установит все необходимые зависимости из файла `package.json`.

### 3\. Настройка

Для корректной работы программы необходимо заполнить следующие файлы:

-   `wallets.txt`: Файл с адресами кошельков. Каждая строка соответствует адресу кошелька.
-   `proxy.txt`: Файл с прокси в формате `host:port:login:password`. Каждая строка прокси соответствует строке кошелька.
-   `config.json`: Файл конфигурации программы, где необходимо указать следующие параметры:
    -   `_2captchaApiKey`: API ключ от [2captcha.com](https://2captcha.com/) (перед этим нужно зарегестрироваться и пополнить баланс. 1 капча примерно 0.003$).
    -   `ProxyType`: Тип прокси, указать `socks` или `http` (https == http).

### 4\. Запуск программы

После заполнения файлов и конфигурации, выполните следующую команду в терминале:

`npm start`