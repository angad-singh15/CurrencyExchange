let currencies = [
  {
    name: "US Dollar",
    abbreviation: "USD",
    symbol: "\u0024",
    flagURL: "https://www.countryflags.io/us/shiny/64.png"
  },
  {
    name: "Euro",
    abbreviation: "EUR",
    symbol: "\u20AC",
    flagURL: "https://www.countryflags.io/eu/shiny/64.png"
  },
  {
    name: "Japanese Yen",
    abbreviation: "JPY",
    symbol: "\u00A5",
    flagURL: "https://www.countryflags.io/jp/shiny/64.png"
  },
  {
    name: "British Pound",
    abbreviation: "GBP",
    symbol: "\u00A3",
    flagURL: "https://www.countryflags.io/gb/shiny/64.png"
  },
  {
    name: "Australian Dollar",
    abbreviation: "AUD",
    symbol: "\u0024",
    flagURL: "https://www.countryflags.io/au/shiny/64.png"
  },
  {
    name: "Canadian Dollar",
    abbreviation: "CAD",
    symbol: "\u0024",
    flagURL: "https://www.countryflags.io/ca/shiny/64.png"
  },
  {
    name: "Swiss Franc",
    abbreviation: "CHF",
    symbol: "\u0043\u0048\u0046",
    flagURL: "https://www.countryflags.io/ch/shiny/64.png"
  },
  {
    name: "Chinese Yuan Renminbi",
    abbreviation: "CNY",
    symbol: "\u00A5",
    flagURL: "https://www.countryflags.io/cn/shiny/64.png"
  },
  {
    name: "Swedish Krona",
    abbreviation: "SEK",
    symbol: "\u006B\u0072",
    flagURL: "https://www.countryflags.io/se/shiny/64.png"
  },
  {
    name: "New Zealand Dollar",
    abbreviation: "NZD",
    symbol: "\u0024",
    flagURL: "https://www.countryflags.io/nz/shiny/64.png"
  },
  {
    name: "Mexican Peso",
    abbreviation: "MXN",
    symbol: "\u0024",
    flagURL: "https://www.countryflags.io/mx/shiny/64.png"
  },
  {
    name: "Singapore Dollar",
    abbreviation: "SGD",
    symbol: "\u0024",
    flagURL: "https://www.countryflags.io/sg/shiny/64.png"
  },
  {
    name: "Hong Kong Dollar",
    abbreviation: "HKD",
    symbol: "\u0024",
    flagURL: "https://www.countryflags.io/hk/shiny/64.png"
  },
  {
    name: "Norwegian Krone",
    abbreviation: "NOK",
    symbol: "\u006B\u0072",
    flagURL: "https://www.countryflags.io/no/shiny/64.png"
  },
  {
    name: "South Korean Won",
    abbreviation: "KRW",
    symbol: "\u20A9",
    flagURL: "https://www.countryflags.io/kr/shiny/64.png"
  },
  {
    name: "Turkish Lira",
    abbreviation: "TRY",
    symbol: "\u20BA",
    flagURL: "https://www.countryflags.io/tr/shiny/64.png"
  },
  {
    name: "Russian Ruble",
    abbreviation: "RUB",
    symbol: "\u20BD",
    flagURL: "https://www.countryflags.io/ru/shiny/64.png"
  },
  {
    name: "Indian Rupee",
    abbreviation: "INR",
    symbol: "\u20B9",
    flagURL: "https://www.countryflags.io/in/shiny/64.png"
  },
  {
    name: "Indonesian Rupiah",
    abbreviation: "IDR",
    symbol: "\u0052\u0070",
    flagURL: "https://www.countryflags.io/id/shiny/64.png"
  },
  {
    name: "Thai Baht",
    abbreviation: "THB",
    symbol: "\u0E3F",
    flagURL: "https://www.countryflags.io/th/shiny/64.png"
  }
];

//Global variables and Event listeners
const addCurrencyBtn = document.querySelector(".add-btn");
const addCurrencyList = document.querySelector(".currency-list");
const currencyList = document.querySelector(".currencies");

let baseCurrency;
let baseCurrencyPrice;
const displayInitialCurrencyList = ["USD", "INR", "EUR", "GBP"]

const apiURL = "https://api.exchangeratesapi.io/latest";

addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);
addCurrencyList.addEventListener("click", addCurrencyListClick);
currencyList.addEventListener("click", removeCurrency);

function addCurrencyBtnClick(event) {
  addCurrencyBtn.classList.toggle("open");
}

//add currencies from currencies list to html code
function addToCurrencyList() {
  for (let i = 0; i < currencies.length; i++) {
    addCurrencyList.insertAdjacentHTML(
      "beforeend",
      `<li currency-data=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} : ${currencies[i].name}</span></li>`
    );
  }
}

function addToCurrencies() {
  for (let i = 0; i < displayInitialCurrencyList.length; i++) {
    const currency = currencies.find(x => x.abbreviation === displayInitialCurrencyList[i]);
    if (currency) newCurrenciesItem(currency);
  }
}

//adds currencies to main display
function newCurrenciesItem(currency) {
  if (currencyList.childElementCount === 0) {
    baseCurrency = currency.abbreviation;
    baseCurrencyPrice = 0;
  }
  addCurrencyList.querySelector(`[currency-data=${currency.abbreviation}]`).classList.add("disabled");
  const baseCurrRate = currencies.find(x => x.abbreviation === baseCurrency).rate;
  const exchangeRate = currency.abbreviation === baseCurrency ? 1 : (currency.rate / baseCurrRate).toFixed(5);
  const userInput = baseCurrencyPrice ? (baseCurrencyPrice * exchangeRate).toFixed(5) : "";
  currencyList.insertAdjacentHTML(  //inserts each currency li item to html <ul>
    "beforeend",
    `<li class="currency ${currency.abbreviation === baseCurrency ? "base-currency" : ""}" id=${currency.abbreviation}>
      <img src=${currency.flagURL} class="flag">
      <div class="data">
          <br>
          <p class="input"><span class="currency-flag">${currency.symbol}</span><input placeholder="0.00000" value=${userInput}></p>
          <p class="curr-name">${currency.abbreviation} : ${currency.name}</p>
          <p class="base-curr-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
      </div>
      <span class="remove-currency">&times;</span>
      </li>`
  )
}

function addCurrencyListClick(event) {
  const itemClicked = event.target.closest("li");
  if (!itemClicked.classList.contains("disabled")) {
    const newCurr = currencies.find(x => x.abbreviation === itemClicked.getAttribute("currency-data"));
    if (newCurr) newCurrenciesItem(newCurr);
  }
}

function removeCurrency(event) {
  if (event.target.classList.contains("remove-currency")) {
    const node = event.target.parentNode;
    node.remove()
    addCurrencyList.querySelector(`[currency-data=${node.id}]`).classList.remove("disabled");
    if (node.classList.contains("base-currency")) {
      const newBaseCurrencyItem = currencyList.querySelector(".currency");
      if (newBaseCurrencyItem) {
        setNewBaseCurrency(newBaseCurrencyItem);
        baseCurrencyPrice = Number(newBaseCurrencyItem.querySelector(".input input").value);
      }
    }
  }
}

//sets new base currency according to the user's choice of currency
function setNewBaseCurrency(newBaseCurrencyItem) {
  newBaseCurrencyItem.classList.add("base-currency");
  baseCurrency = newBaseCurrencyItem.id;
  const baseCurrencyPrice = currencies.find(currency => currency.abbreviation === baseCurrency).rate;
  currencyList.querySelectorAll(".currency").forEach(x => {
    const currencyRate = currencies.find(curr => curr.abbreviation === x.id).rate;
    const exchRate = x.id === baseCurrency ? 1 : (currencyRate / baseCurrencyPrice).toFixed(5);
    x.querySelector(".base-curr-rate").textContent = `1 ${baseCurrency} = ${exchRate} ${x.id}`;
  });
}

currencyList.addEventListener("input", changeCurrencyInput);

//change the respective input field values for all currencies according to the base currency input
function changeCurrencyInput(event) {
  const isNewBaseCurr = event.target.closest("li").id !== baseCurrency;
  if (isNewBaseCurr) {
    currencyList.querySelector(`#${baseCurrency}`).classList.remove("base-currency");
    setNewBaseCurrency(event.target.closest("li"));
  }
  const newBaseCurrPrice = isNaN(event.target.value) ? 0 : Number(event.target.value);
  if (baseCurrencyPrice !== newBaseCurrPrice || isNewBaseCurr) {
    baseCurrencyPrice = newBaseCurrPrice;
    const baseCurrencyRate = currencies.find(currency => currency.abbreviation === baseCurrency).rate;
    currencyList.querySelectorAll(".currency").forEach(x => {
      if (x.id !== baseCurrency) {
        const currencyRate = currencies.find(curr => curr.abbreviation === x.id).rate;
        const exchRate = x.id === baseCurrency ? 1 : (currencyRate / baseCurrencyPrice).toFixed(5);
        x.querySelector(".input input").value = exchRate * baseCurrencyPrice !== 0 ? (exchRate * baseCurrencyPrice).toFixed(5) : "";
      }
    });
  }
}
//get exchange rates and date from api url 
//TODO - bug in exhange rates
fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    document.querySelector(".date").textContent = data.date;
    data.rates["EUR"] = 1;
    currencies = currencies.filter(curr => data.rates[curr.abbreviation]);
    currencies.forEach(currency => currency.rate = data.rates[currency.abbreviation]);
    addToCurrencyList();
    addToCurrencies();
  })
  .catch(err => console.log(err));
