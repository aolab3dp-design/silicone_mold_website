const fs = require('fs');
const path = require('path');

function cleanFile(fullPath) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;

    // Fix BOM or '?' at start
    content = content.replace(/^\?\"use client\"/, '\"use client\"');
    content = content.replace(/^\?'use client'/, '\'use client\'');
    content = content.replace(/^\uFEFF\?/, '');
    content = content.replace(/^\uFEFF/, '');
    
    // Fix specific Cyrillic corruptions found in grep
    content = content.replace(/\?нженерная/g, 'Инженерная');
    content = content.replace(/\?теративная/g, 'Итеративная');
    content = content.replace(/НАШ\? КОМПЕТЕНЦ\?\?/g, 'НАШИ КОМПЕТЕНЦИИ');
    content = content.replace(/\?зучаем/g, 'Изучаем');
    content = content.replace(/АЛГОР\?ТМ/g, 'АЛГОРИТМ');
    content = content.replace(/\?зносостойкие/g, 'Износостойкие');
    content = content.replace(/ПР\?МЕНЕН\?Я/g, 'ПРИМЕНЕНИЯ');
    content = content.replace(/\?мя/g, 'Имя');
    
    // Some instances might not have the replacement character but just '?' due to different console output
    content = content.replace(/\?нженерная/g, 'Инженерная');
    content = content.replace(/\?теративная/g, 'Итеративная');
    content = content.replace(/НАШ\? КОМПЕТЕНЦ\?\?/g, 'НАШИ КОМПЕТЕНЦИИ');
    content = content.replace(/\?зучаем/g, 'Изучаем');
    content = content.replace(/АЛГОР\?ТМ/g, 'АЛГОРИТМ');
    content = content.replace(/\?зносостойкие/g, 'Износостойкие');
    content = content.replace(/ПР\?МЕНЕН\?Я/g, 'ПРИМЕНЕНИЯ');
    content = content.replace(/\?мя/g, 'Имя');

    // Also the user asked to replace color with #3D2B1F
    content = content.replace(/#2C1E16/gi, '#3D2B1F');
    content = content.replace(/#443228/gi, '#3D2B1F');

    if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log('Cleaned:', fullPath);
    }
}

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            cleanFile(fullPath);
        }
    }
}

processDir(path.join(__dirname, 'src'));
console.log('Done');
