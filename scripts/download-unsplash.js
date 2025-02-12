const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
    {
        name: 'scoring.png',
        url: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=600&auto=format'
    },
    {
        name: 'supporter.png',
        url: 'https://images.unsplash.com/photo-1516731415730-0c87321fc2b0?q=80&w=600&auto=format'
    },
    {
        name: 'redning.png',
        url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format'
    },
    {
        name: 'dribbling.png',
        url: 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?q=80&w=600&auto=format'
    },
    {
        name: 'keeper.png',
        url: 'https://images.unsplash.com/photo-1628891890467-b79f2c8ba9dc?q=80&w=600&auto=format'
    },
    {
        name: 'corner.png',
        url: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=600&auto=format'
    }
];

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
