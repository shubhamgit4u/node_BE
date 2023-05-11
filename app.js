const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS with specific origin and support credentials
app.use(
  cors({
    origin: 'http://localhost:3002',
    credentials: true,
  })
);

// Set up multer storage for storing uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store the images
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + path.extname(file.originalname); // Rename the image file with a timestamp prefix
    cb(null, fileName);
  }
});

const upload = multer({ storage }).array('file[]');

// Define a POST route to handle image uploads
app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      // Error occurred during file upload
      return res.status(500).json({ error: 'File upload failed' });
    }

    if (!req.files || req.files.length === 0) {
      // No files were provided in the request
      return res.status(400).json({ error: 'No files provided' });
    }

    // Files were successfully uploaded, you can save the file paths or perform further operations here

    res.json({ message: 'Files uploaded successfully' });
  });
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});


// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
