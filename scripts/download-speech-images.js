const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    // S-lyd
    'scoring', 'supporter', 'sykkel', 'sokker', 'seier',
    'spiller', 'stadion', 'skudd', 'senter', 'spark',
    'spiss', 'stopper', 'svette', 'sprinte', 'skade',
    'sving', 'synge', 'sikre', 'sesongen', 'samspill',
    
    // R-lyd
    'redning', 'rolle', 'regel', 'ryggen', 'rekke',
    'runde', 'ramme', 'rope', 'rutine', 'rask',
    'rot', 'retur', 'rekkevidde', 'rykte', 'reserve',
    'retning', 'resultat', 'rekord', 'rykk', 'regler',
    
    // K-lyd
    'keeper', 'kamp', 'kaptein', 'klubb', 'kort',
    'kryss', 'kast', 'ko', 'kule', 'kraft',
    'krone', 'kontroll', 'kvalitet', 'kamp2', 'klar',
    'klokke', 'kjempe', 'konkurranse', 'keeper2', 'kamp3'
].map(name => ({
    name: `${name}.png`,
    url: `https://source.unsplash.com/featured/?soccer,${name},football`
}));

const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        const filepath = path.join(__dirname, '..', 'public', 'images', 'speech', filename);
        const file = fs.createWriteStream(filepath);

        https.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filename}`);
                resolve(filename);
            });
        }).on('error', err => {
            fs.unlink(filepath, () => reject(err));
        });
    });
};

// Last ned alle bildene
Promise.all(images.map(img => downloadImage(img.url, img.name)))
    .then(results => {
        console.log('Alle bilder er lastet ned:', results);
    })
    .catch(error => {
        console.error('Feil ved nedlasting av bilder:', error);
    });
