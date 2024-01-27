const express = require('express')
const multer  = require('multer')
//const upload = multer({ dest: 'frontend/uploads/'})
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './frontend/uploads');
  },
  filename: function (req, file, callback) {
      callback(null, file.originalname);
  }
})

var upload = multer({ storage: storage })


const app = express()
app.use(express.static('frontend'))

var qr = require('qr-image')
const port = 8080

var filename;
// handle the upload request
app.post('/upload', upload.single('file'), (req, res) => {
  //console.log('Received POST request with data:', req.file)
  filename = req.file.originalname

  // save the file

  // create the qr png
  var ip = req.get('origin').replace('http://', '')
  var filenameQR = filename.slice(0, -4) + 'QR'
  var qrPath = ip + '/uploads/' + filename
  var qrpng = qr.image(qrPath, {type:'png'})
  qrpng.pipe(require('fs').createWriteStream('./frontend/uploads/' + filenameQR + '.png'))

  // return the qr png url
  var qrpngURL = '/uploads/' + filenameQR + '.png'
  res.setHeader('Content-Type', 'application/json')
  res.json({'qrCodeUrl': qrpngURL}).status(200)
});
/*
// handle sending the URL and file download
app.get('/frontend/uploads/*', (req, res) => {
  res.setHeader('content-type', 'image/png');
  console.log('in get requst: ', req.path)
  var imgPath = '/frontend/uploads/' + filename + '.png'
  res.send(imgPath)
})
*/

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
});