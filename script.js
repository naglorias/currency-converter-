'use strict';
// Variables
const API_KEY = '############################'; // API key --Get Your own API key from http://bit.ly/3JEgxHh
const fromCurrencyInput = document.getElementById('from-currency');
const toCurrencyInput = document.getElementById('to-currency');
const fromCurrencyList = document.getElementById('from-currency-list');
const toCurrencyList = document.getElementById('to-currency-list');
const convertButton = document.querySelector('.convert');
/* When window is loaded currency symbols fetched and diplayed as select options element  */
window.addEventListener('load', () =>{
    fetch("https://api.apilayer.com/exchangerates_data/symbols",{
        method: 'GET',
        headers: {
            "apikey" :`${API_KEY}`
        }
    }) .then(response => response.json())
    .then(result => {
        console.log(result)
        Object.entries(result.symbols).forEach(entry => {
            const [key,value] = entry;
            let createOption = document.createElement('option');
            createOption.setAttribute('value',`${key}`);
            createOption.textContent =`${key}:${value}`;
            fromCurrencyList.appendChild(createOption);
            toCurrencyList.insertAdjacentHTML('beforeend',`<option value="${key}">${key}: ${value}</option>`);
        })
    })
   .catch(error => console.log('error', error));

})
 
 

/* Function to convert entered money value from currency to another */
const checkInputValue = () => {
    const fromValue = fromCurrencyInput.value;
    const fromListValue = fromCurrencyList.value;
    const toListValue = toCurrencyList .value;
    if (fromValue == '') { 
        alert('Please enter your amount');
    }
    else if(isNaN(fromValue)) {
        alert('Please enter Number value!');
    }else{
fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toListValue}&from=${fromListValue}&amount=${fromValue}`,{
    method: 'GET',
    headers: {
        "apikey" :`${API_KEY}`
    }
}
).
then(response => response.json()).
then(response=>{ toCurrencyInput.value = response.result.toFixed(2)}).
catch(err => console.log(err));
    }
}
 
convertButton.addEventListener('click', checkInputValue)









