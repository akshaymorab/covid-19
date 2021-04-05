
/*
//=========================================================================\\
//	  Project: Covid-19 Dashboard										   \\ 
//    JavaScript Author: Akshay R Morab                                    \\
//    Author Company: Souratron Pvt. Ltd.                                  \\
//    Author Company URL: http://souratron.com                             \\  
//    License: GNU General Public License v3.0. 						   \\
//             Read the license document. 								   \\
//=========================================================================\\  
*/
//public variables
var map;
var covidres = [];
var cnfglb = 0;var dthglb = 0;var recglb = 0;
var cntryNme;
function Covid19(){
	//Get you mapbox key from https://www.mapbox.com
    mapboxgl.accessToken = 'YOUR MAPBOX KEY HERE';
	
	map = new mapboxgl.Map({
		container: 'cTracker',
		style: 'mapbox://styles/mapbox/dark-v9',
		zoom: 1,
		pitch: 0,
		antialias: true,
		bearing: 0,
		center: [0, 0]
    });

    mapboxgl.setRTLTextPlugin(
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
        );
    
    //Add navigation control over map
	var nav = new mapboxgl.NavigationControl();
	map.addControl(nav);

	//get shapefile data
    var dmJSON = 'YOUR MAP/SHAPEFILE LINK HERE';

    $.getJSON(dmJSON, function (data) {
        ctryFeat = data.features;
        //Add Covoid Data
        var testjson = 'YOUR COVID19 LINK HERE';

        $.getJSON(testjson, function (data) {
            //console.log(this.responseText);
            
            /* var data = this.responseText.split('[');
            var feature = data[1].split(']'); */
            var featDet = data;//JSON.parse("["+feature[0]+"]");

            for(var x=0;x<=ctryFeat.length-1;x++){
                for(y=0;y<=featDet.length-1;y++){
                    if(ctryFeat[x].properties.CNTRY_NAME == featDet[y].country){
                        
                        if(x == 0){
                            cnfglb = featDet[y].cases;
                            dthglb = featDet[y].deaths;
                            recglb = featDet[y].recovered;
                        }
                        else{
                            cnfglb = cnfglb + featDet[y].cases;
                            dthglb = dthglb + featDet[y].deaths;
                            recglb = recglb + featDet[y].recovered;
                        }
                        covidres.push({
                            "type": "Feature",
                            "layer": {
                                "id": "Covid19"
                            },
                            "geometry": {
                                "type": "Polygon",
                                "coordinates": ctryFeat[x].geometry.coordinates
                            },
                            "properties": {
                                "OBJECTID": ctryFeat[x].properties.OBJECTID,
                                "Country": ctryFeat[x].properties.CNTRY_NAME,
                                "Confirmed": featDet[y].cases,
                                "TodayCases": featDet[y].todayCases,
                                "Deaths": featDet[y].deaths,
                                "TodayDeaths": featDet[y].todayDeaths,
                                "Recovered": featDet[y].recovered,
                                "Active": featDet[y].active,
                                "Critical": featDet[y].critical,
                                "CasesPerOneMillion": featDet[y].casesPerOneMillion,
                                "DeathsPerOneMillion": featDet[y].deathsPerOneMillion,
                                "Tests": featDet[y].tests,
                                "TestsPerOneMillion": featDet[y].testsPerOneMillion,
                                "Flag": featDet[y].countryInfo.flag
                            }
                        });
                    }
                }
            }

            map.addLayer({
                'id': 'Covid19_GLA',
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': covidres
                        }
                    },
                    'layout': {
                        'visibility': 'visible'
                    },
                    'paint': {
                        //'circle-radius': 8,
                        'fill-color':"rgba(0, 0, 0, 0)",
                        'fill-outline-color': '#fcc010'
                    }
            });
            document.getElementById('confirmed').textContent = cnfglb;
            document.getElementById('recovered').textContent = recglb;
            document.getElementById('death').textContent = dthglb;

            covidres.sort((a, b) => Number(b.properties.Confirmed) - Number(a.properties.Confirmed));
            GlbChrt(covidres);

            $('.tbContent').remove();
            var tbody = '<tbody class="tbContent">';
            for(x=0;x<=covidres.length-1;x++){
                var rnk = x+1;
                var oid =covidres[x].properties.OBJECTID;
                tbody +=
                ('<tr class="center aligned"><td>'+rnk+'</td><td id='+oid+' class="cntryLst" onclick=zoomTo(this.id)>'+covidres[x].properties.Country+'</td><td class="confirmed">'+covidres[x].properties.Confirmed+'</td><td class="recovered">'+covidres[x].properties.Recovered+'</td><td class="death">'+covidres[x].properties.Deaths+'</td><td class="recovered">'+covidres[x].properties.Active+'</td><td class="confirmed">'+covidres[x].properties.TodayCases+'</td><td class="death">'+covidres[x].properties.TodayDeaths+'</td><td>'+covidres[x].properties.Critical+'</td><td>'+covidres[x].properties.CasesPerOneMillion+'</td><td>'+covidres[x].properties.DeathsPerOneMillion+'</td><td>'+covidres[x].properties.Tests+'</td><td>'+covidres[x].properties.TestsPerOneMillion+'</td></tr>');
            }
            $('#cntryAttr').append(tbody + '</tbody>');


            $('#loader').hide();
            $('#cTracker').show();
            document.getElementById('instruct').textContent = 'Click on Map or Global List Country for details...';
            
            map.on('click', 'Covid19_GLA', function (e) {
                //featureClick(map, e);
                if(e.features[0].properties.OBJECTID != ''){
                    zoomTo(e.features[0].properties.OBJECTID);
                }
                else{
                    alert('No Data Found!!');
                }
                
            });
        });
    }); 
}

function zoomTo(id){
    var rnk,cntry,objid,cnfrm, recvr,dets,src;
    for(var t =0;t<=covidres.length-1;t++){
        if(id == covidres[t].properties.OBJECTID){
            objid = covidres[t].properties.OBJECTID;
            cntry = covidres[t].properties.Country;
            rnk = t+1;
            cnfrm = covidres[t].properties.Confirmed;
            recvr = covidres[t].properties.Recovered;
            dets = covidres[t].properties.Deaths;
            src = covidres[t].properties.Flag;

            var len = covidres[t].geometry.coordinates.length - 1;
            var bound1 = covidres[t].geometry.coordinates[0];
            var bound2 = covidres[t].geometry.coordinates[len];
            var x = bound2.length - 1;
            var bounds = bound1.reduce(function (bounds, coord) {
                return bounds.extend(coord);
            }, new mapboxgl.LngLatBounds(bound1[0], bound2[x]));

            map.fitBounds(bounds, { padding: 50 });
        }
    }
    var expression = ["match", ["get", "OBJECTID"]];
    var outlineexp = ["match", ["get", "OBJECTID"]];

    if(cntryNme!=null){
        map.removeLayer('Covid19_GLA_'+cntryNme);
    }

    $('.tbCntDtl').remove();
    var tbody = '<tbody class="tbCntDtl">';
    tbody +=
    ('<tr class="center aligned"><td>Flag</td><td><img src='+src+' style="width:40px;height:20px;" /></td></tr>');

    var clr, oltclr
    if(dets >=0  && dets <250){
        clr = "rgba(0,0,0,0)";
        oltclr = "rgba(47,233,74,1)";
        expression.push(objid, clr);
        outlineexp.push(objid, oltclr);
        tbody +=
            ('<tr class="center aligned"><td>Color Code</td><td style="background:rgba(47,233,74,0.5);"></td></tr>');
    }
    if(dets >=250  && dets <3000){
        clr = "rgba(0,0,0,0)";
        oltclr = "rgba(255,215,0,1)";
        expression.push(objid, clr);
        outlineexp.push(objid, oltclr);
        tbody +=
            ('<tr class="center aligned"><td>Color Code</td><td style="background:rgba(255,215,0,0.5);"></td></tr>');
    }
    if(dets >=3000){
        clr = "rgba(0,0,0,0)";
        oltclr = "rgba(255,0,0,1)";
        expression.push(objid, clr);
        outlineexp.push(objid, oltclr);
        tbody +=
            ('<tr class="center aligned"><td>Color Code</td><td style="background:rgba(255,0,0,0.5);"></td></tr>');
    }
    tbody +=
            ('<tr class="center aligned"><td>Global Rank</td><td>'+rnk+'</td></tr>');

    $('#cntryDtl').append(tbody + '</tbody>');

    // Last value is the default, used where there is no data
    expression.push("rgba(0,0,0,0)");
    outlineexp.push("rgba(0,0,0,0)");

    map.addLayer({
        'id': 'Covid19_GLA_'+cntry,
            'type': 'fill',
            'source': 'Covid19_GLA',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                //'circle-radius': 8,
                'fill-color': expression,//"rgba(160, 168, 50, 0.8)",
                'fill-outline-color': outlineexp//'rgba(0,0,0,1)'
            }
    });

    document.getElementById('countryId').textContent = cntry + ' Cases';
    document.getElementById('countryRatio').textContent = cntry + ' Ratio';
    document.getElementById('cntryDetails').textContent = cntry + ' Details';

    document.getElementById('cntryCnfrd').textContent = cnfrm;
    document.getElementById('cntryRecvd').textContent = recvr;
    document.getElementById('cntryDeath').textContent = dets;

    $('.tbCovid19Rt').remove();
    var tbody = '<tbody class="tbCovid19Rt">';
    var cnf = Math.round((cnfrm/cnfglb) * 10000) / 10000;
    tbody +=
    ('<tr class="center aligned"><td>Total Confirmed Ratio</td><td>' + cnf + '%</td></tr>');
    var dth = Math.round((dets/dthglb) * 10000) / 10000;
    tbody +=
    ('<tr class="center aligned"><td>Total Deaths Ratio</td><td>' + dth + '%</td></tr>');
    var rec = Math.round((recvr/recglb) * 10000) / 10000;
    tbody +=
    ('<tr class="center aligned"><td>Total Recovered Ratio</td><td>' + rec + '%</td></tr>');
    $('#cntryRatio').append(tbody + '</tbody>');

    cntryNme = cntry;
    
    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: false,
        animationEnabled: true,
        backgroundColor: '#1f1f1f',
        title:{
            text: "Pie Chart",
            fontColor: "white"
        },
        legend:{
            cursor: "pointer",
            itemclick: explodePie,
            fontColor: "white"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            toolTipContent: "{name}: <strong>{y} - #percent %</strong>",
            indexLabel: "{name} : {y} - #percent %",
            indexLabelFontColor: 'white',
            dataPoints: [
                { y: cnfrm, name: "Confirmed", exploded: true },
                { y: recvr, name: "Recovered" },
                { y: dets, name: "Death" }
            ]
        }]
    });
    chart.render(); 
}

function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
}

function GlbChrt(glbVal){
    var datapoints=[];
    var datapoints1=[];
    var datapoints2=[];
    addData(glbVal, datapoints, datapoints1, datapoints2);
    var chart1 = new CanvasJS.Chart("chartContainer1", {
        animationEnabled: true,
        backgroundColor: '#1f1f1f',
        color:'#fff',
        title:{
            text: "Top 5 Effected Global",
            fontColor:"white"
        },
        axisX:{
            labelFontColor: "white"
          },
        axisY: {
            title: "Effected in numbers",
            labelFontColor: "white"
        },
        legend: {
            cursor:"pointer",
            itemclick : toggleDataSeries
        },
        toolTip: {
            shared: true,
            content: toolTipFormatter,
            backgroundColor:'#1f1f1f'
        },
        
        data: [{
            type: "bar",
            showInLegend: true,
            name: "Confirmed",
            color: "yellow",
            dataPoints: datapoints
        },
        {
            type: "bar",
            showInLegend: true,
            name: "Recovered",
            color: "green",
            dataPoints: datapoints1
        },
        {
            type: "bar",
            showInLegend: true,
            name: "Death",
            color: "red",
            dataPoints: datapoints2
        }]
    });
    chart1.render();
}

function toolTipFormatter(e) {
	var str = "";
	var total = 0 ;
	var str3;
    var str2 ;
    var clr = "white";
	for (var i = 0; i < e.entries.length; i++){
		var str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\">" + e.entries[i].dataSeries.name + "</span>: <strong style= \"color:"+clr+"\">"+  e.entries[i].dataPoint.y + "</strong> <br/>" ;
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	str2 = "<strong style= \"color:"+clr+"\">" + e.entries[0].dataPoint.label + "</strong> <br/>";
	str3 = "<span style = \"color:Tomato\">Total: </span><strong style= \"color:"+clr+"\">" + total + "</strong><br/>";
	return (str2.concat(str)).concat(str3);
}

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart1.render();
}

function addData(glbVal, datapoints, datapoints1, datapoints2) {
    var len = 5;
    while(len>=0){
        datapoints.push({
			label: glbVal[len].properties.Country,
			y: glbVal[len].properties.Confirmed
        });
        datapoints1.push({
			label: glbVal[len].properties.Country,
			y: glbVal[len].properties.Recovered
        });
        datapoints2.push({
			label: glbVal[len].properties.Country,
			y: glbVal[len].properties.Deaths
        });
        len--;
    }
}