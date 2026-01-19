import requests
import markdown
import time
from flask import current_app

GITHUB_USER = "Eloura74"
CACHE = {"data": None, "timestamp": 0}
CACHE_DURATION = 3600

def get_portfolio_data():
    import json
    try:
        with open('portfolio.json', 'r') as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}

def get_language_color(language):
    colors = {
        'Python': '#3776ab',
        'JavaScript': '#f7df1e',
        'TypeScript': '#3178c6',
        'HTML': '#e34f26',
        'CSS': '#1572b6',
        'Java': '#ed8b00',
        'C++': '#00599c',
        'C#': '#239120',
        'PHP': '#777bb4',
        'Ruby': '#cc342d',
        'Go': '#00add8',
        'Rust': '#dea584',
        'Swift': '#fa7343',
        'Kotlin': '#7f52ff',
        'Dart': '#0175c2',
        'Shell': '#89e051',
        'Vue': '#4fc08d',
        'React': '#61dafb',
        'Angular': '#dd0031'
    }
    return colors.get(language, '#94a3b8')

def get_repos():
    if CACHE["data"] and (time.time() - CACHE["timestamp"] < CACHE_DURATION):
        print("Using cached data")
        return CACHE["data"]

    url = f"https://api.github.com/users/{GITHUB_USER}/repos?sort=updated&per_page=100"
    try:
        response = requests.get(url)
        if response.status_code == 200:
            repos = response.json()
            portfolio_data = get_portfolio_data()
            
            enhanced_repos = []
            
            for repo in repos:
                repo_name = repo['name']
                language = repo.get('language', 'Code')
                
                repo_data = {
                    'name': repo_name,
                    'html_url': repo['html_url'],
                    'description': repo.get('description', 'No description available.'),
                    'language': language,
                    'default_branch': repo.get('default_branch', 'main'),
                    'metrics': {
                        'stars': repo.get('stargazers_count', 0),
                        'forks': repo.get('forks_count', 0),
                        'issues': repo.get('open_issues_count', 0),
                        'size': repo.get('size', 0)
                    },
                    'visual': {
                        'preview': f"/repo-visual/{repo_name}?lang={language}",
                        'color': get_language_color(language)
                    },
                    'featured': False,
                    'tagline': repo.get('description', ''),
                    'stack': [language] if language else [],
                    'highlights': [],
                    'links': {},
                    'images': []
                }
                
                if repo_name in portfolio_data:
                    p_data = portfolio_data[repo_name]
                    repo_data.update(p_data)
                    if repo_data.get('images') and len(repo_data['images']) > 0:
                        repo_data['visual']['preview'] = repo_data['images'][0]

                enhanced_repos.append(repo_data)
            
            CACHE["data"] = enhanced_repos
            CACHE["timestamp"] = time.time()
            return enhanced_repos
    except Exception as e:
        print(f"Error fetching repos: {e}")
        return []
    
    return []

def get_readme(repo_name, default_branch):
    url = f"https://raw.githubusercontent.com/{GITHUB_USER}/{repo_name}/{default_branch}/README.md"
    response = requests.get(url)
    if response.status_code == 200:
        html_content = markdown.markdown(
            response.text, 
            extensions=['codehilite', 'tables', 'toc', 'fenced_code'],
            extension_configs={
                'codehilite': {
                    'css_class': 'highlight',
                    'use_pygments': True
                }
            }
        )
        # Fix broken placeholder images
        html_content = html_content.replace(
            "https://via.placeholder.com/800x400?text=FamilyOS+Dashboard+Preview", 
            "/static/images/FamilyOs.png"
        )
        return html_content
    return f"""
    <div class="no-readme">
        <h2>📄 No README available</h2>
        <p>This project doesn't have detailed documentation yet.</p>
        <a href="https://github.com/{GITHUB_USER}/{repo_name}" target="_blank" class="github-link">
            <span>🔗 View on GitHub</span>
        </a>
    </div>
    """
