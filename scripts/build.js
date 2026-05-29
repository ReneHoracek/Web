const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content', 'auta');
const outputDir = path.join(__dirname, '..', 'data');
const outputFile = path.join(outputDir, 'cars.json');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

const cars = [];

for (const file of files) {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');

    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) continue;

    const frontmatter = match[1];
    const body = match[2].trim();

    const car = {};

    for (const line of frontmatter.split('\n')) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value) && value !== '') value = Number(value);

        car[key] = value;
    }

    car.body = body;

    if (car.published !== false) {
        if (car.foto && typeof car.foto === 'string') {
            car.foto = car.foto.replace(/^\//, '');
        }
        cars.push(car);
    }
}

fs.writeFileSync(outputFile, JSON.stringify(cars, null, 2), 'utf-8');
console.log(`Generated ${outputFile} with ${cars.length} cars`);
