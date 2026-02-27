import fs from 'fs';
import path from 'path';

const htmlToReactStyle = (styleStr) => {
    if (!styleStr) return '{}';
    return '{' + styleStr.split(';').filter(s => s.trim()).map(s => {
        let [key, val] = s.split(':');
        if (!key || !val) return '';
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        val = val.trim().replace(/'/g, '"');
        return `"${key}": ${val.startsWith('url') ? `"${val}"` : `"${val}"`}`;
    }).filter(Boolean).join(', ') + '}';
};

const convertHtmlToJsx = (htmlString) => {
    // Basic body extraction
    let body = htmlString.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!body) return '';
    let jsx = body[1];
    
    // Remove scripts at bottom
    jsx = jsx.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // Convert class to className
    jsx = jsx.replace(/class="/g, 'className="');
    jsx = jsx.replace(/for="/g, 'htmlFor="');
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
    
    // Handle inline styles
    jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
        return `style={${htmlToReactStyle(p1)}}`;
    });
    
    // Close unpaired tags
    const standaloneTags = ['img', 'br', 'hr', 'input', 'source', 'meta', 'link'];
    for (let tag of standaloneTags) {
        let regex = new RegExp(`<${tag}([^>]*[^/])>`, 'gi');
        jsx = jsx.replace(regex, `<${tag}$1 />`);
        let regex2 = new RegExp(`<${tag} />`, 'gi');
        jsx = jsx.replace(regex2, `<${tag} />`); // Already closed
    }

    // Fix selected attributes
    jsx = jsx.replace(/autocomplete="/g, 'autoComplete="');
    jsx = jsx.replace(/playsinline/g, 'playsInline');
    jsx = jsx.replace(/autoplay/g, 'autoPlay');
    jsx = jsx.replace(/onclick="([^"]*)"/g, 'onClick={() => {$1}}');
    jsx = jsx.replace(/onmouseover="([^"]*)"/g, 'onMouseOver={(e) => {$1}}');
    jsx = jsx.replace(/onmouseout="([^"]*)"/g, 'onMouseOut={(e) => {$1}}');
    jsx = jsx.replace(/\[Your Name\]/gi, "Your Name"); // fix some weird strings

    // Fix multiple roots by wrapping
    return `<>\n${jsx}\n</>`;
};

const files = ['Home.html', 'Char-Dham.html', 'Kailash.html', 'Privacy.html', 'Terms.html'];
const pageNames = ['Home', 'CharDham', 'Kailash', 'Privacy', 'Terms'];

files.forEach((file, index) => {
    const p = path.join(process.cwd(), file);
    if (fs.existsSync(p)) {
        let html = fs.readFileSync(p, 'utf-8');
        let jsxBody = convertHtmlToJsx(html);
        let jsx = `import React, { useEffect } from 'react';\nimport '../styles/styles.css';\nimport '../styles/ui-ux-pro-max.css';\n\nconst ${pageNames[index]} = () => {\n  useEffect(() => {\n    // Load original interactions here or manually map hooks\n  }, []);\n\n  return (\n    ${jsxBody}\n  );\n};\n\nexport default ${pageNames[index]};\n`;
        fs.writeFileSync(path.join(process.cwd(), \`src/pages/\${pageNames[index]}.jsx\`), jsx);
        console.log(\`Converted \${file}\`);
    } else {
        console.log(\`Missing \${file}\`);
    }
});
