async function caricaDati() {
  const response = await fetch('files/table.json');
  const dati = await response.json();
  const response_vix = await fetch('files/vix.json');
  const dati_vix = await response_vix.json();
  const response_sp = await fetch('files/sp.json');
  const dati_sp = await response_sp.json();

  
  let table = "<table><thead><tr>";
  for (let key in dati[0]) {
      table += `<th>${key}</th>`;
  }
  table += "</tr></thead>";
  
  dati.forEach(row => {
      table += "<tr>";
      for (let key in row) {
        if (row[key] == "BOT" || row[key] == "SOLD"){
          if (row[key] == "BOT"){
            table += `<td style="color: blue">${row[key]}</td>`
          }
          if (row[key] == "SOLD"){
            table += `<td style="color:red">${row[key]}</td>`
          }
        }
        else {
          table += `<td>${row[key]}</td>`;
        }
      }
      table += "</tr>";
  });
  table += "</table>";
  document.getElementById("tabella").innerHTML = table;

  const vixPoints = dati_vix.map(d => ({
    x: new Date(d.DATA.split('.').reverse().join('-')), // Converte la data in formato Date
    y: d.VIX 
  }));
  const piu33Points = dati_vix.map(d => ({
    x: new Date(d.DATA.split('.').reverse().join('-')), // Converte la data in formato Date
    y: d.PIU33 
  }));

  const percent33Points  = dati_sp.map(d => ({
    x: new Date(d.DATA.split('.').reverse().join('-')), // Converte la data in formato Date
    y: d.PIU33 
  }));
  const spPoints = dati_sp.map(d => ({
    x: new Date(d.DATA.split('.').reverse().join('-')), // Converte la data in formato Date
    y: d.SP500 
  }));




  var chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "Monitoraggio PIU33 e correlazione VIX",
			margin: 50,
			fontSize:50,
			fontFamily: "tahoma",
			color: "black"
			
		},
		axisX:{
			interval: 2,
			intervalType: "month",
			labelFontSize: 20
		},
		axisY:[{
			title: "PIU33",
			lineColor: "#64a102",
			tickColor: "#64a102",
			labelFontColor: "#64a102",
			titleFontColor: "#64a102",
			titleFontSize:30,
			labelFontSize:30,
			interval:40000,
			includeZero: true,
			suffix: ""
		},
		],
		axisY2: {
			title: "VIX",
			lineColor: "#f50505",
			tickColor: "#f50505",
			labelFontColor: "#f50505",
			titleFontColor: "#f50505",
			titleFontSize:30,
			labelFontSize:30,
			interval:2,
			includeZero: false,
			prefix: "",
			suffix: ""
		},
		toolTip: {
			shared: true
		},
		legend: {
			cursor: "pointer",
			itemclick: toggleDataSeries
		},
		data: [{
			type: "line",
			name: "PIU33",
			color: "#64a102",
			showInLegend: true,
			axisYIndex: 0,
			lineThickness: 5,
			dataPoints: piu33Points
		},
		{
			type: "line",
			name: "VIX",
			color: "#f50505",
			axisYIndex: 2,
			axisYType: "secondary",
			showInLegend: true,
			lineThickness: 2,
			dataPoints: vixPoints
		}]
	});
  chart.render();

  var chart1 = new CanvasJS.Chart("chartContainer1", {
    title:{
        text: "Performance (%) PIU33 vs S&P500",
        margin: 50,
        fontSize: 50,
        fontFamily: "tahoma",
        color: "black"
    },
    axisX:{
        interval: 2,
        intervalType: "month",
        labelFontSize: 20
    },
    axisY:[{
        title: "PIU33",
        lineColor: "#64a102",
        tickColor: "#64a102",
        labelFontColor: "#64a102",
        titleFontColor: "#64a102",
        titleFontSize: 30,
        labelFontSize: 30,
        interval: 5,
        includeZero: true,
        suffix: "",
        minimum: -10, // Imposta il valore minimo
        maximum: 70 // Imposta il valore massimo
    },
    {
        title: "SP500",
        lineColor: "#141414",
        tickColor: "#141414",
        labelFontColor: "#141414",
        titleFontColor: "#141414",
        titleFontSize: 30,
        labelFontSize: 30,
        interval: 5,
        includeZero: true,
        suffix: "",
        minimum: -10, // Imposta il valore minimo
        maximum: 70 // Imposta il valore massimo
    }],
    
    toolTip: {
        shared: true
    },
    legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
    },
    data: [{
      type: "line",
      name: "PIU33",
      color: "#64a102",
      showInLegend: true,
      axisYIndex: 0,
      lineThickness: 5,
      dataPoints: percent33Points 
      },
    {
      type: "line",
      name: "SP500",
      color: "#141414",
      axisYIndex:1,
      showInLegend: true,
      lineThickness: 5,
      dataPoints: spPoints
    }],
  });
  chart1.render();

  function toggleDataSeries(e) {
	  if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		  e.dataSeries.visible = false;
	  } else {
		  e.dataSeries.visible = true;
	  }
	  e.chart.render();
  }
}

window.onload = caricaDati;