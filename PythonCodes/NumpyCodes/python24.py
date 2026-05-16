#Multinominal distribution example in Python using numpy
import numpy as np

# Example: Rolling a fair die 20 times
probs = [1/6]*6                    # equal probability for 1 to 6
result = np.random.multinomial(n=20, pvals=probs)

print("Counts for faces 1 to 6:", result)
print("Total:", result.sum())     # Must be 20