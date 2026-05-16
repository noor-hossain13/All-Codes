def student(*details):
    print(details)
    print(details[1])


def add(*numbers):
    sum = 0
    for num in numbers:
        sum = sum + num
    print(sum)

student(101,"Tarik")
student(102,"Noor","Hossain")
#student(103)


add(10,20)
add(10,250,30)
add(10,20,30,40,50)