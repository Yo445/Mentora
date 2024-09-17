import 'dotenv/config';
import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    
});

// try {
//     const buckets = await minioClient.listBuckets();
//     console.log('Buckets:', buckets);
// } catch (error) {
//     console.error('Error connecting to MinIO:', error);
// }

const connectMinio = async () => {
    try {
        await minioClient.bucketExists(process.env.MINIO_BUCKET_NAME);
        console.log('Successfully connected to MinIO');
    } catch (err) {
        console.error('Error connecting to MinIO:', err);
    }
};

connectMinio();

export default minioClient;