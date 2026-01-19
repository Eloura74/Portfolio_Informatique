from flask import Flask, render_template, request, Response
from services.github_service import get_repos, get_readme, GITHUB_USER
from services.image_service import generate_premium_svg

app = Flask(__name__, static_folder='public', static_url_path='/static')

@app.route('/')
def home():
    all_projects = get_repos()
    
    # Separate Featured
    featured_projects = [p for p in all_projects if p.get('featured')]
    other_projects = [p for p in all_projects if not p.get('featured')]
    
    # Aggregate Stats
    total_stars = sum(repo['metrics']['stars'] for repo in all_projects)
    
    languages = {}
    for repo in all_projects:
        lang = repo.get('language')
        if lang:
            languages[lang] = languages.get(lang, 0) + 1
            
    # Sort and get top 3
    top_languages = dict(sorted(languages.items(), key=lambda item: item[1], reverse=True)[:3])

    return render_template('index.html', 
                         featured_projects=featured_projects,
                         projects=other_projects, 
                         user=GITHUB_USER,
                         total_stars=total_stars,
                         top_languages=top_languages,
                         total_repos=len(all_projects))

@app.route('/project/<repo_name>/<default_branch>')
def project_detail(repo_name, default_branch):
    readme_content = get_readme(repo_name, default_branch)
    return readme_content

@app.route('/repo-visual/<repo_name>')
def repo_visual(repo_name):
    language = request.args.get('lang', 'Code')
    svg_content = generate_premium_svg(repo_name, language)
    return Response(svg_content, mimetype='image/svg+xml')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
