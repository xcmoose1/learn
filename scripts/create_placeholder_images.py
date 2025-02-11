from PIL import Image, ImageDraw, ImageFont
import os

# Create directory if it doesn't exist
os.makedirs("public/images/players", exist_ok=True)

def create_player_image(name, filename):
    # Create a new image with a white background
    img = Image.new('RGBA', (500, 500), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw a colored rectangle for the background
    draw.rectangle([(0, 0), (500, 500)], fill=(30, 30, 50, 255))
    
    # Add player silhouette (simple shape)
    draw.ellipse([(150, 50), (350, 250)], fill=(200, 200, 200, 255))  # Head
    draw.rectangle([(200, 250), (300, 450)], fill=(200, 200, 200, 255))  # Body
    
    # Save the image
    img.save(f"public/images/players/{filename}.png", "PNG")
    print(f"Created placeholder image for {name}")

# Create images for each player
players = [
    ("Erling Haaland", "haaland"),
    ("Martin Ødegaard", "odegaard"),
    ("Caroline Graham Hansen", "graham-hansen"),
    ("Ada Hegerberg", "hegerberg")
]

for player_name, filename in players:
    create_player_image(player_name, filename)
