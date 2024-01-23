const express = require('express')
const app = express()
const port = 8080
var qr = require('qr-image')

//const localIP = '0.0.0.0'
//const localIP = '172.21.223.210'

app.use(express.static('frontend'))

// handle the upload request
app.post('/upload', (req, res) => {
  // might need this
  const requestData = req.body;
  console.log('Received POST request with data:', req.get('origin'))
  
  // create the qr png
  var qrpng = qr.image('/frontend/uploads/', {type:'png'})
  qrpng.pipe(require('fs').createWriteStream('./frontend/uploads/test.png'))

  // TODO: fix qr png url
  var qrpngURL = '/uploads/test.png'
  res.setHeader('Content-Type', 'application/json')
  res.json({'qrCodeUrl': qrpngURL}).status(200)
});

// handle sending the URL and file download
app.get('/frontend/uploads/*', (req, res) => {
  res.setHeader('content-type', 'image/png');
  console.log('in get requst: ', req.path)
  var imgPath = '/frontend/uploads/test.png'
  res.send(imgPath)
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
});