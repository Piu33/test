import pandas as pd
import json
from datetime import datetime

# Leggi il file Excel
df = pd.read_excel("files/data.xlsx", sheet_name="table")

# Converte la colonna della data in formato datetime
df["DATA"] = pd.to_datetime(df["DATA"], format="%d.%m.%Y")

# Ordina i dati dalla data più recente alla più lontana
df_sorted = df.sort_values(by="DATA", ascending=False)

# Converte di nuovo la colonna 'DATA' in formato stringa (dd.mm.yyyy)
df_sorted["DATA"] = df_sorted["DATA"].dt.strftime("%d.%m.%Y")

# Salva i dati ordinati in un file JSON
df_sorted.to_json("files/table.json", orient="records", indent=4, force_ascii=False)

print("Dati tabella salvati in table.json")



# Leggi il file Excel
df1 = pd.read_excel("files/data.xlsx", sheet_name="vix")

# Converte la colonna della data in formato datetime
df1["DATA"] = pd.to_datetime(df1["DATA"], format="%d.%m.%Y")

# Ordina i dati dalla data più recente alla più lontana
df_sorted1 = df1.sort_values(by="DATA", ascending=False)

# Converte di nuovo la colonna 'DATA' in formato stringa (dd.mm.yyyy)
df_sorted1["DATA"] = df_sorted1["DATA"].dt.strftime("%d.%m.%Y")

# Salva i dati ordinati in un file JSON
df_sorted1.to_json("files/vix.json", orient="records", indent=4, force_ascii=False)

print("Dati tabella salvati in vix.json")



# Leggi il file Excel
df2 = pd.read_excel("files/data.xlsx", sheet_name="sp")

# Converte la colonna della data in formato datetime
df2["DATA"] = pd.to_datetime(df2["DATA"], format="%d.%m.%Y")

# Ordina i dati dalla data più recente alla più lontana
df_sorted2 = df2.sort_values(by="DATA", ascending=False)

# Converte di nuovo la colonna 'DATA' in formato stringa (dd.mm.yyyy)
df_sorted2["DATA"] = df_sorted2["DATA"].dt.strftime("%d.%m.%Y")

# Salva i dati ordinati in un file JSON
df_sorted2.to_json("files/sp.json", orient="records", indent=4, force_ascii=False)

print("Dati tabella salvati in sp.json")