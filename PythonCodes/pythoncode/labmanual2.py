# Install first if needed:
# pip install pycryptodome

from Crypto.Cipher import AES, DES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad


# ------------------ 1. CAESAR ------------------
def caesar_encrypt(text, shift):
    result = ""
    for ch in text:
        if ch.isalpha():
            result += chr((ord(ch) + shift - 97) % 26 + 97)
        else:
            result += ch
    return result

def caesar_decrypt(text, shift):
    return caesar_encrypt(text, -shift)


# ------------------ 2. AES ------------------
def aes_encrypt (text):
    key = get_random_bytes(16)   # secret key
    cipher = AES.new(key, AES.MODE_CBC)

    encrypted = cipher.encrypt(pad(text.encode(), 16))

    return key, cipher.iv, encrypted

def aes_decrypt(key, iv, encrypted):
    cipher = AES.new(key, AES.MODE_CBC, iv)
    decrypted = unpad(cipher.decrypt(encrypted), 16)

    return decrypted.decode()


# ------------------ 3. DES ------------------
def des_encrypt(text):
    key = get_random_bytes(8)
    cipher = DES.new(key, DES.MODE_CBC)

    encrypted = cipher.encrypt(pad(text.encode(), 8))

    return key, cipher.iv, encrypted

def des_decrypt(key, iv, encrypted):
    cipher = DES.new(key, DES.MODE_CBC, iv)
    decrypted = unpad(cipher.decrypt(encrypted), 8)

    return decrypted.decode()


# ------------------ MAIN ------------------
if __name__ == "__main__":

    text = "hello"

    # Caesar
    c_enc = caesar_encrypt(text, 3)
    c_dec = caesar_decrypt(c_enc, 3)

    print("Caesar:")
    print("Encrypted:", c_enc)
    print("Decrypted:", c_dec)

    # AES
    a_key, a_iv, a_enc = aes_encrypt(text)
    a_dec = aes_decrypt(a_key, a_iv, a_enc)

    print("\nAES:")
    print("Encrypted:", a_enc)
    print("Decrypted:", a_dec)

    # DES
    d_key, d_iv, d_enc = des_encrypt(text)
    d_dec = des_decrypt(d_key, d_iv, d_enc)

    print("\nDES:")
    print("Encrypted:", d_enc)
    print("Decrypted:", d_dec)