async function caricaDati() {
  const response = await fetch('files/data.json');
  const dati = await response.json();
  
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
}

window.onload = caricaDati;