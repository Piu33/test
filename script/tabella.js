async function caricaDati() {
  const response = await fetch('data.json');
  const dati = await response.json();
  
  let table = "<table border='1'><tr>";
  for (let key in dati[0]) {
      table += `<th>${key}</th>`;
  }
  table += "</tr>";
  
  dati.forEach(row => {
      table += "<tr>";
      for (let key in row) {
          table += `<td>${row[key]}</td>`;
      }
      table += "</tr>";
  });
  table += "</table>";

  document.getElementById("tabella").innerHTML = table;
}

window.onload = caricaDati;