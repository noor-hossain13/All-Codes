import numpy as np
import pandas as pd
from datetime import datetime

# ====================== CONFIGURATION ======================
np.random.seed(42)  # For reproducible results

num_students = 500

# ====================== GENERATE DATA ======================

# 1. Student ID
student_ids = [f"STU{str(i).zfill(4)}" for i in range(1, num_students + 1)]

# 2. Gender (50% Male, 50% Female)
genders = np.random.choice(['Male', 'Female'], size=num_students, p=[0.5, 0.5])

# 3. Age (Normal distribution)
ages = np.random.normal(loc=18, scale=2, size=num_students).astype(int)
ages = np.clip(ages, 16, 24)                    # Limit between 16 to 24

# 4. Height in cm (Normal distribution)
heights = np.random.normal(loc=165, scale=8, size=num_students)
heights = np.round(heights, 1)

# 5. Weight in kg (Normal distribution)
weights = np.random.normal(loc=60, scale=10, size=num_students)
weights = np.round(weights, 1)

# 6. Number of Absences (Poisson distribution)
absences = np.random.poisson(lam=5, size=num_students)

# 7. Exam Score (out of 100) - using Logistic for slightly heavier tails
exam_scores = np.random.logistic(loc=65, scale=12, size=num_students)
exam_scores = np.clip(exam_scores, 20, 98).round(1)

# 8. Pass/Fail (Binomial)
passed = np.random.binomial(n=1, p=0.75, size=num_students)  # 75% pass rate

# 9. Favorite Subject (Multinomial)
subjects = ['Math', 'Physics', 'Chemistry', 'Biology', 'Computer', 'English']
probs = [0.2, 0.15, 0.15, 0.1, 0.25, 0.15]
favorite_subject = np.random.choice(subjects, size=num_students, p=probs)

# ====================== CREATE DATAFRAME ======================
df = pd.DataFrame({
    'Student_ID': student_ids,
    'Gender': genders,
    'Age': ages,
    'Height_cm': heights,
    'Weight_kg': weights,
    'Absences': absences,
    'Exam_Score': exam_scores,
    'Passed': passed,
    'Favorite_Subject': favorite_subject
})

# Add Pass/Fail text
df['Result'] = df['Passed'].map({1: 'Pass', 0: 'Fail'})

# ====================== DISPLAY RESULTS ======================
print("🎓 Fake Student Dataset Generated Successfully!")
print(f"Total Students: {len(df)}\n")

print("First 10 students:")
print(df.head(10))

print("\n" + "="*60)
print("📊 BASIC STATISTICS")
print("="*60)
print(df.describe())

# Some interesting analysis
print(f"\nPass Percentage: {df['Passed'].mean()*100:.1f}%")
print(f"Average Exam Score: {df['Exam_Score'].mean():.2f}")
print("\nFavorite Subjects Count:")
print(df['Favorite_Subject'].value_counts())

# ====================== SAVE TO CSV ======================
df.to_csv('fake_student_dataset.csv', index=False)
print("\n✅ Dataset saved as 'fake_student_dataset.csv'")