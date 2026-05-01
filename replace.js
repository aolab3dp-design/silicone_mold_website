const fs = require('fs');
const path = require('path');

function replaceColor(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceColor(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = content.replace(/#2C1E16/gi, '#3D2B1F');
            if (content !== modified) {
                fs.writeFileSync(fullPath, modified);
                console.log('Modified:', fullPath);
            }
        }
    }
}

replaceColor(path.join(__dirname, 'src'));
console.log('Done');
