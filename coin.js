class Coin {
    constructor(options) {
        this._id = options.id;
        this._name = options.name;
        this._symbol = options.symbol;
        this._rank = options.rank;
        this._price_usd = options.price_usd;
        this._24h_volume_usd = options._24h_volumne_usd;
        this._market_cap_usd = options.market_cap_usd;
        this._available_supply = options.available_supply;
        this._total_supply = options.total_supply;
        this._max_supply = options.max_supply;
        this._percent_change_1h = options.percent_change_1h;
        this._percent_change_7d = options.percent_change_7d;
        this._last_updated = options.last_updated;
        this._amt_owned = 0;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get amt_owned() {
        return this._amt_owned;
    }

    get price_usd() {
        return this._price_usd;
    }

    set amt_owned(value) {
        this._amt_owned = value;
    }

    getCoinInfo() {
        return axios.get(`https://api.coinmarketcap.com/v1/ticker/${this._id}/`)
    }
}