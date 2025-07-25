# Carnival Backend - Image Upload Server

This backend server handles image uploads to Google Cloud Storage (GCS) for the Carnival application.

## Features

- 🖼️ Image upload to GCP Storage
- 📁 File validation (PNG, JPEG, JPG only)
- 🔒 10MB file size limit
- 🌐 CORS enabled for frontend integration
- 🔄 Automatic file cleanup
- 🔗 Returns hosted CDN URLs
- 🔐 Secure environment variable configuration

## Setup

### Prerequisites
- Node.js 18+ installed
- Google Cloud Platform account with storage bucket access

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Copy the example file and update with your credentials
   cp .env.example .env
   
   # Edit .env file with your actual GCP credentials
   nano .env
   ```

4. **Start the server:**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## Configuration

The server uses environment variables loaded from a `.env` file. Copy `.env.example` to `.env` and update with your values:

```bash
# Server Configuration
PORT=8080

# Google Cloud Storage Configuration
GCS_SINGLE_CATALOG_BUCKET=your-bucket-name
GCS_CDN_BASE_PATH=https://storage.googleapis.com/your-bucket-name

# Google Cloud Platform Service Account Credentials (JSON string)
GCP_SERVICE_ACCOUNT_CREDS={"type":"service_account","project_id":"your-project-id",...}
```

### Environment Variables:

- **`PORT`** - Server port (default: 8080)
- **`GCS_SINGLE_CATALOG_BUCKET`** - Google Cloud Storage bucket name
- **`GCS_CDN_BASE_PATH`** - CDN base URL for accessing uploaded files
- **`GCP_SERVICE_ACCOUNT_CREDS`** - Complete service account credentials as JSON string

⚠️ **Security Note:** Never commit the `.env` file to version control. It's already added to `.gitignore`.

## API Endpoints

### Upload Image
- **URL:** `POST /api/upload-image`
- **Content-Type:** `multipart/form-data`
- **Body:** `image` (file field)

**Success Response:**
```json
{
  "success": true,
  "data": {
    "image": "https://storage.googleapis.com/bucket-name/products-upload/cataloging/timestamp/uuid-filename.jpg",
    "filename": "uuid-originalname.jpg",
    "originalName": "originalname.jpg",
    "size": 1234567,
    "mimetype": "image/jpeg"
  },
  "message": "Image uploaded successfully"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

### Health Check
- **URL:** `GET /api/health`
- **Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Usage with Frontend

The frontend ProductModal component is configured to use this backend. Upload flow:

1. Image is sent via FormData to `/api/upload-image`
2. Server validates file type and size
3. Image is uploaded to GCP Storage
4. Public URL is returned to frontend
5. Success/error message is displayed to user

## Error Handling

- **File type validation:** Only PNG, JPEG, JPG allowed
- **File size limit:** 10MB maximum
- **Network errors:** Proper error responses
- **Cleanup:** Temporary files are automatically removed

## Development

For development, run both servers:

```bash
# Terminal 1 - Backend (from /backend directory)
npm run dev

# Terminal 2 - Frontend (from project root)
npm run dev
```

- Backend: `http://localhost:8080`
- Frontend: `http://localhost:5173` (Vite default)

## Security

- CORS enabled for frontend integration
- Environment variables for all secrets
- Files made publicly accessible on GCS
- No authentication required (add as needed)

## File Structure

```
backend/
├── .env.example       # Environment template
├── config.js          # Configuration (uses env vars)
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── uploads/          # Temporary upload directory
└── README.md         # This file
``` 