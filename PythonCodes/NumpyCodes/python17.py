from numpy  import random
import numpy as np
arr = random.randint(1, 100, 10)
print(arr)
x = random.choice([1, 2, 3, 4, 5])
print(x)
y = random.choice([3, 5, 7, 9], p=[0.1, 0.3, 0.6, 0.0], size=(15))

print(y)

arr = np.array([1, 2, 3, 4, 5])
print("This is the array:", arr)
random.shuffle(arr)
print("This is the shuffled array:", arr)

arr1 = random.permutation(arr)
print("This is the permuted array:", arr1)