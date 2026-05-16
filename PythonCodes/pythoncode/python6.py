import matplotlib.pyplot as plt

plt.figure("Sales Window")       # Window name (appears on the OS-level window)
plt.plot([1, 2, 3], [100, 200, 150])
plt.title("Monthly Sales Data")  # Title inside the plot
plt.xlabel("Month")
plt.ylabel("Sales")
plt.show()
