import os
import pandas as pd

# ✅ Change working directory to D drive folder

# Now all files will save in D:\PythonProjects
data = {
    'Name': ['John', 'Anna'],
    'Age': [28, 24]
}
df = pd.DataFrame(data)
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)

print("Files saved in:", os.getcwd())
