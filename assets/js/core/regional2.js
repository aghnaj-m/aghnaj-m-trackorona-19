$(document).ready(function () {

    if($("#chartBig1")){
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
      let year = date_ob.getFullYear();
      let fullDate = year + "-" + month + "-" + date;
  
        var selectValue = $("#cAr").val();
        $.ajax({
            url: 'https://covidapi.info/api/v1/country/'+selectValue+'/timeseries/2020-02-01/'+fullDate,
            mimeType: 'json',
            data: {},
            type: "GET",
        success: function(data) {
            remplir(data);
        },
        error: function(error) {
            alert('Failed to load data');
        }
        });
    
    }

    $('#cAr').on('change',function(evt){
        var selectValue = this.value;
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let fullDate = year + "-" + month + "-" + date;
        $("#1").removeClass("active");
        $("#2").removeClass("active");
        $("#0").addClass("active");
        if($("#chartBig1")){
            $.ajax({
              url: 'https://covidapi.info/api/v1/country/'+selectValue+'/timeseries/2020-02-01/'+fullDate,
              mimeType: 'json',
                data: {country: selectValue},
                type: "GET",
            success: function(data) {
                remplir(data);
            },
            error: function(error) {
                alert('Failed to load data');
            }
            });
        
        }
    });

    gradientChartOptionsConfigurationWithTooltipGreen = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
      
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],
      
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(0,242,195,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };      

      gradientChartOptionsConfigurationWithTooltipRed = {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
      
        tooltips: {
          backgroundColor: '#f5f5f5',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        responsive: true,
        scales: {
          yAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(29,140,248,0.0)',
              zeroLineColor: "transparent",
            },
            ticks: {
              suggestedMin: 50,
              suggestedMax: 125,
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }],
      
          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(250,128,114,0.1)',
              zeroLineColor: "transparent",
            },
            ticks: {
              padding: 20,
              fontColor: "#9e9e9e"
            }
          }]
        }
      };
      
    
    

    function remplir(data){

     var confirmedData = [],
        deathsData = [],
        recoveredData = [];
        labels = [];
     data.result.forEach((e)=>{
        if(e.confirmed >= 1){
        confirmedData.push(e.confirmed);
        deathsData.push(e.deaths);
        recoveredData.push(e.recovered);
        labels.push(e.date);
        }
    });

    $('#chartBig1').remove(); // this is my <canvas> element
    $('.chart-area1').append('<canvas id="chartBig1"><canvas>');

    $('#chartBig2').remove(); // this is my <canvas> element
    $('.chart-area2').append('<canvas id="chartBig2"><canvas>');

    $('#chartBig3').remove(); // this is my <canvas> element
    $('.chart-area3').append('<canvas id="chartBig3"><canvas>');

    var canvas1 = document.querySelector('#chartBig1');
    var canvas2 = document.querySelector('#chartBig2');
    var canvas3 = document.querySelector('#chartBig3');


    var ctx1 = document.getElementById("chartBig1").getContext('2d');
    var ctx2 = document.getElementById("chartBig2").getContext('2d');
    var ctx3 = document.getElementById("chartBig3").getContext('2d');

    ctx1.canvas.width = "854";// resize to parent width
    ctx1.canvas.height = "300"; // resize to parent height

    ctx2.canvas.width = "854";// resize to parent width
    ctx2.canvas.height = "300"; // resize to parent height

    ctx3.canvas.width = "854";// resize to parent width
    ctx3.canvas.height = "300"; // resize to parent height


/**       CHART 1            */
    var gradientStroke1 = ctx1.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke1.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config1 = {
      type: 'line',
      data: {                       
        labels: labels, 
        datasets: [{
          label: "Confirmed Cases",
          fill: true,
          backgroundColor: gradientStroke1,
          borderColor: '#00A5D7',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#00A5D7',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#00A5D7',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: confirmedData,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };

    var myChartData1 = new Chart(ctx1,config1);
/**       /CHART 1            */

/**       CHART 2            */
var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

gradientStroke2.addColorStop(1, 'rgba(66,134,121,0.15)');
gradientStroke2.addColorStop(0.4, 'rgba(229,43,93,0.0)'); //red colors
gradientStroke2.addColorStop(0, 'rgba(229,43,93,0)'); //red colors
var config2 = {
  type: 'line',
  data: {                       
    labels: labels, 
    datasets: [{
      label: "deaths cases",
      fill: true,
      backgroundColor: gradientStroke2,
      borderColor: '#D1072F',
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: '#D1072F',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#D1072F',
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: deathsData,
    }]
  },
  options: gradientChartOptionsConfigurationWithTooltipRed
};

var myChartData2 = new Chart(ctx2,config2);
/**       /CHART 2            */
/**       CHART 3            */
var gradientStroke3 = ctx3.createLinearGradient(0, 230, 0, 50);

gradientStroke3.addColorStop(1, 'rgba(66,134,121,0.15)');
gradientStroke3.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
gradientStroke3.addColorStop(0, 'rgba(66,134,121,0)'); //green colors
var config3 = {
  type: 'line',
  data: {                       
    labels: labels, 
    datasets: [{
      label: "recovered cases",
      fill: true,
      backgroundColor: gradientStroke3,
      borderColor: '#00d6b4',
      borderWidth: 2,
      borderDash: [],
      borderDashOffset: 0.0,
      pointBackgroundColor: '#00d6b4',
      pointBorderColor: 'rgba(255,255,255,0)',
      pointHoverBackgroundColor: '#00d6b4',
      pointBorderWidth: 20,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 15,
      pointRadius: 4,
      data: recoveredData,
    }]
  },
  options: gradientChartOptionsConfigurationWithTooltipGreen
};

var myChartData3 = new Chart(ctx3,config3);
/**       /CHART 3           */




    }     

});