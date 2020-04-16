$(document).ready(function () {          
          
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

/*****************  PIE CHART Confirmed   *********/
var pieCases = [];    
$.ajax({
    url: 'https://covidma.herokuapp.com/api?fbclid=IwAR0xnMi3BhuAvBfzDzyCXoLK9yuMetjX8tGb51zhQXCtbjnpSwMaIPjsALc',
    mimeType: 'json',
    data: {},
    type: "GET",
    success: function(data) {
        data[1].forEach(function(e){
            pieCases.push({name: e.region,value : e.cases});
        });
        if($("#echart_pie").length){
            echarts.init(document.getElementById("echart_pie"),e).setOption({
                title:{text:"B Y  M O R O C C A N  R E G I O N S",x:"center",y:"top",textStyle:{fontWeight:"normal",color:"#FFFFFF"}},
               tooltip:{trigger:"item",formatter:function (params) {
                return `${params.seriesName}<br />
                         ${params.name}: ${params.data.value} (${params.percent}%)`;
                }},
                legend:{x:"center",y:"bottom",data:["Direct Access","E-mail Marketing","Union Ad","Video Ads","Search Engine"]},
                toolbox:{show:!0,feature:{magicType:{show:!0,type:["pie","funnel"],option:{funnel:{x:"25%",width:"50%",funnelAlign:"left",max:1548}}},restore:{show:!0,title:"Restore"},saveAsImage:{show:!0,title:"Save Image"}}},
                calculable:!0,
                series:[{name:"confirmed cases",type:"pie",radius:"55%",center:["50%","48%"],data: pieCases}]
                });
            }
        
        },
    error: function(){
        alert("failed to load piechart")
    }
    });
    /*****************  HOSPITAUX   *********/
    //manageMemberTable

    $.ajax({
        url: 'https://services3.arcgis.com/hjUMsSJ87zgoicvl/arcgis/rest/services/Hopitaux/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json&_=1586869984055',
        mimeType: 'json',
        data: {},
        type: "GET",
        success: function(data) {
            alert(JSON.stringify(data.features[0]));
            if(data.features.length>0){
                var body = "<tr>";
                data.features.forEach((e) => {
                body    += "<td>" + e.attributes.Nom + "</td>";
                body    += "<td>" + e.attributes.province + "</td>";
                body    += "<td>" + e.attributes.Région + "</td>";
                body    += "</tr>";
            });
                $( "#manageMemberTable tbody").html("");
                $( "#manageMemberTable tbody").html(body);
                $( "#manageMemberTable" ).DataTable({scrollX: true});
            }else{
                $( "#manageMemberTable tbody" ).html('<td colspan=6><div class="alert alert-success">Liste vide</div></td>');
              }
    
            
    
        },
        error: function(error){

        }
    });


              
    });