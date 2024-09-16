import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config';

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
});

const uploadToS3 = async (params) => {
    try {
        const data = await s3.send(new PutObjectCommand(params));
        console.log('Successfully uploaded data to ' + params.Bucket + '/' + params.Key);
        return data;
    } catch (err) {
        console.log('Error', err);
    }
}

export { s3, uploadToS3 };


// const s3 = new S3({
//     region: process.env.AWS_REGION,
//     credentials: fromIni(),
// });

// export default s3;
