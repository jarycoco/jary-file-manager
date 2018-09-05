var express = require('express');
var fm = require('../component/file-manager')
var router = express.Router();

var base = 'C:\\Users\\JJJ\\Desktop\\'

var multer = require('multer'); // express에 multer모듈 적용 (for 파일업로드)
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, base+req.body.path) // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/info', function(req, res) {
  let info = fm.getFileInfoFromFolder(base+req.query.path)
  res.json(info)
});

// 업로드 - 파일 업로드 폼
router.get('/upload', function(req, res){
  res.render('upload', { title: 'Express' });
});

router.get('/download', function(req, res){
  res.download(base+req.query.path)
});

router.post('/upload', upload.single('userfile'), function(req, res){
  // console.log(req)
  console.log(req.body)
  res.send('Uploaded! : '+req.file); // object를 리턴함
  console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
});

module.exports = router;
