import swaggerJsDoc from 'swagger-jsdoc';

import { baseUrl } from '../config/envVar';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Agile Projects Manager API',
      version: '1.0.0',
      description: 'Polytechnique Semester project backend API routes',
    },
    servers: [
      {
        url: baseUrl,
        description: 'Development',
      },
    ],
  },
  apis: ['./src/docs/**/*.ts', './src/docs/*.ts'],
  swaggerOptions: {
    docExpansion: 'none',
  },
};

export const specs = swaggerJsDoc(options);
