const express = require('express');
const app = express();
const path = require('path')
const multer = require('multer')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let storage = multer.diskStorage({
   destination: (req, res, callBack) => {

      // copy to uploads folder
      callBack(null, './uploads')
   },
   filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '_' + Date.now() + file.originalname)
   }
})

let maxSize = 2 * 1000 * 1000

let upload = multer({
   storage: storage,
   limits: {
      fileSize: maxSize
   },
   fileFilter: (req, file, callBack) => {
      let fileTypes = /jpg|jpeg|png/;
      let mimeType = fileTypes.test(file.mimetype);
      let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

      if (mimeType && extName) {
         return callBack(null, true);
      } else {
         return callBack(new Error(`Error: File upload only supports the following file types - ${fileTypes}`), false);
      }
   }
}).single('myPic'); //single data


app.get('/', (req, res) => {
   res.render('signUp');
})

app.post('/upload', (req, res, next) => {
   upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
         // A Multer error occurred when uploading
         return res.status(500).send(`Multer Error: ${error.message}`);
      }
      else if (error) {
         // An unknown error occurred
         return res.status(500).send(`Unknown Error: ${error.message}`);
      }
      else {
         console.log(req.file);
         res.send("File uploaded successfully");
      }

   })
})

app.listen(4000, () => {
   console.log('Server is running on port 4000');
})
