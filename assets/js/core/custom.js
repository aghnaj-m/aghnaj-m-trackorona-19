$(document).ready(function () {

  /*-------------------- WORLD MAP-----------------------*/
    var e={color:["#26B99A","#34495E","#BDC3C7","#3498DB","#9B59B6","#8abb6f","#759c6a","#bfd3b7"],
title:{itemGap:8,textStyle:{fontWeight:"normal",color:"#408829"}}
,dataRange:{color:["#1f610a","#97b58d"]},
toolbox:{color:["#408829","#408829","#408829","#408829"]}
,tooltip:{backgroundColor:"rgba(0,0,0,0.5)",
        axisPointer:{type:"line",lineStyle:{color:"#408829",type:"dashed"},crossStyle:{color:"#408829"},shadowStyle:{color:"rgba(200,200,200,0.3)"}}}
,dataZoom:{dataBackgroundColor:"#eee",fillerColor:"rgba(64,136,41,0.2)",handleColor:"#408829"},
grid:{borderWidth:0}
,categoryAxis:{axisLine:{lineStyle:{color:"#FFFFFF"}},splitLine:{lineStyle:{color:["#eee"]}}}
,valueAxis:{axisLine:{lineStyle:{color:"#FFFFFF"}},splitArea:{show:!0,areaStyle:{color:["rgba(250,250,250,0.1)","rgba(200,200,200,0.1)"]}},splitLine:{lineStyle:{color:["#eee"]}}}
,timeline:{lineStyle:{color:"#408829"},
    controlStyle:{normal:{color:"#408829"},emphasis:{color:"#408829"}}},
k:{itemStyle:{normal:{color:"#68a54a",color0:"#a9cba2",lineStyle:{width:1,color:"#408829",color0:"#86b379"}}}}
,map:{itemStyle:{normal:{areaStyle:{color:"#ddd"},label:{textStyle:{color:"#c12e34"}}}
    ,emphasis:{areaStyle:{color:"#99d2dd"},
    label:{textStyle:{color:"#c12e34"}}}}},
force:{itemStyle:{normal:{linkStyle:{strokeColor:"#408829"}}}}
,chord:{padding:4,itemStyle:{normal:{lineStyle:{width:1,color:"rgba(128, 128, 128, 0.5)"},chordStyle:{lineStyle:{width:1,color:"rgba(128, 128, 128, 0.5)"}}},emphasis:{lineStyle:{width:1,color:"rgba(128, 128, 128, 0.5)"},chordStyle:{lineStyle:{width:1,color:"rgba(128, 128, 128, 0.5)"}}}}},gauge:{startAngle:225,endAngle:-45,axisLine:{show:!0,lineStyle:{color:[[.2,"#86b379"],[.8,"#68a54a"],[1,"#408829"]],width:8}},axisTick:{splitNumber:10,length:12,lineStyle:{color:"auto"}},axisLabel:{textStyle:{color:"auto"}},splitLine:{length:18,lineStyle:{color:"auto"}},pointer:{length:"90%",color:"auto"},title:{textStyle:{color:"#333"}},detail:{textStyle:{color:"auto"}}},textStyle:{fontFamily:"Arial, Verdana, sans-serif"}}
if($("#echart_world_map")){
    $.ajax({
        url: 'https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/latest',
        mimeType: 'json',
        data: {},
        type: "GET",
    success: function(data) {
        var recovered = [],
         deaths = [],cases = [],pieCases=[],pieDeaths=[];

        var max_recovered = 0;
        var max_deaths = 0;
        var max_cases = 0;
        data.forEach(function(e){
            if(e.countryregion == "US" || e.countryregion == "us" || e.countryregion == "Us"){
              recovered.push({name: "United States",value : e.recovered});
              cases.push({name: "United States",value : e.confirmed});
              deaths.push({name: "United States",value : e.deaths});
              pieCases.push({name: e.countryregion,value : e.confirmed});
              pieDeaths.push({name: e.countryregion,value : e.deaths});
              if(e.recovered >= max_recovered)
                  max_recovered = e.recovered;
              if(e.deaths >= max_deaths)
                  max_deaths = e.deaths;
              if(e.confirmed >= max_cases)
                  max_cases = e.confirmed;
              ;
          }else{
            if(e.confirmed >= 5000 || e.deaths > 500){
              pieCases.push({name: e.countryregion,value : e.confirmed});
              pieDeaths.push({name: e.countryregion,value : e.deaths});
            }
            recovered.push({name: e.countryregion,value : e.recovered});
            cases.push({name: e.countryregion,value : e.confirmed});
            deaths.push({name: e.countryregion,value : e.deaths});
            if(e.recovered >= max_recovered)
                max_recovered = e.recovered;
            if(e.deaths >= max_deaths)
                max_deaths = e.deaths;
            if(e.confirmed >= max_cases)
                max_cases = e.confirmed;
          }
        });
        var options = {
            title:{text:"R E C O V E R E D  C A S E S  C O U N T",x:"center",y:"top",textStyle:{fontWeight:"normal",color:"#408829"}},
            tooltip:{trigger:"item",formatter:function(e){var a=(e.value+"").split(".");return a=a[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,"$1,"),e.seriesName+"<br/>"+e.name+" : "+a}},
            toolbox:{show:!0,orient:"vertical",x:"right",y:"center",feature:{mark:{show:!0},dataView:{show:!0,title:"Text View",lang:["Text View","Close","Refresh"],readOnly:!1},restore:{show:!0,title:"Restore"},saveAsImage:{show:!0,title:"Save Image"}}},
            dataRange:{ min:0,max: max_recovered,text:["High","Low"],realtime:!1,calculable:!0,color:["#167D69","#28B095","#CBEAE3"]},
            series:[
                {name:"Recovered cases",
                type:"map",
                mapType:"world",
                roam:!1,
                mapLocation:{y:60},
                itemStyle:{emphasis:{label:{show:!0}}},
                data:recovered
                }]
        };
        echarts.init(document.getElementById("echart_world_map"),e).setOption(options);
            
            $("#0").click(function() {
                var option = options;
                option.title.textStyle.color = "#2A81A6";
                option.title.text = "C O N F I R M E D  C A S E S  C O U N T"
                option.dataRange.color = ["#000080","#0000CD","#1E90FF"];
                option.dataRange.max = max_cases;
                option.series[0].name = "Confirmed Cases"; 
                option.series[0].data = cases;
                echarts.init(document.getElementById("echart_world_map"),e).setOption(option); });
              
                $("#1").click(function() {
                    var option = options;
                    option.title.textStyle.color = "#A52A2A";
                    option.title.text = "D E A T H S  C A S E S  C O U N T"
                    option.dataRange.max = max_deaths;
                    option.dataRange.color = ["#800000","#A52A2A","#FF0000"];
                    option.series[0].name = "Deaths Cases"; 
                    option.series[0].data = deaths;
                    echarts.init(document.getElementById("echart_world_map"),e).setOption(option); });  
                    
                $("#2").click(function() {
                     var option = options;
                     option.title.textStyle.color = "#22A48A";
                     option.title.text = "R E C O V E R E D  C A S E S  C O U N T"
                     option.dataRange.color =["#167D69","#28B095","#CBEAE3"]
                     option.dataRange.max = max_recovered;
                     option.series[0].name = "Recovered Cases"; 
                     option.series[0].data = recovered;
                    echarts.init(document.getElementById("echart_world_map"),e).setOption(option); });    
                    
            /*****************  PIE CHART Confirmed   *********/
if($("#echart_pie").length){echarts.init(document.getElementById("echart_pie"),e).setOption({
  title:{text:"C O N F I R M E D  C A S E S",x:"center",y:"top",textStyle:{fontWeight:"normal",color:"#00BFFF"}},
  tooltip:{trigger:"item",formatter:function (params) {
    return `${params.seriesName}<br />
            ${params.name}: ${params.data.value} (${params.percent}%)`;
  }},
  legend:{x:"center",y:"bottom",data:["Direct Access","E-mail Marketing","Union Ad","Video Ads","Search Engine"]},
  toolbox:{show:!0,feature:{magicType:{show:!0,type:["pie","funnel"],option:{funnel:{x:"25%",width:"50%",funnelAlign:"left",max:1548}}},restore:{show:!0,title:"Restore"},saveAsImage:{show:!0,title:"Save Image"}}},
  calculable:!0,
  series:[{name:"confirmed cases",type:"pie",radius:"55%",center:["50%","48%"],data: pieCases}]
    });var a={normal:{label:{show:!1},labelLine:{show:!1}}},t={normal:{color:"rgba(0,0,0,0)",label:{show:!1},labelLine:{show:!1}},emphasis:{color:"rgba(0,0,0,0)"}}}
/*****************  /PIE CHART Confirmed   *********/
/*****************  PIE CHART deaths   *********/
var pie2E = e;
pie2E.color = ["#8B0000","#DC143C","#FF0000","#F08080","#FF4500","#800000","#A0522D","#D2691E"];
if($("#echart_pie").length){echarts.init(document.getElementById("echart_pie2"),pie2E).setOption({
  title:{text:"D E A T H S  C A S E S",x:"center",y:"top",textStyle:{fontWeight:"normal",color:"white"}},
  tooltip:{trigger:"item",formatter:function (params) {
    return `${params.seriesName}<br />
            ${params.name}: ${params.data.value} (${params.percent}%)`;
  }},
  legend:{x:"center",y:"bottom",data:["Direct Access","E-mail Marketing","Union Ad","Video Ads","Search Engine"]},
  toolbox:{show:!0,feature:{magicType:{show:!0,type:["pie","funnel"],option:{funnel:{x:"25%",width:"50%",funnelAlign:"left",max:1548}}},restore:{show:!0,title:"Restore"},saveAsImage:{show:!0,title:"Save Image"}}},
  calculable:!0,
  series:[{name:"deaths cases",type:"pie",radius:"55%",center:["50%","48%"],data: pieDeaths}]
    });}
/*****************  /PIE CHART deaths   *********/

    },
    error: function(error) {
        alert('Failed to load map');
    }
    });

        }

          /*-------------------- /WORLD MAP-----------------------*/



/************************ CHART INITIALISATION **************************/

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


/************* ITALY CHART  ************/
$.ajax({
  url: '/covid19/timeseries',
  mimeType: 'json',
  data: {country: 'ITA'},
  type: "POST",
success: function(data) {
  var confirmedData = [];
  var labels = [];
  data.result.forEach((e)=>{
    confirmedData.push(e.confirmed);
    labels.push(e.date);
  });
  var ctxGreen = document.getElementById("chartLineGreen").getContext("2d");

var gradientStroke = ctxGreen.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

var data = {
  labels: labels,
  datasets: [{
    label: "confirmed cases",
    fill: true,
    backgroundColor: gradientStroke,
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
    data: confirmedData,
  }]
};

var myChart = new Chart(ctxGreen, {
  type: 'line',
  data: data,
  options: gradientChartOptionsConfigurationWithTooltipGreen

});

},
error: function(error) {
  alert('Failed to load timeseries');
}
});

/************* /ITALY CHART  ************/

/************* SPAIN CHART  ************/
$.ajax({
  url: '/covid19/timeseries',
  mimeType: 'json',
  data: {country: 'ESP'},
  type: "POST",
success: function(data) {
  var confirmedData = [];
  var labels = [];
  data.result.forEach((e)=>{
    confirmedData.push(e.confirmed);
    labels.push(e.date);
  });
  var ctxRed = document.getElementById("chartLineRed").getContext("2d");

var gradientStroke = ctxRed.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(229,43,93,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(229,43,93,0.0)'); //red colors
gradientStroke.addColorStop(0, 'rgba(229,43,93,0)'); //red colors

var data = {
  labels: labels,
  datasets: [{
    label: "confirmed cases",
    fill: true,
    backgroundColor: gradientStroke,
    borderColor: '#DC143C',
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: '#DC143C',
    pointBorderColor: 'rgba(255,255,255,0)',
    pointHoverBackgroundColor: '#DC143C',
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: confirmedData,
  }]
};

var myChart = new Chart(ctxRed, {
  type: 'line',
  data: data,
  options: gradientChartOptionsConfigurationWithTooltipRed

});

},
error: function(error) {
  alert('Failed to load timeseries');
}
});
/************* SPAIN CHART  ************/
/************* USA CHART  ************/
$.ajax({
  url: '/covid19/timeseries',
  mimeType: 'json',
  data: {country: 'USA'},
  type: "POST",
success: function(data) {
  var confirmedData = [];
  var labels = [];
  data.result.forEach((e)=>{
    confirmedData.push(e.confirmed);
    labels.push(e.date);
  });
  var ctxUsa = document.getElementById("chartLineUsa").getContext("2d");

var gradientStroke = ctxUsa.createLinearGradient(0, 230, 0, 50);

gradientStroke.addColorStop(1, 'rgba(45,167,212,0.15)');
gradientStroke.addColorStop(0.4, 'rgba(45,167,212,0.0)'); //blue colors
gradientStroke.addColorStop(0, 'rgba(45,167,212,0)'); //blue colors

var data = {
  labels: labels,
  datasets: [{
    label: "confirmed cases",
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
};

var myChart = new Chart(ctxUsa, {
  type: 'line',
  data: data,
  options: gradientChartOptionsConfigurationWithTooltipGreen

});

},
error: function(error) {
  alert('Failed to load timeseries');
}
});
/************* /USA CHART  ************/
/************* DAILY INFO  ************/
if($("#echart_bar_horizontal").length)
{
  $.ajax({
    url: 'https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=16',
    mimeType: 'json',
    type: "GET",
  success: function(response) {
    $('#lastupdate').html("Last update: "+response.data.last_update);
    var data = response.data.rows;
    var dailyCases = [];
    var countries = [];  
    for(var i=1; i<data.length;i++){
      countries.push(data[i].country);
      dailyCases.push(Number(data[i].new_cases.replace(',','')));
    }
    echarts.init(document.getElementById("echart_bar_horizontal"),e).setOption(
      {
      title:{text:"DAILY CONFIRMED CASES",x:"center",y:"top",textStyle:{fontWeight:"normal",color:"#FFFFFF"}},
      tooltip:{trigger:"axis"},
      toolbox:{show:!0,feature:{saveAsImage:{show:!0,title:"Save Image"}}},
      calculable:!0,
      xAxis:[{type:"value",boundaryGap:[0,.01]}],
      yAxis:[{
          type:"category",
          data: countries.reverse()
        }],
      series:[
        {name:"new case",type:"bar",data: dailyCases.reverse() }]  });
    

  },
  error: function(error){

  }
});

  
  
  }

});
