#!/usr/bin/env node
const axios = require('axios');

async function main() {
    const currency = process.argv[2] ? process.argv[2].toUpperCase() : 'USD';
    try {
        console.log(process.argv);

        const {data} = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json'); // destructuring

        console.log(data);
    
        if(!data.bpi[currency]) {
            throw new Error(`devise inconnue: ${currency}`);
        }
        const rate = data.bpi[currency].rate;
        const updated = data.time.updated;
    
        console.log(`> 1 BTC = ${rate} ${currency} (${updated})`);
    } catch (error) {
        console.log(error.toString());
        
    }
}

main();