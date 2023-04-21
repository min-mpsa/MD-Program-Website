let dataPoints = [1000, 1500, 1700, 2200, 2800, 3500, 4800,6000,7000,9000]

function generateDataSet(label, color,dataPoints,borderDash) { 
    let data = {
      label: label,
      backgroundColor: color,
      borderColor: color,
      pointRadius: 10,
      fill:'origin',
      data: dataPoints,
      showLine: true,
      cubicInterpolationMode: 'monotone',
      tension: 0.4,
      borderDash: borderDash
    };

    return data;
}
export const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    showLine: true,
    datasets: [
      generateDataSet('2023 Earnings',"#79e3f8",dataPoints),
      generateDataSet('2023 Earnings with Rebate',"#facb5c",dataPoints.map(function(x) {return x *1.2}),[10,10])
    ]
  }
  
  export const options = {
    responsive: true,
    clip: {left: 5, top: false, right: 10, bottom: 0},
    maintainAspectRatio: false
  }
  