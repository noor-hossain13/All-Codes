count = 0
total = 0
for i in range(6):
    n = float(input())
    if n>0:
        count+=1
        total+=n
print(f"{count} valores positivos") 
print(f"{total/count:.1f}")       
