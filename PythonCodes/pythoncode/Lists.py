Subjects = ["c","c+","java","python","Kotlin","Ruby"]
print(Subjects)
print(Subjects[5])
print((len(Subjects)))
print(Subjects[2:])
print(Subjects[-2])

#To see if a item is in the list or not we use below things

print("java" in Subjects)  # If the item is not in in list it will print False

print(Subjects *3)#Print 3 times

Subjects = Subjects + ["R", "54", "Swift", "444"]
print(Subjects)
print(len(Subjects))

Subjects.append("IOS")
print(Subjects)
Subjects.insert(2,"Android")

Subjects.remove("java")
print(Subjects)
Subjects.sort()
print(Subjects)
Subjects.pop()
print(Subjects)

Subjects2 = Subjects.copy()
print(Subjects2)

position = Subjects.index("c")
print(position)

cnt = Subjects.count("c")
print(cnt)