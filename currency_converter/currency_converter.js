
const currency_lst = ["NGN", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BHD", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BTN", "BWP", "BYN", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CUP", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ERN", "ETB", "EUR", "FJD", "FKP", "FOK", "GBP", "GEL", "GGP", "GHS", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "IMP", "INR", "IQD", "IRR", "ISK", "JEP", "JMD", "JOD", "JPY", "KES", "KGS", "KHR", "KID", "KMF", "KRW", "KWD", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "LYD", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRU", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NIO", "NOK", "NPR", "NZD", "OMR", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SDG", "SEK", "SGD", "SHP", "SLE", "SLL", "SOS", "SRD", "SSP", "STN", "SYP", "SZL", "THB", "TJS", "TMT", "TND", "TOP", "TRY", "TTD", "TVD", "TWD", "TZS", "UAH", "UGX", "USD", "UYU", "UZS", "VES", "VND", "VUV", "WST", "XAF", "XCD", "XDR", "XOF", "XPF", "YER", "ZAR", "ZMW", "ZWL"]
const submitButton = document.querySelector('button');
const dropList = document.querySelectorAll('select');

for (let i = 0; i < dropList.length; i++) {
    for (let currency_code in currency_lst) {
        let selected = i == 0 ? currency_lst[currency_code] == "NGN" ? "selected" : "" : currency_lst[currency_code] == "USD" ? "selected" : "";
        let optionTag = `<option value="${currency_lst[currency_code]}" ${selected}>${currency_lst[currency_code]}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

}



const sourceCurrency = document.getElementById('source_currency');
const destinationCurrency = document.getElementById('destination_currency');

submitButton.addEventListener('click', e => {

    computeExchangeRate();

});

function computeExchangeRate() {

    const amount = document.getElementById('inputAmount');
    const exchangeRate = document.getElementById('exchangeRateTxt');
    const currentExRate = document.getElementById('currentExRate');
    const amountVal = amount.value;

    // Validating amount before outputing the exchange
    if (amountVal <= 0) {
        alert("Invalid amount. Please enter a valid amount and try again");

        return;
    } else if (amountVal > 10000) {
        alert("You cannot convert amount greater than 10,000");
        return;
    }


    exchangeRate.innerText = `Loading...`;

    const sourceCurrency = document.getElementById('source_currency').value;
    const destinationCurrency = document.getElementById('destination_currency').value;







    let exchangeAPI = `https://v6.exchangerate-api.com/v6/ef6c1fe9bad413bc27c74a5d/latest/${sourceCurrency}`;



    fetch(exchangeAPI).then(response => response.json()).then(result => {
        const exchangeRate = result.conversion_rates[destinationCurrency];

        currentExRate.innerText = `Current exchange rate: 1 ${sourceCurrency} = ${exchangeRate}  ${destinationCurrency}`;

        exchangeRateTxt.innerText = `Transaction Amount: ${amountVal} ${sourceCurrency} = ${exchangeRate * amountVal} ${destinationCurrency}`;
        const date = new Date();

        lstExchangeRateUpdate.innerText = `Calculation timestamp: ${date.toLocaleDateString('en-GB')} at ${date.toLocaleTimeString('en-GB')}`;

    });

}


