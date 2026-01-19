from services.github_service import get_repos
import time

def verify_repos():
    print("Fetching repos (this might take a few seconds due to scraping)...")
    start = time.time()
    repos = get_repos()
    end = time.time()
    
    print(f"Fetched {len(repos)} repos in {end - start:.2f} seconds.")
    
    found_social_preview = False
    for repo in repos:
        preview = repo['visual']['preview']
        if "repository-images.githubusercontent.com" in preview or "opengraph.githubassets.com" in preview:
            print(f"✅ {repo['name']}: Found Social Preview -> {preview}")
            found_social_preview = True
        elif "/repo-visual/" in preview:
            print(f"⚠️ {repo['name']}: Using generated SVG (No social preview found)")
        else:
            print(f"ℹ️ {repo['name']}: Using other image -> {preview}")
            
    if found_social_preview:
        print("\nSUCCESS: At least one social preview image was found.")
    else:
        print("\nWARNING: No social preview images found. Check if the scraping logic is working or if repos have images.")

if __name__ == "__main__":
    from flask import Flask
    app = Flask(__name__)
    with app.app_context():
        verify_repos()
