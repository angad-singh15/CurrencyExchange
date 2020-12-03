let currencies = [
    {
      name: "US Dollar",
      abbreviation: "USD",
      symbol: "\u0024",
      flagURL: "https://www.countryflags.io/us/shiny/64.png",
      rate: 1.2223 //for testing
    },
    {
      name: "Euro",
      abbreviation: "EUR",
      symbol: "\u20AC",
      flagURL: "https://www.countryflags.io/eu/shiny/64.png",
      rate: 2.333
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
      flagURL: "https://www.countryflags.io/gb/shiny/64.png",
      rate: 1
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
      flagURL: "https://www.countryflags.io/in/shiny/64.png",
      rate: 1.34555
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

  const addCurrencyBtn = document.querySelector(".add-btn");
  const addCurrencyList = document.querySelector(".currency-list");
  const currencyList = document.querySelector(".currencies");

  let baseCurrency;
  let baseCurrencyPrice;
  const displayInitialCurrencyList = ["USD", "INR", "EUR", "GBP"]

  addCurrencyBtn.addEventListener("click", addCurrencyBtnClick);

  function addCurrencyBtnClick(event){
    addCurrencyBtn.classList.toggle("open");
  }

  //add currencies from currencies list to html code
  function addToCurrencyList(){
    for(let i=0; i<currencies.length; i++){
      addCurrencyList.insertAdjacentHTML(
        "beforeend",
        `<li currency-data=${currencies[i].abbreviation}>
        <img src=${currencies[i].flagURL} class="flag"><span>${currencies[i].abbreviation} : ${currencies[i].name}</span></li>`
      );
    }
  }

  function addToCurrencies() {
    for(let i=0; i<displayInitialCurrencyList.length; i++){
      const currency = currencies.find(x => x.abbreviation === displayInitialCurrencyList[i]);
      if(currency) newCurrenciesItem(currency);
    }
  }

  function newCurrenciesItem(currency){
    if(currencyList.childElementCount === 0){
      baseCurrency = currency.abbreviation;
      baseCurrencyPrice = 0;
    }
    addCurrencyList.querySelector(`[currency-data=${currency.abbreviation}]`).classList.add("disabled");
    const baseCurrRate = currencies.find(x => x.abbreviation === baseCurrency).rate;
    const exchangeRate = currency.abbreviation === baseCurrency ? 1 : (currency.rate/baseCurrRate).toFixed(5);
    const userInput = baseCurrencyPrice ? (baseCurrencyPrice*exchangeRate).toFixed(5) : "";

    currencyList.insertAdjacentHTML(
      "beforeend",
      `<li class="currency ${currency.abbreviation===baseCurrency ? "base-currency" : ""}" id=${currency.abbreviation}>
      <img src=${currency.flagURL} class="flag">
      <div class="data">
          <br>
          <p class="input"><span class="currency-flag">${currency.symbol}</span><input placeholder="0.00000" value=${userInput}></p>
          <p class="curr-name">${currency.abbreviation} : ${currency.name}</p>
          <p class="base-curr-rate">1 ${baseCurrency} = ${exchangeRate} ${currency.abbreviation}</p>
      </div>
      <button class="remove-btn" type="button" name="close">
      <span class="remove-currency">&times;</span>
      </button>
      </li>`
    )
  }

  addToCurrencyList();
  addToCurrencies();
