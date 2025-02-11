import os
import json
from PIL import Image, ImageDraw, ImageFont
import requests
from io import BytesIO

# Create directory if it doesn't exist
os.makedirs("public/images/players", exist_ok=True)

def download_image(url, filename):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        img = Image.open(BytesIO(response.content))
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Resize to a good size for cards (500x500)
        img = img.resize((500, 500), Image.Resampling.LANCZOS)
        img.save(f"public/images/players/{filename}.png", "PNG")
        print(f"Successfully downloaded image for {filename}")
        return True
    except Exception as e:
        print(f"Error downloading {filename}: {str(e)}")
        return False

def create_placeholder_image(name, filename, position):
    # Create a new image with a transparent background
    img = Image.new('RGBA', (500, 500), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw a colored rectangle for the background
    draw.rectangle([(0, 0), (500, 500)], fill=(30, 30, 50, 255))
    
    # Draw player silhouette
    draw.ellipse([(150, 50), (350, 250)], fill=(200, 200, 200, 255))  # Head
    draw.rectangle([(200, 250), (300, 450)], fill=(200, 200, 200, 255))  # Body
    
    # Add position text
    draw.text((20, 20), position, fill=(255, 255, 255, 255))
    
    # Save the image
    img.save(f"public/images/players/{filename}.png", "PNG")
    print(f"Created placeholder image for {name}")

# Read the player data
with open('data/fotballkort.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Process each player
for player in data['spillere']:
    player_id = player['id']
    name = player['navn']
    position = player['posisjon']
    filename = name.lower().replace(' ', '-')
    
    # Try to download image if URL is provided and looks valid
    if 'bilde' in player and player['bilde'].startswith('http'):
        if not download_image(player['bilde'], filename):
            create_placeholder_image(name, filename, position)
    else:
        create_placeholder_image(name, filename, position)

print("Image generation complete!")
