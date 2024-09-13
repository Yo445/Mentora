import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            dbName: process.env.MONGODB_DB_NAME
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err);
        process.exit(1);
    }
    // finally {
    //     await mongoose.connection.close();
    //     console.log("Connection closed");
    // }
}

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
});

export default connectDB;