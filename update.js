import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, 'src/pages');
const htmlFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (let file of htmlFiles) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace CSS links
    content = content.replace(/href="styles\.css(\?v=\d+)?"/g, 'href="../styles/styles.css"');
    content = content.replace(/href="ui-ux-pro-max\.css(\?v=\d+)?"/g, 'href="../styles/ui-ux-pro-max.css"');

    // Replace JS links
    content = content.replace(/src="scripts\.js"/g, 'type="module" src="../utils/main.js"');
    content = content.replace(/src="protection\.js"/g, 'src="../services/protection.js"');

    // Replace asset references
    content = content.replace(/(src|href)="assets\//g, '$1="../assets/');
    content = content.replace(/url\('assets\//g, 'url(\'../assets/');
    content = content.replace(/url\("assets\//g, 'url("../assets/');

    // Replace internal HTML links if they had .html capitalization issues
    content = content.replace(/href="Char-Dham\.html"/gi, 'href="char-dham.html"');
    content = content.replace(/href="Kailash\.html"/gi, 'href="kailash.html"');
    content = content.replace(/href="Privacy\.html"/gi, 'href="privacy.html"');
    content = content.replace(/href="Terms\.html"/gi, 'href="terms.html"');
    content = content.replace(/href="Home\.html"/gi, 'href="index.html"');

    // Remove robotic comments
    content = content.replace(/<!-- =+ POPUP LEAD CAPTURE FORM =+ -->/g, '<!-- Lead Capture -->');
    content = content.replace(/<!-- =+ GALLERY SECTION =+ -->/g, '<!-- Gallery -->');
    content = content.replace(/<!-- =+ [A-Z0-9 ()-]+ =+ -->/g, '');

    fs.writeFileSync(filePath, content);
    console.log(`Updated paths in ${file}`);
}
