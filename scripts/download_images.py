import os
import requests
from PIL import Image
from io import BytesIO

# Create directories if they don't exist
os.makedirs("public/images/players", exist_ok=True)

# Player image URLs and names
players = {
    "haaland": "https://resources.premierleague.com/premierleague/photos/players/250x250/p223094.png",
    "odegaard": "https://resources.premierleague.com/premierleague/photos/players/250x250/p182539.png",
    "graham-hansen": "https://www.fcbarcelona.com/photo-resources/2023/09/21/3356e82e-8ddf-428f-8f56-0c5a7817bd0f/mini_CAROLINE-GRAHAM.png?width=670&height=790",
    "hegerberg": "https://img.olympics.com/images/image/private/t_s_w960/t_s_16_9_g_auto/f_auto/primary/ufzxwxblwjwqyyjxvzst"
}

def download_and_process_image(url, filename):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        # Open the image and convert to PNG
        img = Image.open(BytesIO(response.content))
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Resize to a good size for cards (500x500)
        img = img.resize((500, 500), Image.Resampling.LANCZOS)
        
        # Save as PNG
        img.save(f"public/images/players/{filename}.png", "PNG")
        print(f"Successfully downloaded and processed {filename}")
        
    except Exception as e:
        print(f"Error downloading {filename}: {str(e)}")

# Download and process each image
for player_name, url in players.items():
    download_and_process_image(url, player_name)

print("Image download complete!")
