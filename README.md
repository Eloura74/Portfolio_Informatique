# Générateur de Portfolio GitHub

Une application de portfolio dynamique axée sur les données qui présente automatiquement vos projets GitHub. Construit avec Flask et conçu avec une interface utilisateur moderne et responsive.

## 🚀 Fonctionnalités

-   **Intégration GitHub** : Récupère automatiquement vos dépôts, étoiles et langages via l'API GitHub.
-   **Projets Phares** : Mettez en avant des projets spécifiques avec des métadonnées personnalisées (images, descriptions) via `portfolio.json`.
-   **SVG Dynamiques** : Génère des visualisations SVG personnalisées pour vos dépôts à la volée.
-   **Design Responsive** : Mise en page entièrement adaptée aux ordinateurs et aux mobiles.
-   **Prêt pour Docker** : Conteneurisé pour un déploiement facile.

## 🛠️ Stack Technique

-   **Backend** : Python, Flask
-   **Frontend** : HTML5, CSS3, JavaScript
-   **Conteneurisation** : Docker, Docker Compose

## 📸 Captures d'écran

### Projets Phares
![NexusPad](public/images/nexusPad.png)

### Intégration Assistant IA
![Jarvis](public/images/Jarvis.png)

### Tableau de Bord Domotique
![FamilyOS](public/images/FamilyOs.png)

## 📦 Installation

### Avec Docker (Recommandé)

1.  **Cloner le dépôt :**
    ```bash
    git clone <votre-url-repo>
    cd github-portfolio
    ```

2.  **Lancer avec Docker Compose :**
    ```bash
    docker-compose up --build
    ```

3.  **Accéder à l'application :**
    Ouvrez votre navigateur et allez sur `http://localhost:5000`.

### Développement Local

1.  **Cloner le dépôt :**
    ```bash
    git clone <votre-url-repo>
    cd github-portfolio
    ```

2.  **Créer un environnement virtuel :**
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Installer les dépendances :**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Lancer l'application :**
    ```bash
    python app.py
    ```

## ⚙️ Configuration

Vous pouvez personnaliser les projets mis en avant et leurs détails en modifiant le fichier `portfolio.json`.

**Exemple de structure `portfolio.json` :**

```json
{
  "NomDuRepo": {
    "featured": true,
    "title": "Titre du Projet",
    "tagline": "Courte description",
    "stack": ["Techno1", "Techno2"],
    "highlights": [
      "Fonctionnalité 1",
      "Fonctionnalité 2"
    ],
    "links": {
      "demo": "https://url-demo.com",
      "video": "https://url-video.com"
    },
    "images": ["/static/images/screenshot.png"]
  }
}
```

## 📄 Licence

[Licence MIT](LICENSE)
