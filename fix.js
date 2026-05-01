const fs = require('fs');
const iconv = require('iconv-lite');
const path = require('path');

function fixCorruption(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            fixCorruption(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('Р˜РЅР¶РµРЅРµСЂРЅР°СЏ') || content.includes('Р')) {
                // Encode from JS string (corrupted) using windows-1251 back to original bytes
                let originalBytes = iconv.encode(content, 'win1251');
                // Decode original bytes as UTF-8
                let restored = iconv.decode(originalBytes, 'utf8');
                
                // Also do the color replacement while we're at it!
                restored = restored.replace(/#2C1E16/gi, '#3D2B1F');
                restored = restored.replace(/#2c1e16/gi, '#3D2B1F');
                
                fs.writeFileSync(fullPath, restored);
                console.log('Fixed and replaced colors in:', fullPath);
            } else {
                let modified = content.replace(/#2C1E16/gi, '#3D2B1F');
                if (content !== modified) {
                    fs.writeFileSync(fullPath, modified);
                    console.log('Replaced colors in:', fullPath);
                }
            }
        }
    }
}

fixCorruption(path.join(__dirname, 'src'));
console.log('Done');
