import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { config } from './config.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (acceptedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPEG, and JPG files are allowed'), false);
    }
  }
});

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: config.GCP_SERVICE_ACCOUNT_CREDS.project_id,
  credentials: config.GCP_SERVICE_ACCOUNT_CREDS,
});

const bucket = storage.bucket(config.GCS_SINGLE_CATALOG_BUCKET);

// Helper function to generate timestamp
const generateTimestamp = () => {
  return new Date().toISOString().replace(/[:.]/g, '-');
};

// Helper function to upload file to GCS
const uploadToGCS = async (localFilePath, gcsFilePath) => {
  try {
    await bucket.upload(localFilePath, {
      destination: gcsFilePath,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    
    // Make the file publicly accessible
    await bucket.file(gcsFilePath).makePublic();
    
    return `${config.GCS_CDN_BASE_PATH}/${gcsFilePath}`;
  } catch (error) {
    throw new Error(`Failed to upload to GCS: ${error.message}`);
  }
};

// Upload endpoint
app.post('/api/upload-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    const file = req.file;
    const timestamp = generateTimestamp();
    const filename = `${uuidv4()}-${file.originalname}`;
    
    // Generate file paths
    const objectFilePath = `cataloging/${timestamp}/${filename}`;
    const gcsFilePath = `products-upload/${objectFilePath}`;
    
    // Upload to GCS
    const imageUrl = await uploadToGCS(file.path, gcsFilePath);
    
    // Clean up local file
    fs.unlinkSync(file.path);
    
    // Return success response
    res.json({
      success: true,
      data: {
        image: imageUrl,
        filename: filename,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      },
      message: 'Image uploaded successfully'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up local file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up local file:', cleanupError);
      }
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Internal server error during upload'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
});

// Start server
const PORT = config.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📁 Upload endpoint: http://localhost:${PORT}/api/upload-image`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});
