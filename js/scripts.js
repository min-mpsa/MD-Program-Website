let data = {
    is_qualify: false,
    latestMonth: "April 2022",
    numOfRepairs: "3",
    numOfReplacements: "14",
    latestMonthRepairRatio: "18%",
    ytdRepairRatio: "20%",
    nextMonthRepairs: 0,
    nextMonthReplacements: 0,
    yearEndRebateAmt: 0,
    repairEarningsLatestMonth: "3000",
    glassLaborEarningsLatestMonth: "3000",
    rebateEarningsLatestMonth: "0",
    totalEarningsLatestMonth: "6000",
    cumulativeRebateEarnings: "100",
    glassLaborEarnings: Array(12).fill(0),
    potentialTotalEarnings: Array(12).fill(0),
    potentialRebateEarnings: Array(12).fill(0),
    predictedRepairRatio: Array(12).fill(0)
  };

let monthArray = [];
let shopName;



document.getElementById("latest-month").textContent = data.latestMonth;
document.getElementById("num-of-repairs").textContent = data.numOfRepairs;
document.getElementById("num-of-replacements").textContent = data.numOfReplacements;
document.getElementById("latest-month-repair-ratio").textContent = data.latestMonthRepairRatio;
document.getElementById("repair-earnings-latest-month").textContent = "$" + data.repairEarningsLatestMonth;
document.getElementById("glass-labor-earnings-latest-month").textContent = "$" + data.glassLaborEarningsLatestMonth;
document.getElementById("rebate-earnings-latest-month").textContent = "$" + data.rebateEarningsLatestMonth;
document.getElementById("total-earnings-latest-month").textContent = "$" + data.totalEarningsLatestMonth;
document.getElementById("latest-month2").textContent = data.latestMonth;
document.getElementById("ytd-repair-ratio").textContent = data.ytdRepairRatio;
document.getElementById("cumulative-rebate-earnings").textContent = "$" + data.cumulativeRebateEarnings;


function displayContentBasedOnIsQualify() {
  const isQualifyTrueElements = document.querySelectorAll('.is-qualify-true');
  const isQualifyFalseElements = document.querySelectorAll('.is-qualify-false');

  if (data.is_qualify) {
    isQualifyTrueElements.forEach(element => element.style.display = 'block');
    isQualifyFalseElements.forEach(element => element.style.display = 'none');
  } else {
    isQualifyTrueElements.forEach(element => element.style.display = 'none');
    isQualifyFalseElements.forEach(element => element.style.display = 'block');
  }
}

displayContentBasedOnIsQualify();

function populateDropdown(options) {

  var latestMonth = data.latestMonth;
  for (var i = 0; i < 12; i++) {
    monthArray.push(latestMonth);
    var date = new Date(latestMonth);
    date.setMonth(date.getMonth() - 1);
    latestMonth = date.toLocaleString('default', { month: 'long' }) + ' ' + date.getFullYear();
  }
  

  var dropdown = document.getElementById("month-dropdown");
  dropdown.innerHTML = "";
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    dropdown.add(option);
  }
}

populateDropdown(monthArray)

document.addEventListener('DOMContentLoaded', () => {
  const buttonX = document.querySelector('#buttonX');
  buttonX.addEventListener('click', handleButtonClick);
});

async function handleButtonClick() {
  // 1. Assign shop name to global variable "shopname"
  const shopNameInput = document.querySelector('#shopNameInput');
  shopName = shopNameInput.value;

  // 2. Call an endpoint and send this payload to that endpoint
  const payload = {
    shopname: shopName,
    month: 'April 2022'
  };

  try {
    const response = await fetch('https://your-api-url/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    // 3. Wait for a response payload and check status code
    if (response.status !== 200) {
      displayErrorMessage('An error occurred. Please try again.');
      return;
    }

    const data = await response.json();
    // Process the response data (e.g., update the UI)

  } catch (error) {
    displayErrorMessage('An error occurred. Please try again.');
  }
}

function displayErrorMessage(message) {
  const errorElement = document.querySelector('#errorElement');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}
