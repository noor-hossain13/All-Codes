# ------------------ STRING PART ------------------
import socket
# Take input from user
text = input("Enter a string: ")

# Convert to uppercase
upper_text = text.upper()

# Reverse the string
reversed_text = text[::-1]

# Count length
length = len(text)

# Print results
print("\n--- String Operations ---")
print("Uppercase:", upper_text)
print("Reversed:", reversed_text)
print("Length:", length)


# ------------------ FILE PART ------------------

# Write to file
file = open("sample.txt", "w")
file.write("Hello Noor\n")
file.write("This is a file example.")
file.close()

# Read from file
file = open("sample.txt", "r")
content = file.read()
file.close()

print("\n--- File Content ---")
print(content)


# ------------------ NETWORK PART ------------------



# Create socket
client = socket.socket()

# Connect to server
client.connect(("example.com", 80))

# Send HTTP request
client.send(b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n")

# Receive response
response = client.recv(1024)

print("\n--- Server Response ---")
print(response.decode())

# Close connection
client.close()