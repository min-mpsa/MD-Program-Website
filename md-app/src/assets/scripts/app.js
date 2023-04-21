// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

// takes in supplier name and YYYY.MM strings and returns the json response
async function querySupplierData(supplier_name, yearmonth) {
  // Create a client
  const bigqueryClient = new BigQuery();

  // The SQL query to run
  const sqlQuery = 
  `SELECT *
   FROM acquired-router-384100.glassRepairs.monthlyDataQueryResults
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