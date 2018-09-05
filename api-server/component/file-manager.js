const testFolder = 'C:\\Users\\JJJ';
const fs = require('fs');
const path = require('path');

function getFileInfoFromFolder(route) {
  const files = fs.readdirSync(route, 'utf8');
  const response = [];
  for (let file of files) {
    const extension = path.extname(file);
    const info = fs.statSync(testFolder+'\\'+file);
    response.push({ name: file, extension, dir:info.isDirectory(),size:info.size,birthTime:info.birthtime });
  }
  return response;
}

// let files = fs.readdirSync(testFolder)
console.log(getFileInfoFromFolder(testFolder))