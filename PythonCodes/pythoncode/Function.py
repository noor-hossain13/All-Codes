def add(a,b):
    sum =a+b
    print(sum)
    return sum
i=0
r=0
def message():
    print("No parameter")
while i<2:
    a = int(input("Enter a : "))
    b = int(input("enter b : "))
    i = i +1
    r=add(a, b)
    print(r)
    print(add(a,b))



message()

'''
a = int(input("Enter a : "))
b = int(input("enter b : "))
add(a,b)

'''

