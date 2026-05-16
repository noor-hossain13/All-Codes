import matplotlib.pyplot as plt
import numpy as np

# Data for the plot
x = np.array([0, 1, 2, 3, 4, 5])
y = np.array([0, 2, 4, 1, 3, 5])

# Create the plot
plt.plot(x, y)

# Add labels and title
plt.xlabel("X-axis Label")
plt.ylabel("Y-axis Label")
plt.title("Simple Line Plot")

# Display the plot
plt.show()