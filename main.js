

let coins = new Coins;

coins.initialInvestment = 750;

function loading() {
    let loadingDiv = document.querySelector("#loading");
    let loadImg = loadingDiv.querySelector("img");
    let loadingCoins = ["bitcoin", "ethereum", "ripple", "bitcoin-cash", "cardano", "litecoin", "nem", "stellar", "iota", "eos", "neo", "dash", "tron", "monero", "bitcoin-gold", "ethereum-classic", "icon", "lisk", "omisego", "verge", "binance-coin", "zcash", "bytecoin-bcn", "siacoin", "ardor", "bitconnect", "populous", "stratis", "status", "bitshares", "kucoin-shares", "dogecoin"];
    let c = 0;
    loadingDiv.classList.remove("hidden");
    loadImg.src = `${window.location}images/${"bitcoin"}.png`;
    setInterval(() => {
        loadImg.src = `${window.location}images/${loadingCoins[c]}.png`;
        c === loadingCoins.length-1 ? c = 0 : c++;
    }, 1000);
}

// loading();

coins.getAllCoins().then(() => {
    loadCoinData();
});

function loadCoinData() {

    let coinContainers = Array.from(document.querySelector("#coins").querySelectorAll(".container"));

    coinContainers.forEach(c => {
        c.remove();
    });

    coins.calcTotalWorth();


    let coinsDiv = document.querySelector("#coins");
    let coinsTemplate = document.querySelector("#coin-template");
    let coinStatsDiv = document.querySelector("#coin-stats");
    let initInvest = coinStatsDiv.querySelector(".investment");
    let tworth = coinStatsDiv.querySelector(".tworth");
    let tpl = coinStatsDiv.querySelector(".tpl");
    let pl = coinStatsDiv.querySelector(".pl");

    initInvest.innerText = parseFloat(coins.initialInvestment).toFixed(2);
    tworth.innerText = parseFloat(coins.totalWorth).toFixed(2);
    tpl.innerText = parseFloat(coins.totalWorth - coins.initialInvestment).toFixed(2);
    pl.innerText = parseFloat(((coins.totalWorth / coins.initialInvestment) * 100) - 100).toFixed(2) + "%";
    coinStatsDiv.classList.remove("hidden");
    coins.coins.forEach(coin => {
        let coinsTempClone = coinsTemplate.content.cloneNode(true);
        let logo = coinsTempClone.querySelector(".logo");
        let title = coinsTempClone.querySelector(".coin-name");
        let price = coinsTempClone.querySelector(".price");
        let amt = coinsTempClone.querySelector(".amount");
        let worth = coinsTempClone.querySelector(".cworth");
        let rank = coinsTempClone.querySelector(".rank-num");

        rank.innerText = coin.rank;
        logo.style.backgroundImage = `url(${window.location}images/${coin.id}.png)`
        title.innerText = coin.name;
        price.innerText = parseFloat(coin.price_usd).toFixed(2);
        amt.innerText = coin.amt_owned;
        worth.innerText = parseFloat(coin.price_usd * coin.amt_owned).toFixed(2);
        if(coin.amt_owned > 0) {
            coinsTempClone.querySelector(".container").classList.add("owned");
        }
        coinsDiv.appendChild(coinsTempClone);
    })
}