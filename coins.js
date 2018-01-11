class Coins {
    constructor() {
        this._coins = [];
        this._initialInvestment = 0;
        this._totalWorth = 0;
    }

    get coins() {
        return this._coins;
    }

    get initialInvestment() {
        return this._initialInvestment;
    }

    get totalWorth() {
        return this._totalWorth;
    }

    set totalWorth(value) {
        this._totalWorth = value;
    }

    set initialInvestment(value) {
        this._initialInvestment = value;
    }

    calcTotalWorth() {
        this._totalWorth = 0;
        this._coins.forEach(c => {
            this._totalWorth += (c.price_usd * c.amt_owned);
        });
    }

    addCoin(coin) {
        this._coins.push(coin);
    }

    getCoin(coin) {
        return this._coins.find(c => { return c.id === coin });
    }

    async getAllCoins() {
        await axios.get("https://api.coinmarketcap.com/v1/ticker/")
            .then((response) => {
                let data = response.data;
                data.forEach(c => {
                    console.log(c.id);
                    let coinToAdd = new Coin({
                        id: c.id,
                        name: c.name,
                        symbol: c.symbol,
                        rank: c.rank,
                        price_usd: c.price_usd,
                        price_btc: c.price_btc,
                        _24h_volume_usd: c["24h_volume_usd"],
                        market_cap_usd: c.market_cap_usd,
                        available_supply: c.available_supply,
                        total_supply: c.total_supply,
                        max_supply: c.max_supply,
                        percent_change_1h: c.percent_change_1h,
                        percent_change_24h: c.percent_change_24h,
                        percent_change_7d: c.percent_change_7d,
                        last_updated: c.last_updated
                    })
                    coins.addCoin(coinToAdd);
                    switch (c.id) {
                        case "bitcoin":
                            coinToAdd.amt_owned = 0.03849177;
                            break;
                        case "ethereum":
                            coinToAdd.amt_owned = 0.11889641;
                            break;
                        case "litecoin":
                            coinToAdd.amt_owned = 0.35089844;
                            break;
                        default:
                            coinToAdd.amt_owned = 0;
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}


















// let coins = this;
// await axios.all(coins.buildCoinFuncs())
//     .then(axios.spread(function (...coinNames) {
//         Array.from(arguments).forEach(coin => {
//             let coinInfo = coin.data[0];
//             let curCoin = coins.getCoin(coinInfo.id);
//             curCoin.price_usd = coinInfo.price_usd;
//             coins.totalWorth = coins.totalWorth + (curCoin.price_usd * curCoin.amt);
//         });
//     }))
//     .catch(function (error) {
//         console.log(error);
//     });