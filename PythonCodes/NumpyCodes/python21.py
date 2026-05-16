#Binomial Distribution
import numpy as np

#Generate 10000 experiments of tossing a coin 10 times
samples = np.random.binomial(n=10, p=.5, size=10000)
print("Mean",samples.mean())
print("Variance",samples.var())

#counnt how many times we ggot exactly 6 heads
unique, counts = np.unique(samples,return_counts=True)
print(dict(zip(unique, counts)))