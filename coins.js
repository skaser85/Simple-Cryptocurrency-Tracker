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

    async calcTotalWorth() {
        this._totalWorth = 0;
        let coins = this;
        await axios.all(coins.buildCoinFuncs())
                .then(axios.spread(function (...coinNames) {
                    Array.from(arguments).forEach(coin => {
                        let coinInfo = coin.data[0];
                        let curCoin = coins.getCoin(coinInfo.id);
                        curCoin.price_usd = coinInfo.price_usd;
                        coins.totalWorth = coins.totalWorth + (curCoin.price_usd * curCoin.amt);
                    });
                }))
                .catch(function (error) {
                    console.log(error);
                });
    }

    addCoin(coin) {
        this._coins.push(coin);
    }

    getCoin(coin) {
        return this._coins.find(c => { return c.name === coin });
    }

    coinNames() {
        let names = [];
        this._coins.forEach(c => {
            names.push(c.name);
        });
        return names;
    }

    buildCoinFuncs() {
        let funcs = [];
        this._coins.forEach(c => {
            funcs.push(c.getCoinInfo());
        });
        return funcs;
    }
}