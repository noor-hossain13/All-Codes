x = int(input())
for i in range(x):
    a , b = input().split()
    if a.endswith(b):
        print("encaixa")
    else:
        print("nao encaixa")    