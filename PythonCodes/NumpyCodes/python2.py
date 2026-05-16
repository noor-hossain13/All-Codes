import pandas as pd

df = pd.read_json('mtcars-parquet.json', lines=True, encoding='latin1')
#print(df.head())
#print("Tail")
#print(df.tail())

print ('Display the information ')
print("Display the information about the data frame")
print("Display")
print (df.info())
print(df.describe())