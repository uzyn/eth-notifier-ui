# eth-notifier-ui

Web UI for ETH Notifier

Ethereum service for sending SMS and email _(coming soon)_ notifications.

Supports IPFS-augmented Ethereum calls for cheaper _(gas)_ calls and encrypted calls.

## Frontend (static page UI)

1. Install dependencies

    ```bash
    npm install
    ```

1. Configure, if required.

    ```bash
    cp config/default.js config/local.js
    # edit local.js accordingly
    ```


1. Start the dev server, code and enjoy! Browser should automatically refresh if you make any changes to the code.

    ```bash
    npm start
    ```

    Load [http://localhost:8080/](http://localhost:8080/) on your web browser.

1. For deployment, run `npm build` and upload `build/` to your server.

## Server

While this is mainly a static page UI, there is a Node.JS-based server component to help with pushing of data onto IPFS and encryption.

1. Start the following daemons:

    1. [IPFS node](https://ipfs.io)
    1. Ethereum Web3 provider, either [Geth](https://github.com/ethereum/go-ethereum) or [Parity](https://ethcore.io/parity.html)

1. Configure, if required. Start server with, `npm run server`.

## Credits

## License

MIT · [U-Zyn Chua](http://uzyn.com)
