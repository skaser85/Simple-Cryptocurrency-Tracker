

let coins = new Coins;

coins.initialInvestment = 750;

coins.getAllCoins().then(() => {
    loadCoinData();
});

// coins.addCoin(new Coin("bitcoin", 0.03849177));
// coins.addCoin(new Coin("ethereum", 0.11889641));
// coins.addCoin(new Coin("litecoin", 0.35089844));

let getDataBtn = document.querySelector("#get-coin-data");
let getAllDataBtn = document.querySelector("#get-coin-data-all");
let addCoinBtn = document.querySelector("#add-coin");
let coinName = document.querySelector("#coin-name-full");
let coinAmt = document.querySelector("#amt-owned");

addCoinBtn.addEventListener("click", (e) => {
    coins.addCoin(new Coin(coinName.value, coinAmt.value));
    calcCoins();
});

getDataBtn.addEventListener("click", (e) => {
    calcCoins();
});

getAllDataBtn.addEventListener("click", (e) => {
    // this needs to happen when the page loads and then keep the
    // data in the Coin class for later use - can't make more than
    // 10 requests a minute - update all at once
});

function loadCoinData() {
    let loadingDiv = document.querySelector("#loading");

    loadingDiv.classList.remove("hidden");

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

        logo.style.backgroundImage = `url(${window.location}images/${coin.id}.png)`
        title.innerText = coin.name;
        price.innerText = parseFloat(coin.price_usd).toFixed(2);
        amt.innerText = coin.amt_owned;
        worth.innerText = parseFloat(coin.price_usd * coin.amt_owned).toFixed(2);
        coinsDiv.appendChild(coinsTempClone);
    })

    loadingDiv.classList.add("hidden");
}