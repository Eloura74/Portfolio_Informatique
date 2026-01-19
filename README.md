# GitHub Portfolio Generator

A dynamic, data-driven portfolio application that automatically showcases your GitHub projects. Built with Flask and designed with a modern, responsive UI.

## 🚀 Features

-   **GitHub Integration**: Automatically fetches your repositories, stars, and languages using the GitHub API.
-   **Featured Projects**: Highlight specific projects with custom metadata (images, descriptions) via `portfolio.json`.
-   **Dynamic SVGs**: Generates custom SVG visualizations for your repositories on the fly.
-   **Responsive Design**: Fully responsive layout that looks great on desktop and mobile.
-   **Docker Ready**: Containerized for easy deployment.

## 🛠️ Tech Stack

-   **Backend**: Python, Flask
-   **Frontend**: HTML5, CSS3, JavaScript
-   **Containerization**: Docker, Docker Compose

## 📸 Screenshots

### Featured Projects
![NexusPad](public/images/nexusPad.png)

### AI Assistant Integration
![Jarvis](public/images/Jarvis.png)

### Smart Home Dashboard
![FamilyOS](public/images/FamilyOs.png)

## 📦 Installation

### Using Docker (Recommended)

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd github-portfolio
    ```

2.  **Run with Docker Compose:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    Open your browser and navigate to `http://localhost:5000`.

### Local Development

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd github-portfolio
    ```

2.  **Create a virtual environment:**
    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the application:**
    ```bash
    python app.py
    ```

## ⚙️ Configuration

You can customize the featured projects and their details by editing the `portfolio.json` file.

**Example `portfolio.json` structure:**

```json
{
  "RepoName": {
    "featured": true,
    "title": "Project Title",
    "tagline": "Short description",
    "stack": ["Tech1", "Tech2"],
    "highlights": [
      "Feature 1",
      "Feature 2"
    ],
    "links": {
      "demo": "https://demo-url.com",
      "video": "https://video-url.com"
    },
    "images": ["/static/images/screenshot.png"]
  }
}
```

## 📄 License

[MIT License](LICENSE)
