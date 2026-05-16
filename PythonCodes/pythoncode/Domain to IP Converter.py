import socket
import pyfiglet
from termcolor import colored
import time

# Display a fancy banner
banner = colored(pyfiglet.figlet_format("Domain to IP"), 'green')
print(banner)

# Input from the user
domain_name = input(colored("Enter your Target Domain: ", 'yellow'))

# Loading animation for extra fanciness
print(colored("Resolving domain to IP...", 'cyan'))
time.sleep(2)  # Simulate a short delay

# Resolve domain to IP
try:
    IP = socket.gethostbyname(domain_name)
    print(colored(f"Success! The IP address of {domain_name} is {IP}", 'green'))
except socket.gaierror:
    print(colored("Error: Unable to resolve domain. Please check the domain name and try again.", 'red'))
