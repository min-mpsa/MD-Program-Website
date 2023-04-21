<template>
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shop Dashboard</title>
  <link href="styles.css">
</head>
<body>

  <nav class="hidden-nav">
    <div class="nav-buttons">
      <a href="login.html"><button class="nav-button" id="logout">Logout</button></a>
    </div>
  </nav>

  <section class="section" id="section-1">
    <div class="top">
      <!-- to do make this month a global variable -->
      <div class="top-text">In {{ yearmonth }}, you had:</div>
    </div>
    <div class="bottom">
      <div class="bottom-div" id="bottom-div-1">
        <div class="top2"></div>
        <div class="middle" id="num-of-repairs">{{ monthlydata.monthlyRepairCount}}</div>
        <div class="bottom-text">Repairs</div>
      </div>
      <div class="bottom-div" id="bottom-div-2">
        <div class="top2"></div>
        <div class="middle" id="num-of-replacements">{{ monthlydata.monthlyReplacementCount }}</div>
        <div class="bottom-text">Replacements</div>
      </div>
      <div class="bottom-div" id="bottom-div-3">
        <div class="top2"></div>
        <div class="middle" id="latest-month-repair-ratio"> {{monthlydata.monthlyRepairRatio}} </div>
        <div class="bottom-text">of windshields repaired</div>
      </div>
    </div>
  </section>

  <section class="section" id="section-2">
    <div class="left">
        <div class="left-div-top">This year you repaired</div>
        <div class="left-div-middle">
            <div class="left-div-middle-left" id="ytd-repair-ratio">{{repairPercentage}}</div>
            <div class="left-div-middle-right">of windshields:</div>
        </div>
        
        <div class="left-div-bottom" v-if="'ytdRepairRatio' >= 35.0">Maintain 35% repairs to get rebates!</div>
        <div class="left-div-bottom" v-else>Achieve 35% windshield repair ratio by June 1 2023 to unlock rebates!</div>
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
        <div class="right-true-middle" id="cumulative-rebate-earnings">${{monthlydata.ytdRebates}}</div>
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
        <div class="top-text">In <span id="latest-month2"></span>{{ yearmonth }}, you earned:</div>
      </div>
      <div class="bottom">
        <div class="bottom-div" id="bottom-div-1">
          <div class="top2"></div>
          <div class="middle" id="repair-earnings-latest-month">{{ monthlydata.repairEarnings }}</div>
          <div class="bottom-text">from repairs</div>
        </div>
        <div class="bottom-div" id="bottom-div-2">
          <div class="top2"></div>
          <div class="middle" id="glass-labor-earnings-latest-month"> {{ monthlydata.replacementEarnings }}</div>
          <div class="bottom-text">from glass labor</div>
        </div>
        <div class="bottom-div" id="bottom-div-3">
          <div class="top2"></div>
          <div class="middle" id="rebate-earnings-latest-month"> {{ monthlydata.monthlyTotalRebates }}</div>
          <div class="bottom-text">from rebates</div>
        </div>
        <div class="bottom-div" id="bottom-div-4">
            <div class="top2"></div>
            <div class="middle" id="total-earnings-latest-month"> {{ monthlyTotalEarnings}}</div>
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
import axios from 'axios';
import LineChart from '@/components/LineChart.vue';
import { onMounted } from 'vue';
import { SubscriptionLog } from 'rxjs/internal/testing/SubscriptionLog';

export default {
  name: "Dashboard",
  components: { LineChart },
  data() {
    return {
        LineChart,
        monthlydata: {},
        yearlydata: {},
        monthlyTotalEarnings: 0,
        repairPercentage: 0,
        yearmonth: "2021.06",
        supplier_name: "Shop 1"
      };
  },
  methods: {
    async queryDailySupplierData(supplier_name) {
      const bigqueryClient = new BigQuery();
//todo update this to dailyDataQueryTable1
      const sqlQuery = `SELECT *
      FROM acquired-router-384100.glassRepairs.dailyDataQueryTable
      WHERE Supplier_Name="${supplier_name}"`
      
      const options = {
          query: sqlQuery,
          location: 'us-west1',
      };

      const [rows] = await bigqueryClient.query(options);
      console.log(rows);
      return rows;
    },
    async queryMonthlySupplierData(supplier_name, yearmonth) {
      // Create a client
      const bigqueryClient = new BigQuery();

      // The SQL query to run
      const sqlQuery = 
      `SELECT *
      FROM acquired-router-384100.glassRepairs.monthlyDataQueryResults2
      WHERE Supplier_Name="${supplier_name}" AND yearmonth="${yearmonth}"`;

      const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'us-west1',
      };

      // Run the query
      const [rows] = await bigqueryClient.query(options);
      return rows;
    //   console.log('Query Results:');
    //   rows.forEach(row => {
    //     const supplier_name = row['Supplier_Name'];
    //     const total_earnings = row['total_earnings'];
    //     console.log(`Body ${supplier_name}: ${total_earnings}`);
    //   });
    }
 },
 mounted() {
  const BODYSHOP = this.supplier_name
  const params = { 
    supplier_name: this.supplier_name,
    yearmonth: this.yearmonth
  }
  axios.get('http://localhost:3000/monthly', { params })
  .then((response) => {
    console.log(response.data[0]);
    this.monthlydata = response.data[0];
    this.repairPercentage = 100 * Number(response.data[0].ytdRepairRatio)
    console.log(this.repairPercentage)
    this.monthlyTotalEarnings =  response.data[0].totalEarningsWithoutRebate + response.data[0].monthlyTotalRebates;
    })
  .catch((error) => {
    console.log(error);
  })
  axios.get('http://localhost:3000/daily', { params: { supplier_name: `${BODYSHOP}`} })
  .then((response) => {
    console.log(response.data[0]);
    this.daily = response.data[0];
  })
  .catch((error) => {
    console.log(error);
  })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="../assets/css/styles.css">


@import '../assets/css/styles.css';
</style>
