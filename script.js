const API_KEY = "YOUR_API_KEY";

async function loadStock(){

let symbol = document.getElementById("stockInput").value;

let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

let response = await fetch(url);
let data = await response.json();

let series = data["Time Series (Daily)"];

let dates = Object.keys(series).slice(0,30).reverse();
let prices = dates.map(d => series[d]["4. close"]);

createChart(dates,prices);

}

function createChart(labels,data){

const ctx = document.getElementById("priceChart");

new Chart(ctx,{
type:'line',
data:{
labels:labels,
datasets:[{
label:'Stock Price',
data:data,
borderColor:'lime',
fill:false
}]
}
});

}
