#!/usr/bin/env node
const axios = require('axios');

async function main() {
    try {
        console.log(process.argv);
        let currency = 'USD';

        if(process.argv[2] ){
            currency = process.argv[2].toUpperCase();
        }
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    
        if(!response.data.bpi[currency]) {
            throw new Error(`devise inconnue: ${currency}`);
        }
        const rate = response.data.bpi[currency].rate;
        const updated = response.data.time.updated;
    
        console.log(`> 1 BTC = ${rate} ${currency} (${updated})`);
    } catch (error) {
        console.log(error.toString());
        
    }
}

main();