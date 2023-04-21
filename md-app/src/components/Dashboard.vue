<template>
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <nav class="hidden-nav">
    <div class="nav-buttons">
      <a href="login.html"><button class="nav-button" id="logout">Logout</button></a>
    </div>
  </nav>

  <section class="section" id="section-1">
    <div class="top">
      <div class="top-text">In {{latestMonth}}, you had:</div>
    </div>
    <div class="bottom">
      <div class="bottom-div" id="bottom-div-1">
        <div class="top2"></div>
        <div class="middle" id="num-of-repairs">{{numOfRepairs}}</div>
        <div class="bottom-text">Repairs</div>
      </div>
      <div class="bottom-div" id="bottom-div-2">
        <div class="top2"></div>
        <div class="middle" id="num-of-replacements">{{numOfReplacements}}</div>
        <div class="bottom-text">Replacements</div>
      </div>
      <div class="bottom-div" id="bottom-div-3">
        <div class="top2"></div>
        <div class="middle" id="latest-month-repair-ratio">{{latestMonthRepairRatio}}</div>
        <div class="bottom-text">of windshields repaired</div>
      </div>
    </div>
  </section>

  <section class="section" id="section-2">
    <div class="left">
        <div class="left-div-top">This year you repaired</div>
        <div class="left-div-middle">
            <div class="left-div-middle-left" id="ytd-repair-ratio">{{ytdRepairRatio}}</div>
            <div class="left-div-middle-right">of windshields:</div>
        </div>
        
        <div class="left-div-bottom" v-if="'ytdRepairRatio' >= 35.0">Maintain 35% repairs to get rebates!</div>
        <div class="left-div-bottom" v-else>Achieve 35% windshield repair ratio by {{endDate}} to unlock rebates!</div>
    </div>
    <div class="right is-qualify-false">
        <div class="right-div-top"></div>
        <div class="right-div-bottom">
            <div class="right-div-bottom-top">Find out how far you can drive forward next month:</div>
            <div class="right-div-bottom-bottom">
                <div class="inputcontainer">
                    <input type="text">
                    Repairs
                </div>
                <div class="inputcontainer">
                    <input type="text">
                    Replacements
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="right-true-top">Get ready for:</div>
        <div class="right-true-middle" id="cumulative-rebate-earnings">${{cumulativeRebateEarnings}}</div>
        <div class="right-true-bottom">in year-end rebates if you keep this up!</div>
    </div>
  </section>

  <section v-if="'ytdRepairRatio' < 35.0">
    <div class="top">
        <div class="top-text">What you're missing out on:</div>
    </div>
    <div class="bottom">
      <div class="bottom-div" id="bottom-div-4"></div>
      <div class="bottom-div" id="bottom-div-5"></div>
      <div class="bottom-div" id="bottom-div-6"></div>
      <div class="bottom-div" id="bottom-div-7"></div>
    </div>
  </section>

  <section class="section is-qualify-true" style="height:175vh;margin-bottom:20vh;" id="section-3">
    <div class="top">
    </div>
    <div class="bottom">
      <div class="bottom-div" id="bottom-div-4">
          <LineChart />
      </div>
      <div class="bottom-div" id="bottom-div-5">
      </div>
      <div class="bottom-div" id="bottom-div-6">
      </div>
      <div class="bottom-div" id="bottom-div-7">
      </div>
    </div>
  </section>

  <section class="section" id="section-4">
    <div class="top">
        <div class="top-text">In <span id="latest-month2"></span>, you earned:</div>
      </div>
      <div class="bottom">
        <div class="bottom-div" id="bottom-div-1">
          <div class="top2"></div>
          <div class="middle" id="repair-earnings-latest-month"></div>
          <div class="bottom-text">from repairs</div>
        </div>
        <div class="bottom-div" id="bottom-div-2">
          <div class="top2"></div>
          <div class="middle" id="glass-labor-earnings-latest-month"></div>
          <div class="bottom-text">from glass labor</div>
        </div>
        <div class="bottom-div" id="bottom-div-3">
          <div class="top2"></div>
          <div class="middle" id="rebate-earnings-latest-month"></div>
          <div class="bottom-text">from rebates</div>
        </div>
        <div class="bottom-div" id="bottom-div-4">
            <div class="top2"></div>
            <div class="middle" id="total-earnings-latest-month"></div>
            <div class="bottom-text">in total</div>
          </div>
      </div>
  </section>

  <section class="section" id="section-5">
    <div class="section-5-left">See how you've done in the past:</div>
    <div class="section-5-right">
      <select class="month-dropdown" id="month-dropdown"></select>
  </div>
  </section>

</body>
</html>
</template>

<script>
import LineChart from '@/components/LineChart.vue';

export default {
  name: "Dashboard",
  components: { LineChart },
  data() {
    return {
        LineChart,
        is_qualify: false,
        latestMonth: "April 2022",
        numOfRepairs: "3",
        numOfReplacements: "14",
        latestMonthRepairRatio: "18%",
        ytdRepairRatio: "20%",
        nextMonthRepairs: 0,
        nextMonthReplacements: 0,
        totalClaimsYTD: 109, 
        yearEndRebateAmt: 0,
        repairEarningsLatestMonth: "3000",
        glassLaborEarningsLatestMonth: "3000",
        rebateEarningsLatestMonth: "0",
        totalEarningsLatestMonth: "6000",
        cumulativeRebateEarnings: "100",
        glassLaborEarnings:[0,1,2,3,4,5,6,7,8,9,10,11,12],
        potentialTotalEarnings: [0,1,2,3,4,5,6,7,8,9,10,11,12],
        potentialRebateEarnings: [0,1,2,3,4,5,6,7,8,9,10,11,12],
        predictedRepairRatio: [0,1,2,3,4,5,6,7,8,9,10,11,12],
        endDate: "Dec. 29th, 2023",
      };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/css/styles.css">


/* @import '../assets/css/styles.css'; */
</style>
