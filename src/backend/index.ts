import { Server } from 'azle';
import express from 'express';
import { CovalentClient } from "@covalenthq/client-sdk";


export default Server(() => {
    const app = express();

    app.use(express.json());

    app.post('/covalent', async (req, res) => {

        const client = new CovalentClient(process.env.COVALENT_API_KEY || '');
        const resp = await client.BalanceService.getNativeTokenBalance("eth-mainnet","0xb7cF60b80B807f26D607A06718793b1f0a1DF296");
        const ethBalance = resp.data.items[0].balance ? Number(resp.data.items[0].balance) / 18 : 0;
    
        res.send(pageFromTemplate(
            'https://raw.githubusercontent.com/demergent-labs/azle/main/logo/logo.svg',
            `Your ETH balance is ${ethBalance}`,
            'https://zrhl6-cqaaa-aaaao-a3i4a-cai.raw.icp0.io/covalent'
        ))
    });
    app.get('/', (req, res) => {
        res.send(pageFromTemplate(
            'https://raw.githubusercontent.com/demergent-labs/azle/main/logo/logo.svg',
            'Get your ETH token balance',
            'https://zrhl6-cqaaa-aaaao-a3i4a-cai.raw.icp0.io/covalent',
        ))
    });
    return app.listen();
});

let pageFromTemplate = (
    imageUrl: string,
    button1Text: string,
    apiUrl: string
) => `
<!DOCTYPE html>
<html lang='en'>

<head>
    <meta charset='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='next-size-adjust' />
    <meta property='fc:frame' content='vNext' />
    <meta property='fc:frame:button:1' content='${button1Text}' />

    <meta property="fc:frame:button:2" content='Get Your Wallet Info' />
    <meta property="fc:frame:button:2:action" content="link" />
    <meta property="fc:frame:button:2:target" content="https://goldrush-wallet-portfolio-ui.vercel.app//" />

    <meta property='fc:frame:image' content='${imageUrl}' />
    <meta property='fc:frame:post_url' content='${apiUrl}' />
    <meta property='og:title' content='Azle farcaster frame' />
    <title>Azle farcaster frame</title>
</head>

</html>
`;