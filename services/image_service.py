import random
import hashlib
from services.github_service import get_language_color

def generate_premium_svg(repo_name, language):
    """Génère un SVG Premium Dark et élégant"""
    
    seed = int(hashlib.sha256(repo_name.encode('utf-8')).hexdigest(), 16)
    random.seed(seed)
    
    primary_color = get_language_color(language)
    
    # Dark, rich gradients (Obsidian/Midnight)
    hue = random.randint(210, 260) 
    bg_color_1 = "#0f172a" # Slate 900
    bg_color_2 = "#020617" # Slate 950
    
    # Abstract geometric accent
    shapes = ""
    for _ in range(2):
        cx = random.randint(50, 350)
        cy = random.randint(50, 150)
        r = random.randint(20, 100)
        shapes += f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#glowGradient)" opacity="0.4" />'

    initials = repo_name[:2].upper()
    
    svg = f"""
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style="stop-color:{bg_color_1};stop-opacity:1" />
                <stop offset="100%" style="stop-color:{bg_color_2};stop-opacity:1" />
            </linearGradient>
            <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style="stop-color:{primary_color};stop-opacity:0.15" />
                <stop offset="100%" style="stop-color:{primary_color};stop-opacity:0" />
            </radialGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grad)" />
        <circle cx="200" cy="100" r="150" fill="url(#glowGradient)" />
        {shapes}
        
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" 
              font-size="80" fill="rgba(255,255,255,0.05)" font-weight="100" letter-spacing="-4">
            {initials}
        </text>
        
        <rect x="0" y="198" width="400" height="2" fill="{primary_color}" opacity="0.5" />
    </svg>
    """
    return svg
