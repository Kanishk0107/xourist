import os
from html.parser import HTMLParser

class HealthParser(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.issues = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == 'img':
            if 'alt' not in attr_dict:
                self.issues.append(f"{self.filename}: <img> tag missing alt attribute (src={attr_dict.get('src')})")
            elif attr_dict['alt'].strip() == '':
                self.issues.append(f"{self.filename}: <img> tag has empty alt attribute (src={attr_dict.get('src')})")
        if tag == 'a':
            if 'href' not in attr_dict or attr_dict['href'].strip() == '':
                self.issues.append(f"{self.filename}: <a> tag missing or empty href (text before={self.get_starttag_text()})")

def check_html_files():
    for f in os.listdir('.'):
        if f.endswith('.html'):
            try:
                with open(f, 'r', encoding='utf-8') as file:
                    parser = HealthParser(f)
                    parser.feed(file.read())
                    for issue in parser.issues:
                        print(issue)
            except Exception as e:
                print(f"Error processing {f}: {e}")

check_html_files()
