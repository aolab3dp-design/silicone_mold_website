const fs = require('fs');
const path = require('path');

function fixFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixFiles(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = content;

            // Remove unicode replacement char anywhere it appears
            modified = modified.replace(/\uFFFD/g, '');
            
            // Fix the question marks that were left behind in uppercase words
            modified = modified.replace(/НАШ\?\s+КОМПЕТЕНЦ\?\?\?/g, 'НАШИ КОМПЕТЕНЦИИ');
            modified = modified.replace(/НАШ\?\s+КОМПЕТЕНЦ\?\?/g, 'НАШИ КОМПЕТЕНЦИИ');
            modified = modified.replace(/АЛГОР\?ТМ РАБОТЫ/g, 'АЛГОРИТМ РАБОТЫ');
            modified = modified.replace(/СФЕРЫ ПР\?МЕНЕН\?Я/g, 'СФЕРЫ ПРИМЕНЕНИЯ');

            if (content !== modified) {
                fs.writeFileSync(fullPath, modified);
                console.log('Fixed file:', fullPath);
            }
        }
    }
}

fixFiles(path.join(__dirname, 'src'));
console.log('Done fixing');
