const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    {
        name: 'scoring.png',
        url: 'https://raw.githubusercontent.com/codeium/assets/main/speech/scoring.png'
    },
    {
        name: 'supporter.png',
        url: 'https://raw.githubusercontent.com/codeium/assets/main/speech/supporter.png'
    },
    {
        name: 'redning.png',
        url: 'https://raw.githubusercontent.com/codeium/assets/main/speech/redning.png'
    },
    {
        name: 'dribbling.png',
        url: 'https://raw.githubusercontent.com/codeium/assets/main/speech/dribbling.png'
    },
    {
        name: 'keeper.png',
        url: 'https://raw.githubusercontent.com/codeium/assets/main/speech/keeper.png'
    },
    {
        name: 'corner.png',
        url: 'https://raw.githubusercontent.com/codeium/assets/main/speech/corner.png'
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
                resolve(filename);
            });
        }).on('error', err => {
            fs.unlink(filepath, () => reject(err));
        });
    });
};

// Download all images
Promise.all(images.map(img => downloadImage(img.url, img.name)))
    .then(results => {
        console.log('Successfully downloaded images:', results);
    })
    .catch(error => {
        console.error('Error downloading images:', error);
    });
