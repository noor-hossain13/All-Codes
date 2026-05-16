i = 0
sum = 0
while i<=25:
    print(i,end=" ")
    i = i+1
    sum = i + sum
print("While")
print((sum))


# Initialize the sum variable
total = 0

# Use a for loop to iterate through numbers from 1 to 10
for num in range(1, 11):  # The range function generates numbers from 1 to 10
    total += num  # Add each number to the total

# Print the result
print("The sum of numbers from 1 to 10 is:", total)
