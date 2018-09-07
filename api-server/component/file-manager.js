const testFolder = '.';
const fs = require('fs');
const path = require('path');

exports.getFileInfoFromFolder = function getFileInfoFromFolder(route) {
  const files = fs.readdirSync(route, 'utf8');
  const response = [];
  for (let file of files) {
    const extension = path.extname(file);
    const info = fs.statSync(route+'/'+file);
    response.push({ name: file, extension, dir:info.isDirectory(),size:info.size,birthTime:info.birthtime });
  }
  console.log(response)
  return response;
}
