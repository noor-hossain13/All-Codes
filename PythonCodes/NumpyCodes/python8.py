import matplotlib.pyplot as plt
import numpy as np

# Data for the plot
sales = np.array([100, 150, 200, 250, 300])
months = np.array(['Jan', 'Feb', 'Mar', 'Apr', 'May'])
plt.figure('Sales Distribution')
plt.pie(sales, labels=months, autopct='%1.1f%%', startangle=140, shadow=False, colors='rgbym')
plt.title('Monthly Sales Distribution')
plt.axis("equal")  # Equal aspect ratio ensures that pie is drawn as a circle.
plt.show()