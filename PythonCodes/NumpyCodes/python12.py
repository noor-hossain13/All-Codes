import pandas as pd

data = {
    'Name' : ['Noor','Hossain','Tarik','Fahim'],
    'Age'  :[20,None,30,40],
    'salary':[50000,40000,None,1000000]
}
df = pd.DataFrame(data)
print("Orginal dataframe : ")
print(df)

print(df.isnull().sum())

#df_drop=df.dropna()
#print(df_drop)
print(df.isnull().mean()*100)

df['Age'].fillna(df['Age'].mean(),inplace=True)
df['salary'].fillna(df['salary'].mean(),inplace=True)
print(df)