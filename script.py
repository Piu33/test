import pandas as pd

# Leggi il file Excel, pandas potrebbe già interpretare la colonna come datetime
df = pd.read_excel("files/data.xlsx")

# Converte la colonna della data in stringa e poi applica il formato desiderato
df["DATA"] = pd.to_datetime(df["DATA"]).dt.strftime("%d.%m.%Y")

# Salva in JSON
df.to_json("files/data.json", orient="records", indent=4, force_ascii=False)

print("Dati salvati in data.json")