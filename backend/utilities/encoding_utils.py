import base64
import os
from dotenv import load_dotenv


load_dotenv()

# Secret key for encoding/decoding
SECRET_KEY = os.getenv('SECRET_KEY') # Replace with your secret key


def encode_primary_key(primary_key):
    # Convert integer to string and encode using UTF-8
    primary_key_str = str(primary_key).encode()
    # Concatenate with secret key
    encoded_bytes = bytes(SECRET_KEY, 'utf-8') + primary_key_str
    # Encode using base64
    encoded = base64.urlsafe_b64encode(encoded_bytes)
    # Convert bytes to string and return
    return encoded.decode()

def decode_primary_key(encoded_key):
    # Decode from base64
    encoded_bytes = base64.urlsafe_b64decode(encoded_key)
    # Remove secret key and convert bytes to string
    decoded = encoded_bytes[len(SECRET_KEY):].decode()
    # Convert string to integer and return
    return int(decoded)

a= encode_primary_key(4)
print(a)

print("decoded_value", decode_primary_key(a))




