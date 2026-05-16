import matplotlib.pyplot as plt
import numpy as np
# Data for the plot

score = np.array([25,45,78,48,78,45,89,99,78,74,55,21,45,78,48,78,45,89,99,78,74,55,21])
plt.hist(score, bins=10, color='blue', edgecolor='black', alpha=0.7) 
plt.title('Score Distribution')
plt.xlabel('Scores')
plt.ylabel('Frequency')
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.show()
