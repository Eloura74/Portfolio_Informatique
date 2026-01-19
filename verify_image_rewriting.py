import unittest
from unittest.mock import patch, MagicMock
from services.github_service import get_readme, GITHUB_USER

class TestImageRewriting(unittest.TestCase):
    @patch('services.github_service.requests.get')
    def test_get_readme_rewrites_images(self, mock_get):
        # Mock response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.text = """
# Test Project
![Header](./public/images/header.png)
<img src="docs/diagram.png" alt="Diagram">
![Absolute](https://example.com/image.jpg)
        """
        mock_get.return_value = mock_response

        # Call function
        repo_name = "TestRepo"
        branch = "main"
        html_content = get_readme(repo_name, branch)

        # Verify
        expected_header_url = f"https://raw.githubusercontent.com/{GITHUB_USER}/{repo_name}/{branch}/public/images/header.png"
        expected_diagram_url = f"https://raw.githubusercontent.com/{GITHUB_USER}/{repo_name}/{branch}/docs/diagram.png"
        
        self.assertIn(expected_header_url, html_content)
        self.assertIn(expected_diagram_url, html_content)
        self.assertIn("https://example.com/image.jpg", html_content)
        
        print("Verification passed: Relative URLs rewritten correctly.")

if __name__ == '__main__':
    unittest.main()
