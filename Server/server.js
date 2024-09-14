import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import connectDB from './config/db.js';
import courseRoutes from './routes/courseRoutes.js';
import userRoutes from './routes/userRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import passport from './config/passport.js';
import errorHandler from './middleware/errorMiddleware.js';
import NotFoundMiddleware from './middleware/nofFoundMiddleware.js';

connectDB();

const __dirname = path.resolve();

const app = express();
const port = process.env.PORT;

app.use(passport.initialize());

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
// app.use('/api/upload', uploadRoutes);

app.all('*', NotFoundMiddleware)

// global error handler
app.use(errorHandler);

// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
