import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3001; // Example backend port

// Configure Multer to save files to the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/'); // Ensure the path to the uploads folder is correct
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Retain the original filename
  },
});

const upload = multer({ storage }); // Use configured storage

app.use(cors()); // Allow CORS (can be configured more strictly if needed)

app.use('/uploads', express.static('src/uploads/')); // Correct static path

// Define the upload endpoint
app.post('/upload', (req, res, next) => {
    console.log('Starting file upload');
    upload.single('picture')(req, res, (error) => {
      if (error) {
        console.error('Multer error:', error);
        return res.status(500).json({ message: 'File upload failed', error });
      }
      console.log('File uploaded:', req.file); // Log the uploaded file
      try {
        const file = {
          originalname: req.file.originalname,
          filename: req.file.filename,
          path: `./src/uploads/${req.file.filename}`, // Path to the file
        };
        res.status(200).json({ message: 'File uploaded successfully', file });
      } catch (err) {
        console.error('File handling error:', err);
        res.status(500).json({ message: 'File upload failed', err });
      }
    });
  });
  
  

// GET endpoint to fetch a single file by filename
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.resolve(__dirname, './src/uploads/', filename);

  res.sendFile(filepath, (err) => {
    if (err) {
      res.status(404).json({ message: 'File not found', error: err });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
