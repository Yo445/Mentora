import 'dotenv/config';
import * as Minio from 'minio';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    
});

try {
    const buckets = await minioClient.listBuckets();
    console.log('Buckets:', buckets);
} catch (error) {
    console.error('Error connecting to MinIO:', error);
}

const connectMinio = async () => {
    try {
        await minioClient.bucketExists('online-platform');
        console.log('Successfully connected to MinIO');
    } catch (err) {
        console.error('Error connecting to MinIO:', err);
    }
};

connectMinio();

const uploadToMinio = async (bucket, ObjectName, fileBuffer, mimeType) => {
    try {
        console.log(`Uploading file to Minio: ${bucket}/${ObjectName}, mimeType: ${mimeType}`);
        console.log('File buffer first bytes:', fileBuffer.slice(0, 10));

        const bucketExists = await minioClient.bucketExists(bucket);
        if (!bucketExists) {
            console.log(`Bucket ${bucket} does not exist, creating it...`);
            await minioClient.makeBucket(bucket);
            console.log(`Bucket ${bucket} created successfully`);
        }

        console.log('monio client', minioClient);

        await minioClient.putObject(bucket, ObjectName, fileBuffer );

        console.log(`File uploaded successfully to ${bucket}/${ObjectName}`);
        // const url = await minioClient.presignedGetObject(bucket, ObjectName);
        const url = `${process.env.MINIO_HOST}/${bucket}/${ObjectName}`;
        return url;
    } catch (error) {
        console.error(`Error uploading file to Minio: ${error}`);
        if (error instanceof AggregateError) {
            for (let err of error.errors) {
                console.error('Individual error:', err);
            }
        }
        throw new Error('Error uploading file to Minio');
    }
}

export { minioClient, uploadToMinio };
