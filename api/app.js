// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const express = require('express')
const cors = require('cors');
const app = express()
app.use(cors());


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
   FROM acquired-router-384100.glassRepairs.monthlyDataQueryTable
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

app.get('/monthly', async (req, res) => {
  const supplier_name = req.query.supplier_name;
  const yearmonth = req.query.yearmonth;
  res.json((await queryMonthlySupplierData(supplier_name, yearmonth)));
});

app.get('/daily', async (req, res) => {
  const supplier_name = req.query.supplier_name;
  res.json((await queryDailySupplierData(supplier_name)));
});

app.listen(3000, function() {
  console.log("example app listening on port 3000")
})