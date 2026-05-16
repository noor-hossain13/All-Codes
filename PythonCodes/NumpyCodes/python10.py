import matplotlib.pyplot as  plt
import numpy as np

# Data for the plot
marks = np.array([40,82,79,99,82,58,47,78,55,77])
students = np.array([1,4,7,8,9,4,7,5,6,8])

plt.figure('Students marks distribution')
plt.scatter(students, marks,color='green',marker='+',s=100,edgecolor='b',linewidth=5,alpha=0.7)
plt.title('Students Marks Distribution')
plt.xlabel('Students')
plt.ylabel('Marks')
plt.grid(True)

plt.show()
savefig('students_marks_distribution.png',dpi=300, bbox_inches='tight')