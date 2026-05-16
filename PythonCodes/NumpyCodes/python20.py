#Normal distribution


import numpy as np
import matplotlib.pyplot as plt

data = np.random.normal(loc=0 ,scale=1, size=10000)
plt.hist(data, bins=100)
#plt.show()

print(data.mean())
print(data.std())

plt.hist(data, bins=100, density=True)
plt.title('Normal Distribution')
plt.show()