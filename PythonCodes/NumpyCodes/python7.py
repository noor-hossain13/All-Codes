import matplotlib.pyplot as plt
import numpy as np

# Data for the plot
sales = np.array([100, 150, 200, 250, 300])
months = np.array(['Jan', 'Feb', 'Mar', 'Apr', 'May'])

# ✅ Create figure BEFORE plotting and give it a name
plt.figure('Sales Over')

# Create the bar plot
plt.bar(
    months, sales,
    color='red',
    width=0.4,
    edgecolor='green',     # outline color
    linewidth=2           # outline thickness
)

# Add legend, labels, and grid
# plt.title('Monthly Sales Data')
# plt.legend(['Sales in USD'])
plt.xlabel('Months')
plt.ylabel('Sales in USD')
# plt.grid(axis='y', linestyle='--', alpha=0.7)  # grid only on Y-axis

# Show the plot
plt.show()
