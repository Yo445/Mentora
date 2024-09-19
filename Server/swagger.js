import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Express API for Courses',
        description: 'API for courses management',
    },
    host: 'localhost:5000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);