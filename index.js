import { countryList } from "./codes.js";
let myform = document.querySelector("form")
let country= "https://flagsapi.com/";
let base_currency = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let amount = document.querySelector("input");
let from_image= document.querySelector(".from-image");
let to_image = document.querySelector(".to-image"); 
let from_curr = document.querySelector("#from-currency");
let to_curr = document.querySelector("#to-currency");
let from_text = document.querySelector("#from-text");
let to_text = document.querySelector("#to-text")
let rate = document.querySelector(".rate");
let from_currency = "AED";
let to_currency="AED";
for(let i in countryList){
    let curr = document.createElement("option");
    curr.value = i;
    curr.textContent=i;
    from_curr.appendChild(curr);
    let curr_1 = document.createElement("option");
    curr_1.value = i;
    curr_1.textContent=i;
    to_curr.appendChild(curr_1);
}
function change_flag(curr_1,from_image){
    let country_1 = countryList[curr_1];
    from_image.src = `${country}/${country_1}/flat/64.png`;

}
function change_text(curr_1,from_text){
    from_text.innerText = `${curr_1}`;
}
async function change_rate(from_currency,to_currency){
    let val = amount.value;
    let exchange =  await fetch(`${base_currency}/${from_currency.toLowerCase()}.json`);
    let rates = await exchange.json();
    if(amount.value == ""||val<1){
        val = 1;
        amount.value = "1";
    }
    let value = rates[from_currency.toLowerCase()][to_currency.toLowerCase()]*val;
    rate.innerText=`${val} ${from_currency} = ${value} ${to_currency}`
    
}
change_rate("USD","INR");

from_curr.addEventListener("change",(event)=>{
    from_currency=event.target.value;
    change_flag(event.target.value,from_image);
    change_text(event.target.value,from_text);
    change_rate(from_currency,to_currency);
})
to_curr.addEventListener("change",(event)=>{
    to_currency=event.target.value;
    change_flag(event.target.value,to_image);

    change_text(event.target.value,to_text);
    change_rate(from_currency,to_currency);

})

myform.addEventListener("submit",(e)=>{
    e.preventDefault();
    change_rate(from_currency,to_currency);
    amount.value = "1";
    
})
