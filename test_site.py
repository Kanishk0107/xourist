import os
import unittest

class TestWebsite(unittest.TestCase):
    def test_css_linked(self):
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
            self.assertIn('ui-ux-pro-max.css', content, "ui-ux-pro-max.css missing from index.html")
            self.assertIn('styles.css', content, "styles.css missing from index.html")
            
    def test_js_linked(self):
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
            self.assertIn('scripts.js', content, "scripts.js missing from index.html")

    def test_pages_present(self):
        pages = ['index.html', 'char-dham.html', 'kailash.html', 'privacy.html', 'terms.html']
        for page in pages:
            self.assertTrue(os.path.exists(page), f"{page} is missing")
            
    def test_css_files_exist(self):
        css_files = ['styles.css', 'ui-ux-pro-max.css']
        for css in css_files:
            self.assertTrue(os.path.exists(css), f"{css} is missing")

if __name__ == '__main__':
    unittest.main()
