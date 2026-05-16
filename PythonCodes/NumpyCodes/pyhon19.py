from numpy import random
x = random.normal(size=(2,3))
print(x)
x = random.normal(loc=1, scale=2, size=(2, 3))

print(x)
y = random.normal(loc=1, scale=2, size=(2, 3))

print(y)