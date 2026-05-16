x = int(input())

for i in range(x):
    y = int(input())
    total = 0

    for j in range(y):
        s = input()

        for k in range(len(s)):
            total += (ord(s[k]) - 65) + j + k

    print(total)