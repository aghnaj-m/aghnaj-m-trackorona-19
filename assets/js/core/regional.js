$(document).ready(function (evt) {

        $('.selectpicker').val("Morocco");
        remplir();
	    $(".selectpicker").on('shown.bs.select', function(e) {
        previous_value = $(this).val();
        }).change(remplir);
        

        function remplir() {
            var labels=Array();
            var labels1=Array();
            var labels2=Array();
            var labelsTemp=Array();
            var casesTemp=Array();
            var deathTemp=Array();
            var recoveredTemp=Array();
            var selectedcountries = $('.selectpicker').val();
            if(selectedcountries.length <= 5){
            if(selectedcountries.length==0){
                //chartInit();
                alert('chart vide');
            }else{
                        /*********** CHART DEATHES */
                fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/deaths.json')
                .then(function(response){
                    return response.json();
            }).then(function(obj){
                deathTemp=[];
                labelsTemp=[];
                var deaths= Array();
                for(var i=0;i<selectedcountries.length;i++){
                    for(var j=0;j<obj.length;j++){
                        if(selectedcountries[i] === obj[j].id){
                            start = false;
                            for(var k=0;k<obj[j].data.length;k++){
                                if(obj[j].data[k].x == 'day-39')
                                    start = true;
                                if(start){
                                deathTemp.push(obj[j].data[k].y);
                                labelsTemp.push(obj[j].data[k].date)
                                }
                            }
                            break;
                        }else{
                            //alert(obj[j].id+' # '+selectedcountries[i]);
                        }
                    }
                    deaths.push(deathTemp);
                    labels.push(labelsTemp);
                    labelsTemp = [];
                    deathTemp=[];
                }
                ////chart deaths
    
            $('#chartBig2').remove(); // this is my <canvas> element
            $('.chart-area2').append('<canvas id="chartBig2"><canvas>');    
    
             var ctx2 = document.getElementById('chartBig2').getContext('2d');
             ctx2.canvas.width = "854";// resize to parent width
             ctx2.canvas.height = "300"; // resize to parent height 
             var chartBig2 = new Chart(ctx2, {
                 type: 'line',
                 data: {
                     labels: labels[0],
                 },
                 options:{
                     legend:{
                         display: true,
                     }
                 }
             });
            var RedColors = ["#FF0000","#8B0000","#FFA07A","#E9967A","#DC143C"];
    
             for(let i=0;i<deaths.length;i++){
                 chartBig2.data.datasets.push({
                     fill: true,                        
                     data: deaths[i],  
                     label: selectedcountries[i],
                     //backgroundColor: gradientStroke2,
                     borderColor: RedColors[i],
                     borderWidth: 2,
                     borderDash: [],
                     borderDashOffset: 0.0,
                     pointBackgroundColor: RedColors[i],
                     pointBorderColor: 'rgba(255,255,255,0)',
                     pointHoverBackgroundColor: RedColors[i],
                     pointBorderWidth: 20,
                     pointHoverRadius: 4,
                     pointHoverBorderWidth: 15,
                     pointRadius: 4,
               
                 });
             }
             chartBig2.update();
            });
            /*********** /CHART DEATHES */
            /*********** CHART CASES */
            fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/cases.json')
            .then(function(response){
                return response.json();
        }).then(function(obj){
            labelsTemp1=[];
            casesTemp=[];
            var cases= Array();
            for(var i=0;i<selectedcountries.length;i++){
                for(var j=0;j<obj.length;j++){
                    if(selectedcountries[i] === obj[j].id){
                        start = false;
                        for(var k=0;k<obj[j].data.length;k++){
                            if(obj[j].data[k].x == 'day-39')
                                start = true;
                            if(start){
                            casesTemp.push(obj[j].data[k].y);
                            labelsTemp1.push(obj[j].data[k].date)
                            }
                        }
                        break;
                    }else{
                        //alert(obj[j].id+' # '+selectedcountries[i]);
                    }
                }
                cases.push(casesTemp);
                casesTemp=[];
                labels1.push(labelsTemp1);
                labelsTemp1 = [];
    
            }
            ////chart Cases
    
        $('#chartBig1').remove(); // this is my <canvas> element
        $('.chart-area1').append('<canvas id="chartBig1"><canvas>');    
    
         var ctx1 = document.getElementById('chartBig1').getContext('2d');
         ctx1.canvas.width = "854";// resize to parent width
         ctx1.canvas.height = "300"; // resize to parent height 
         var chartBig1 = new Chart(ctx1, {
             type: 'line',
             data: {
                 labels: labels1[0],
             },
             options:{
                 legend:{
                     display: true,
                 }
             }
         });
        var BlueColors = ["#ADD8E6","#00BFFF","#4682B4","#0000FF","#000080"];
    
         for(let i=0;i<cases.length;i++){
    
             chartBig1.data.datasets.push({
                 fill: true,                        
                 data: cases[i],  
                 label: selectedcountries[i],
                 //backgroundColor: gradientStroke2,
                 borderColor: BlueColors[i],
                 borderWidth: 2,
                 borderDash: [],
                 borderDashOffset: 0.0,
                 pointBackgroundColor: BlueColors[i],
                 pointBorderColor: 'rgba(255,255,255,0)',
                 pointHoverBackgroundColor: BlueColors[i],
                 pointBorderWidth: 20,
                 pointHoverRadius: 4,
                 pointHoverBorderWidth: 15,
                 pointRadius: 4,
           
             });
         }
         chartBig1.update();
        });
            /*********** /CHART CASES */
    
    
            /*********** CHART RECOVERED */
            fetch('https://raw.githubusercontent.com/royriojas/corona/master/src/data/recovered.json')
            .then(function(response){
                return response.json();
        }).then(function(obj){
            labelsTemp2=[];
            casesTemp=[];
            var recovered= Array();
            for(var i=0;i<selectedcountries.length;i++){
                for(var j=0;j<obj.length;j++){
                    if(selectedcountries[i] === obj[j].id){
                        start = false;
                        for(var k=0;k<obj[j].data.length;k++){
                            if(obj[j].data[k].x == 'day-39')
                                start = true;
                            if(start){
                            recoveredTemp.push(obj[j].data[k].y);
                            labelsTemp2.push(obj[j].data[k].date)
                            }
                        }
                        break;
                    }else{
                        //alert(obj[j].id+' # '+selectedcountries[i]);
                    }
                }
                recovered.push(recoveredTemp);
                recoveredTemp=[];
                labels2.push(labelsTemp2);
                labelsTemp2 = [];
    
            }
            ////chart Cases
    
        $('#chartBig3').remove(); // this is my <canvas> element
        $('.chart-area3').append('<canvas id="chartBig3"><canvas>');    
    
         var ctx3 = document.getElementById('chartBig3').getContext('2d');
         ctx3.canvas.width = "854";// resize to parent width
         ctx3.canvas.height = "300"; // resize to parent height 
         var chartBig3 = new Chart(ctx3, {
             type: 'line',
             data: {
                 labels: labels2[0],
             },
             options:{
                 legend:{
                     display: true,
                 }
             }
         });
        var GreenColor = ["#00FFFF","#7FFFD4","#66CDAA","#008080","#5F9EA0"];
    
         for(let i=0;i<recovered.length;i++){
    
             chartBig3.data.datasets.push({
                 fill: true,                        
                 data: recovered[i],  
                 label: selectedcountries[i],
                 //backgroundColor: gradientStroke2,
                 borderColor: GreenColor[i],
                 borderWidth: 2,
                 borderDash: [],
                 borderDashOffset: 0.0,
                 pointBackgroundColor: GreenColor[i],
                 pointBorderColor: 'rgba(255,255,255,0)',
                 pointHoverBackgroundColor: GreenColor[i],
                 pointBorderWidth: 20,
                 pointHoverRadius: 4,
                 pointHoverBorderWidth: 15,
                 pointRadius: 4,
           
             });
         }
         chartBig3.update();
        });
            /*********** /CHART RECOVERED */
    
          }
    
        }else{
            alert('Ops! You Can Only Compare Between 5 Countries')
        }
    
    }

});
