#Poisson distribution example with visualization
import numpy as np
import matplotlib.pyplot as plt  # Import matplotlib for visualization

# Average 4 customers arrive per hour
samples = np.random.poisson(lam=4, size=10000)

print("Mean:", samples.mean())      # ≈ 4.0
print("Variance:", samples.var())   # ≈ 4.0

# Plot the histogram
plt.hist(samples, bins=15, color='skyblue', edgecolor='black', alpha=0.7)
plt.title("Poisson Distribution (λ=4)")
plt.xlabel("Number of Arrivals")
plt.ylabel("Frequency")
plt.grid(axis='y', linestyle='--', alpha=0.7)
plt.show()