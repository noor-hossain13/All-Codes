num1 = int (input("Enter 1st number : "))
num2 = int(input('Enter 2nd Number : '))
num3 = int(input('Enter 3 rd nnumber : '))


pri = num1 if num1>num2 else num2

print("Max : ",pri)

if num1<num2 and num1<num3:   # Or is also same
    print("Use of And")


print('')