import numpy as np
arr = np.array([1, 2, 3, 4, 5])
print("Original array:", arr)
print("Memory address of original array:", arr.__array_interface__['data'][0])
print("Size of original array in bytes:", arr.nbytes)
print("Indices where array equals 3:", np.where(arr == 3))
print("Indices where array is greater than 3:", np.where(arr > 3))