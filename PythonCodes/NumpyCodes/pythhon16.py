import numpy as np
arr = np.array([44, 2, 1, 7, 33, 9])
arr.sort()
x = np.searchsorted(arr, 7)

print(x)