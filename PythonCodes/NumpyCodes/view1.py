import numpy as np

# Create an original array
original_array = np.array([10, 20, 30, 40, 50])

# Create a view of the original array
view_array = original_array.view()

# Modify an element in the view
view_array[1] = 99

# Print both arrays
print("Original Array:", original_array)
print("View Array:", view_array)

# Modify an element in the original array
original_array[3] = 77

# Print both arrays again
print("After modifying original array:")
print("Original Array:", original_array)
print("View Array:", view_array)