import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const nextConfig = {
  allowedDevOrigins: ['http://172.26.32.1', 'http://localhost', 'http://127.0.0.1'],
  turbopack: {
    root: join(__dirname, '..'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/a1aa/image/**',
      },
    ],
  },
};

export default nextConfig;