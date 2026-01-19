import requests
import re

def check_og_image():
    repo_name = "Portfolio_Informatique"
    user = "Eloura74"
    html_url = f"https://github.com/{user}/{repo_name}"
    
    print(f"Fetching HTML from {html_url}...")
    response = requests.get(html_url)
    
    if response.status_code == 200:
        # Simple regex to find og:image
        match = re.search(r'<meta property="og:image" content="([^"]+)"', response.text)
        if match:
            og_image = match.group(1)
            print(f"Found og:image: {og_image}")
            
            # Check if it's a custom image (repository-images) or generated (opengraph.githubassets.com)
            if "repository-images.githubusercontent.com" in og_image:
                print("Type: Custom Image uploaded to Social Preview")
            elif "opengraph.githubassets.com" in og_image:
                print("Type: Generated GitHub Card")
            else:
                print("Type: Unknown")
        else:
            print("No og:image found.")
            
    else:
        print(f"Failed to fetch page: {response.status_code}")

    # Also check what opengraph.githubassets.com returns for this repo
    # Note: This is a blind check, we can't easily see the image content, but we can check if it redirects
    og_service_url = f"https://opengraph.githubassets.com/1/{user}/{repo_name}"
    print(f"\nChecking {og_service_url}...")
    resp2 = requests.head(og_service_url, allow_redirects=True)
    print(f"Final URL: {resp2.url}")
    print(f"Content-Type: {resp2.headers.get('Content-Type')}")

if __name__ == "__main__":
    check_og_image()
