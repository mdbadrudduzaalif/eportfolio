import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r') as f:
        content = f.read()

    # CSS
    content = content.replace('href="style.css"', 'href="css/style.css"')

    # JS (also ensuring defer)
    # Match <script src="components.js"></script>
    # Match <script src="components.js" defer></script>
    content = re.sub(r'<script\s+src="components\.js"\s*></script>', '<script src="js/components.js" defer></script>', content)
    content = re.sub(r'<script\s+src="components\.js"\s+defer\s*></script>', '<script src="js/components.js" defer></script>', content)

    # Images
    images = [
        "profile.jpg", "aust-oscillon.jpg", "bsc-icon.png",
        "hsc-icon.png", "ssc-icon.png", "linkedin.png",
        "github.png", "facebook.png", "whatsapp.png"
    ]
    for img in images:
        content = content.replace(f'src="{img}"', f'src="assets/images/{img}"')

    with open(file, 'w') as f:
        f.write(content)
