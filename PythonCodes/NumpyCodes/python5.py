import matplotlib.pyplot as plt
import numpy as np

# Data for the plot
sales = np.array([100, 150, 200, 250, 300])
months = np.array(['Jan', 'Feb', 'Mar', 'Apr', 'May'])

# ✅ Create figure BEFORE plotting and give it a name
plt.figure('Sales Over ')

# Create the plot
plt.plot(
    months, sales,
    marker='o',
    linestyle='--',
    color='r',
    linewidth=4,
    markersize=10,
    markerfacecolor='b',
    markeredgewidth=3,
    markeredgecolor='g'
)

# Add legend, labels, and grid
plt.title('Monthly Sales Data')
plt.legend(['Sales hhhhhhhh'])
plt.xlabel('Months')
plt.ylabel('Sales in USD')
plt.grid(True)

# Show the plot
plt.show()
