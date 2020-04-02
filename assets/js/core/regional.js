$(document).ready(function () {

    if($("#chartBig1")){
        var selectValue = $("#cAr").val();
        $.ajax({
            url: 'https://covidapi.info/api/v1/country/'+selectValue+'/timeseries/2020-02-01/2020-03-31',
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
        $("#1").removeClass("active");
        $("#2").removeClass("active");
        $("#0").addClass("active");
        if($("#chartBig1")){
            $.ajax({
                url: '/covid19/regional',
                mimeType: 'json',
                data: {country: selectValue},
                type: "POST",
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
    $('.chart-area').append('<canvas id="chartBig1"><canvas>');
    var canvas = document.querySelector('#chartBig1');
    var ctx = document.getElementById("chartBig1").getContext('2d');
    ctx.canvas.width = "854";// resize to parent width
    ctx.canvas.height = "350"; // resize to parent height



    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(72,72,176,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(72,72,176,0.0)');
    gradientStroke.addColorStop(0, 'rgba(119,52,169,0)'); //purple colors
    var config = {
      type: 'line',
      data: {                       
        labels: labels, 
        datasets: [{
          label: "Confirmed Cases",
          fill: true,
          backgroundColor: gradientStroke,
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

    var myChartData = new Chart(ctx,config);

    $("#0").unbind('click').bind('click',function() {
        myChartData.config.data.datasets[0].data = [];
        myChartData.config.data.datasets[0].data = confirmedData;
        myChartData.config.data.datasets[0].label = "confirmed cases";
        myChartData.config.data.labels = labels;
        myChartData.config.options  =  gradientChartOptionsConfigurationWithTooltipRed;
        gradientStroke.addColorStop(1, 'rgba(45,167,212,0.15)');
        gradientStroke.addColorStop(0.4, 'rgba(45,167,212,0.0)'); //blue colors
        gradientStroke.addColorStop(0, 'rgba(45,167,212,0)'); //blue colors
        myChartData.config.data.datasets[0].backgroundColor = gradientStroke;
        myChartData.config.data.datasets[0].borderColor = "#00A5D7";
        myChartData.config.data.datasets[0].pointBackgroundColor="#00A5D7";
        myChartData.config.data.datasets[0].pointHoverBackgroundColor="#00A5D7";
  
        myChartData.update();
      });
      $("#1").unbind('click').bind('click',function() {
        myChartData.config.data.datasets[0].data = [];
        myChartData.config.data.datasets[0].data = deathsData;
        myChartData.config.data.datasets[0].label = "deaths cases";
        myChartData.config.data.labels = labels;
        myChartData.config.options  =  gradientChartOptionsConfigurationWithTooltipRed;
        gradientStroke.addColorStop(1, 'rgba(229,43,93,0.15)');
        gradientStroke.addColorStop(0.4, 'rgba(229,43,93,0.0)'); //red colors
        gradientStroke.addColorStop(0, 'rgba(229,43,93,0)'); //red colors
        myChartData.config.data.datasets[0].backgroundColor = gradientStroke;
        myChartData.config.data.datasets[0].borderColor = "#D1072F";
        myChartData.config.data.datasets[0].pointBackgroundColor="#D1072F";
        myChartData.config.data.datasets[0].pointHoverBackgroundColor="#D1072F";
  
        myChartData.update();
    });

    $("#2").unbind('click').bind('click',function() {
        myChartData.config.data.datasets[0].data = [];
        myChartData.config.data.datasets[0].data = recoveredData;
        myChartData.config.data.datasets[0].label = "recovered cases";
        myChartData.config.data.labels = labels;
        myChartData.config.options  =  gradientChartOptionsConfigurationWithTooltipGreen;
        gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
        gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
        gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors
        myChartData.config.data.datasets[0].backgroundColor = gradientStroke;
        myChartData.config.data.datasets[0].borderColor = "#00d6b4";
        myChartData.config.data.datasets[0].pointBackgroundColor="#00d6b4";
        myChartData.config.data.datasets[0].pointHoverBackgroundColor="#00d6b4";
  
        myChartData.update();
    });

    }     

});