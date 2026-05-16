import pandas as pd

df = pd.read_json('mtcars-parquet.json', lines=True, encoding='latin1')

print(df)
print (f'Shape:{df.shape}')
print(f'Columns:{df.columns}')