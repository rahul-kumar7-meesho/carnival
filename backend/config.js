import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8080,
  GCS_SINGLE_CATALOG_BUCKET: process.env.GCS_SINGLE_CATALOG_BUCKET,
  GCS_CDN_BASE_PATH: process.env.GCS_CDN_BASE_PATH,
  GCP_SERVICE_ACCOUNT_CREDS: JSON.parse(process.env.GCP_SERVICE_ACCOUNT_CREDS || '{}')
};
