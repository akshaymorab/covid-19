<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="author" content="RIYUZAKHI">
	<title>Souratron - Covid19Tracker-World</title>
</head>
<?php include_once '../layout_header.php'; ?>
	
	<script src="covid19.js"></script>
	<script>   
		$(document).ready(function () {
			Covid19();
		});
	</script> 

	
	
	
	<div class="alldash">
		    <a target="_blank" href="https://github.com/akshaymorab/covid-19"><div class="forkband">Fork @ <i class="fa fa-github"></i></div></a>
		<div class="leftdash">
			<br/>
			
			<div class="globalcasesboard" id="GSB">
				<b>Global Cases</b>
			</div><br/>
			<div class="global_boxes">
				<div class="box1"><span id='confirmed'>Confirmed: ###</span></div>
				<div class="box2"><span id='recovered'>Recovered: ###</span></div>
				<div class="box3"><span id='death'>Deaths: ###</span></div>
				
			</div>
			<div class="countrycasesboard">
				<b id='countryId'>Country Cases</b>
			</div><br/>
			<div class="global_boxes">
				<div class="box1"><span id='cntryCnfrd'>Confirmed: ###</span></div>
				<div class="box2"><span id='cntryRecvd'>Recovered: ###</span></div>
				<div class="box3"><span id='cntryDeath'>Deaths: ###</span></div>
			</div>	

			<div class="coronapiechart">
				<div id="chartContainer" style="height:200px; width: 100%;overflow-x: scroll;overflow: hidden;"></div>
			</div>
			<br />
			<div>
				<div class="globalcasesboard" id="GSB">
				<b id='countryRatio'>Country Ratio</b>
				</div><br/>
				<div>
					<table id="cntryRatio" class='tableDesign bottom'>
						<thead id="cntryRatioHead" class='thContent'>
							<tr class="center aligned">
								<th>Attribute</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody class="tbCovid19Rt"></tbody>
					</table>
					<table id="header-fixed"></table>
					
				</div>
				
			</div>
			
		</div>

		<div class='centerdash'>
			<div id='loader' class='mapLoader'>
				<img src='../images/loader.gif' class='ldrgif' />
			</div>
			
			<div id='cTracker' class="map"></div>
		</div>
			
		<div class="rightdash">
			<div class="globalcasesboard" id="GSB">
				<b>Global Details</b>
			</div><br/>
			<div class="countrywisetally">
				<table id="cntryAttr" class='tableDesign bottom'>
					<thead id="cntryHead" class='thContent'>
						<tr class="center aligned">
							<th>Rank</th>
							<th>Country</th>
							<th>Confirmed</th>
							<th>Recovered</th>
							<th>Death</th>
							<th>Active</th>
							<th>TodayCases</th>
							<th>TodayDeath</th>
							<th>Critical</th>
							<th>Cases / 1Mn.</th>
							<th>Deaths / 1Mn.</th>
							<th>Tests</th>
							<th>Tests / 1Mn.</th>
						</tr>
					</thead>
					<tbody class="tbContent"></tbody>
				</table>
				<table id="header-fixed"></table>
			</div>

			<p class="SWH" >State Wise</p>
			<div class="statewisetally TB">
				
				<div class="statesboard">
					<b>State 1</b><div class="deadptnt"></div><div class="actvptnt"></div><div class="rcrvdptnt"></div>
				</div>
				
			</div>

			<div class='cntrychrt'>
				<div id="chartContainer1" style="height: 200px; width: 100%;"></div>
			</div>
			<div class='cntrydtl'>
				<div class="globalcasesboard" id="GSB">
				<b id='cntryDetails'>Country Details</b>
				</div><br/>
				<table id="cntryDtl" class='tableDesign bottom'>
					<thead id="cntryDtlHead" class='thContent'>
						<tr class="center aligned">
							<th>Attribute</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody class="tbCntDtl"></tbody>
				</table>
				<table id="header-fixed"></table>
				<div class='symbology'>
					<p style="color:white;text-align:center;width:100%;">Color Code: Number of Deaths</p>
					<div class='legend'> < 250
						<span style='position: relative;float: left;height: 15px;width: 25px;background: rgba(47,233,74,0.5);margin:2px;'></span>
					</div>
					<div class='legend'>
						250-3000<span style='position: relative;float: left;height: 15px;width: 25px;background: rgba(255,215,0,0.5);margin:2px;'></p></span>
					</div>
					<div class='legend'>
						> 3000<span style='position: relative;float: left;height: 15px;width: 25px;background: rgba(255,0,0,0.5);margin:2px;'></span>
					</div>
				</div>
			</div>
		</div>

    
	

    <i class="scrolltop fa fa-arrow-circle-o-up"></i>
    <div class="strncpyrts"> 2021 <span>&copy</span> SOURATRON IT SOLUTIONS PVT. LTD. All Rights Reserved.
	    <p> Powered by <a href="http://wwww.souratron.com"><h3>Souratron</h3></a>. </p>
    </div>
</body>
</html>	
<style>
header{
	background:#0f6eafaa;
}
.menubar,.mnuclse{
	line-height:0;
}
</style>
