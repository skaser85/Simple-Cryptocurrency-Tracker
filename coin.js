class Coin {
    constructor(name, amt) {
        this._name = name;
        this._amt = amt;
    }

    get name() {
        return this._name;
    }

    get amt() {
        return this._amt;
    }

    set name(value) {
        this._name = value;
    }

    set amt(value) {
        this._amt = value;
    }

    getCoinInfo() {
        return axios.get(`https://api.coinmarketcap.com/v1/ticker/${this._name}/`)
    }
}