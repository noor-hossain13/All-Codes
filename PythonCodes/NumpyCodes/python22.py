import numpy as np

# Average 4 customers arrive per hour
samples = np.random.poisson(lam=4, size=10000)

print("Mean:", samples.mean())      # ≈ 4.0
print("Variance:", samples.var())   # ≈ 4.0