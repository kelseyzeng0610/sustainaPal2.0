const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directory if it doesn't exist
const avatarsDir = path.join(__dirname, '../../public/avatars');
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

// Avatar URLs (using placeholders from UI avatars)
const avatars = [
  { filename: '1.png', url: 'https://ui-avatars.com/api/?name=Emma+S&background=random&color=fff&size=128' },
  { filename: '2.png', url: 'https://ui-avatars.com/api/?name=Liam+T&background=random&color=fff&size=128' },
  { filename: '3.png', url: 'https://ui-avatars.com/api/?name=Olivia+M&background=random&color=fff&size=128' },
  { filename: '4.png', url: 'https://ui-avatars.com/api/?name=Noah+K&background=random&color=fff&size=128' },
  { filename: '5.png', url: 'https://ui-avatars.com/api/?name=Ava+P&background=random&color=fff&size=128' },
  { filename: 'user.png', url: 'https://ui-avatars.com/api/?name=You&background=28a745&color=fff&size=128' }
];

// Download function
const downloadAvatar = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(avatarsDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath);
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
};

// Download all avatars
const downloadAllAvatars = async () => {
  for (const avatar of avatars) {
    await downloadAvatar(avatar.url, avatar.filename);
  }
  console.log('All avatars downloaded successfully');
};

downloadAllAvatars().catch(console.error);