function drawChart(aptValue, livingScore, transportScore, infraScore, eduScore){
    var label = ["총점", "주거", "교통", "인프라", "교육"]
    var data = [aptValue, livingScore, transportScore, infraScore, eduScore]      
    var color = 'white'
    var align = 'start'

    if(isNaN(transportScore)){
      label = ["총점", "주거", "인프라", "교육"]
      data = [aptValue, livingScore, infraScore, eduScore]        
    }
    if(eduScore == "region"){
      label = ["총점", "공급필요", "인구수", "일자리수"]
      data = [aptValue, livingScore, transportScore, infraScore]        
    }
    if(aptValue < 85 && livingScore < 85 && transportScore < 85 && infraScore < 85){
      color = 'black'
      align = 'end'
    }

    var ctx = document.getElementById("valueChart").getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      plugins:[ChartDataLabels],
      data: {          
        labels: label,
        datasets: [{                
          data: data,
          backgroundColor: [
              '#ff3d38',
              '#f97f95',
              '#f97f95',
              '#f97f95',
              '#f97f95',
          ],
          borderColor: [
              'rgba(255,99,132, 0)',
              'rgba(54, 162, 235, 0)',
          ],                
          barThickness: 17,            
        }]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,          
        plugins:{
          legend:{
            display: false
          },            
          datalabels: {
            display: true,
            color: color,
            align: align,
            anchor: 'end',              
            offset: 6,
            textAlign: 'center',
            font: {
              weight: 'bold'
            },              
          },                      
        },
        animation: {            
          x:{
            from: 100
          }
        },
        scales: {
          x:{
            type: 'linear',
            min: 0,
            max: 100,
          },
          myScale: {              
            position: 'left', // `axis` is determined by the position as `'y'`
          }
        }          
      }
  });
}

function drawSubChart(score, avgScore, label1, label2, color1, color2, className){
    var ctx = document.getElementById(className).getContext('2d');
    var color = 'white'
    var align = 'start'

    if(score < 85 && avgScore < 85){
      color = 'black'
      align = 'end'      
    }

    var myChart = new Chart(ctx, {
      type: 'bar',
      plugins:[ChartDataLabels],
      data: {          
        labels: [label1, label2],
        datasets: [{                
          data: [score, avgScore],
          backgroundColor: [
              color1,
              color2,
          ],               
          barThickness: 20,            
        }]
      },
      options: {
        indexAxis: 'y',
        maintainAspectRatio: false,        
        plugins:{
          legend:{
            display: false
          },            
          datalabels: {
            display: true,
            color: color,
            align: align,
            anchor: 'end',              
            offset: 6,
            textAlign: 'center',
            font: {
              weight: 'bold'
            },              
          },                      
        },
        animation: {            
          x:{
            from: 100
          }
        },
        scales: {
          x:{
            type: 'linear',
            min: 0,
            max: 100,
          },
          myScale: {              
            position: 'left', // `axis` is determined by the position as `'y'`
          }
        }          
      }
  });
}

function drawRankChart(rankMonth, rankData, totalRank){
  var label = rankMonth
  var data = rankData
  var align_number = 'start'  

  if(rankData[rankData.length-2] > totalRank/3){    
    align_number = 'top'
  }
  else{
    align_number = 'start'
  }

  var ctx = document.getElementById("rankChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    plugins:[ChartDataLabels],    
    data:{
      labels: label,
      datasets:[{
        data: data,        
        borderColor: "#ff3d38",
        borderWidth: 1,
        backgroundColor: "#ff3d38"
      }],
    },

    options: {      
      responsive: true,      
      maintainAspectRatio: false,
      scales:{
        y:{
          display: false,
          reverse: true,            
          suggestedMax: totalRank,
          suggestedMin: 1,
          ticks:{            
            stepSize: 1,            
          }
        }
      },
      animation: {            
        y:{
          from: 1
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,          
        },
        datalabels: {
          display: true,          
          color: 'black',
          align: align_number,
          anchor: 'start',
          padding: 6,
          textAlign: 'center',          
          font: {
            weight: 'bold'
          },              
        }
      }
    },
});
}

function drawPriceRateChart(dateArray, salesArray, rentArray){
  var label = dateArray
  var salesData = salesArray
  var rentData = rentArray  

  var priceRate_ctx = document.getElementById("priceRateChart").getContext('2d');  
  var priceRateChart = new Chart(priceRate_ctx, {    
    type: 'line',    
    data:{
      labels: label,
      datasets:[
      {
        label: "매매지수",
        data: salesData,        
        borderColor: "#ff3d38",
        borderWidth: 1,
        backgroundColor: "#ff3d38",
        pointRadius: 0
      },
      {
        label: "전세지수",
        data: rentData,
        borderColor: "#5589c9",
        borderWidth: 1,
        backgroundColor: "#5589c9",
        pointRadius: 0
      }
    ],
    },

    options: {      
      responsive: true,      
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      scales:{
        yAxes:{
          display: true,
          min: 50,
          max: 150,
          ticks:{            
            stepSize: 50,            
          }
        }
      },
      animation: {
        delay: 500, // change delay to suit your needs.
      },
      plugins: {
        legend: {
          display: true,
        },
        title: {
          display: false,          
        }
      }
    },
});
}