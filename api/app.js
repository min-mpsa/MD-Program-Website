// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const express = require('express')
const cors = require('cors');
const app = express()

// takes in supplier name and YYYY.MM strings and returns the json response
async function queryDailySupplierData(supplier_name) {
    const bigqueryClient = new BigQuery();

    const sqlQuery = `SELECT *
    FROM acquired-router-384100.glassRepairs.dailyDataQueryTable
    WHERE Supplier_Name="${supplier_name}"`
    
    const options = {
        query: sqlQuery,
        location: 'us-west1',
    };

    const [rows] = await bigqueryClient.query(options);
    return rows;
}

async function queryMonthlySupplierData(supplier_name, yearmonth) {
  // Create a client
  const bigqueryClient = new BigQuery();

  // The SQL query to run
  const sqlQuery = 
  `SELECT *
   FROM acquired-router-384100.glassRepairs.monthlyDataQueryResults1
   WHERE Supplier_Name="${supplier_name}" AND yearmonth="${yearmonth}"`;

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'us-west1',
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);
  console.log(rows);
  return rows;
//   console.log('Query Results:');
//   rows.forEach(row => {
//     const supplier_name = row['Supplier_Name'];
//     const total_earnings = row['total_earnings'];
//     console.log(`Body ${supplier_name}: ${total_earnings}`);
//   });
}


app.use(cors());

app.get('/', async (req, res) => {
  res.json((await queryMonthlySupplierData("Shop 1", "2021.04")));


});

app.listen(3000, function() {
  console.log("example app listening on port 3000")
})