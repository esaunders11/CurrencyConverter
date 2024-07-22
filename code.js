
let rate1 = document.querySelector(".rate1");
let rate2 = document.querySelector(".rate2");
let resultBtn = document.querySelector(".result");
let selects = document.querySelectorAll(".options select");
let sel1 = selects[0];
let sel2 = selects[1];
let inputs = document.querySelectorAll(".input input");
let inp1 = inputs[0];
let inp2 = inputs[1];

let rates = {}

let exchangeRates = "https://v6.exchangerate-api.com/v6/c0ac49f8c1010f226f5a24c7/latest/USD";

fetchRates();

async function fetchRates() {
    let res = await fetch(exchangeRates);
    res = await res.json();
    rates = res.conversion_rates;
    populate();
}


function populate(){
    let val = "";
    Object.keys(rates).forEach(code=>{
        let str = `<option value="${code}">${code}</option>`;
        val += str;
    });
    selects.forEach((s) => (s.innerHTML = val));
}

function convert(val, fromCurr, toCurr) {
    let res = (val/rates[fromCurr]) * rates[toCurr];
    let res1 = res.toFixed(3);
    return res1 == 0.0 ? res.toFixed(5) : res1;
}

function displayRate() {
    let v1 = sel1.value;
    let v2 = sel2.value;

    let val = convert(1, v1, v2);

    rate1.innerHTML = `1 ${v1} equals`;
    rate2.innerHTML = `${val} ${v2}`;
}

resultBtn.addEventListener("click", ()=>{
    let fromCurr = sel1.value;
    let fromVal = parseFloat(inp1.value);
    let toCurr = sel2.value;

    if(isNaN(fromVal)) {
        alert("Enter a Number");
    }
    else {
        let cVal = convert(fromVal, fromCurr, toCurr);
        inp2.value = cVal;
    }
});

selects.forEach(s=>s.addEventListener("change", displayRate));

document.querySelector(".swap").addEventListener("click", ()=>{
    let in1 = inp1.value;
    let in2 = inp2.value;
    let op1 = sel1.value;
    let op2 = sel2.value;

    inp2.value = in1;
    inp1.value = in2;

    sel2.value = op1;
    sel1.value = op2;

    displayRate()
});