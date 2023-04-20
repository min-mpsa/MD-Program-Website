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
    glassLaborEarnings: Array(12).fill(0),
    potentialTotalEarnings: Array(12).fill(0),
    potentialRebateEarnings: Array(12).fill(0)
  };

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

