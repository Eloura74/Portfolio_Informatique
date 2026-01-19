import re

# User's example
html_content = """
<div align="center">
  <img src="./public/images/Portfolio_Informatique_header.png" alt="Bannière Portfolio Informatique" width="100%">
</div>
"""

GITHUB_USER = "Eloura74"
repo_name = "TestRepo"
default_branch = "main"

print("Original content:")
print(html_content)

# Current logic
def replace_url(match):
    url = match.group(1)
    print(f"Match found: {url}")
    if url.startswith(('http://', 'https://', '//')):
        return f'src="{url}"'
    
    clean_path = url.lstrip('./')
    if clean_path.startswith('/'):
        clean_path = clean_path[1:]
        
    raw_url = f"https://raw.githubusercontent.com/{GITHUB_USER}/{repo_name}/{default_branch}/{clean_path}"
    return f'src="{raw_url}"'

new_content = re.sub(r'src="([^"]+)"', replace_url, html_content)

print("\nNew content:")
print(new_content)

if "https://raw.githubusercontent.com" in new_content:
    print("\nSUCCESS: URL was rewritten.")
else:
    print("\nFAILURE: URL was NOT rewritten.")
