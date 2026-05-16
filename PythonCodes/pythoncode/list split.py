n = input("Enter a text of numbers separated by spaces: ")  # Example: 10 20 30 40 50

list_of_numbers = n.split()
sum = 0

for num in list_of_numbers:
    sum += int(num)  # Convert each number to an integer before adding to the sum

print(sum)