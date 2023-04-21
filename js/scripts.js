let data = {
    is_qualify: false,
    latestMonth: "April 2022",
    numOfRepairs: "3",
    numOfReplacements: "14",
    latestMonthRepairRatio: "18%",
    ytdRepairRatio: 20,
    totalClaimsYTD: 109, 
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
let firstCarPosition = 0;


function moveCar() {
  var Repairs = Number(document.getElementById('repairPred').value);
  var Replacements = Number(document.getElementById('replacementPred').value);
  var initialPositionOfCar = firstCarPosition;
  var finalPositionOfCar = ((((data.ytdRepairRatio/100)*data.totalClaimsYTD)+Repairs)/(data.totalClaimsYTD+Repairs+Replacements))/0.35;
  var moveDistance = finalPositionOfCar * 30;
  if (finalPositionOfCar >= 1) {
    document.getElementById('car').style.transform = 'translateX(' + (30) + 'vw)';
  }
  else {
    document.getElementById('car').style.transform = 'translateX(' + (moveDistance) + 'vw)';
  }
  firstCarPosition = finalPositionOfCar;
  console.log(document.getElementById('car').style.transform);
}


document.getElementById("latest-month").textContent = data.latestMonth;
document.getElementById("num-of-repairs").textContent = data.numOfRepairs;
document.getElementById("num-of-replacements").textContent = data.numOfReplacements;
document.getElementById("latest-month-repair-ratio").textContent = data.latestMonthRepairRatio;
document.getElementById("repair-earnings-latest-month").textContent = "$" + data.repairEarningsLatestMonth;
document.getElementById("glass-labor-earnings-latest-month").textContent = "$" + data.glassLaborEarningsLatestMonth;
document.getElementById("rebate-earnings-latest-month").textContent = "$" + data.rebateEarningsLatestMonth;
document.getElementById("total-earnings-latest-month").textContent = "$" + data.totalEarningsLatestMonth;
document.getElementById("latest-month2").textContent = data.latestMonth;
document.getElementById("ytd-repair-ratio").textContent = data.ytdRepairRatio + "%";
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

$(window).on("load",function() {
  $(window).scroll(function() {
    var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    $(".fade").each(function() {
      /* Check the location of each desired element */
      var objectBottom = $(this).offset().top + $(this).outerHeight();
      
      /* If the element is completely within bounds of the window, fade it in */
      if (objectBottom < windowBottom) { //object comes into view (scrolling down)
        if ($(this).css("opacity")==0) {$(this).fadeTo(500,1);}
      } else { //object goes out of view (scrolling up)
        if ($(this).css("opacity")==1) {$(this).fadeTo(500,0);}
      }
    });
  }).scroll(); //invoke scroll-handler on page-load
});



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

populateDropdown(monthArray);


document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('#submitbutton');
  button.addEventListener('click', handleButtonClick);
});

async function handleButtonClick() {

  const shopNameInput = document.querySelector('#shopNameInput');
  shopName = shopNameInput.value;


  const payload = {
    shopname: shopName,
    month: "latest"
  };


  const response = await fetch('https://your-api-url/endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  window.location.href = 'index.html';
}

