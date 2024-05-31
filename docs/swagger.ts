/* Swagger configuration */
const options = {
    openapi: 'OpenAPI 3',   // Enable/Disable OpenAPI. By default is null
    language: 'en-US',      // Change response language. By default is 'en-US'
    disableLogs: false,     // Enable/Disable logs. By default is false
    autoHeaders: false,     // Enable/Disable automatic headers capture. By default is true
    autoQuery: false,       // Enable/Disable automatic query capture. By default is true
    autoBody: false         // Enable/Disable automatic body capture. By default is true
}

// const config = require('../config/cloud');
const swaggerAutogen = require('swagger-autogen')();
// const msg = require('../utils/lang/messages');

const doc = {
  info: {
    version: '2.0.0',      // by default: '1.0.0'
    title: 'grocery Apis',        // by default: 'REST API'
    description: 'API for Managing queue calls',  // by default: ''
    contact: {
        'name': 'API Support',
        'email': 'mahmoud.abdelkawi@appnest.pro'
    },
  },
  host: "localhost:4000",      // by default: 'localhost:3000'
  basePath: '/',  // by default: '/'
  schemes: ['http'],   // by default: ['http']
  consumes: ['application/json'],  // by default: ['application/json']
  produces: ['application/json'],  // by default: ['application/json']
  tags: [        // by default: empty Array
    // {
    //   name: 'Queue CRUD',         // Tag name
    //   description: 'Queue related apis',  // Tag description
    //   takeCoverage : true
    // },
    // {
    //     name: 'Health',
    //     description: 'Health Check'
    // }
  ],
  securityDefinitions: {},  // by default: empty object
         // by default: empty object (Swagger 2.0)
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['../app.ts', '../routes/*.ts' , '../services/*.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);

// swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
//     require('./index.js'); // Your project's root file
//   });