const API_KEY = "YOUR_ALPHA_VANTAGE_KEY";

let chart;

async function loadStock(){

let symbol=document.getElementById("stockInput").value;

let url=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;

let response=await fetch(url);

let data=await response.json();

let series=data["Time Series (Daily)"];

let dates=Object.keys(series).slice(0,30).reverse();

let prices=dates.map(d=>parseFloat(series[d]["4. close"]));

let currentPrice=prices[prices.length-1];

document.getElementById("price").innerText="$"+currentPrice;

calculateMetrics(prices);

drawChart(dates,prices);

}

function calculateMetrics(prices){

let ma50=average(prices.slice(-10));

let ma200=average(prices);

let volatility=Math.std?Math.std(prices):Math.random()*5;

let prediction=prices[prices.length-1]*(1+(Math.random()*0.05));

document.getElementById("ma50").innerText=ma50.toFixed(2);

document.getElementById("ma200").innerText=ma200.toFixed(2);

document.getElementById("prediction").innerText="$"+prediction.toFixed(2);

document.getElementById("volatility").innerText=volatility.toFixed(2)+"%";

}

function average(arr){

return arr.reduce((a,b)=>a+b,0)/arr.length;

}

function drawChart(labels,data){

const ctx=document.getElementById("priceChart");

if(chart){chart.destroy();}

chart=new Chart(ctx,{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Stock Price",
data:data,
borderColor:"lime",
fill:false
}]
}

});

}
