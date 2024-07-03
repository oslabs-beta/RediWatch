import express, { Request, Response, NextFunction } from 'express';
import redis, { createClient } from 'redis';

const app = express();
const PORT = 3001;

app.use(express.json());



// const redisClient = createClient({
//     url: 'redis://default:J4qW0Kf6udoPHKmthBviCYfGXE5ommO2@redis-11565.c274.us-east-1-3.ec2.redns.redis-cloud.com:11565'
// })

// redisClient.on('error', (err) => console.error('Redis Client Error', err));

// // Connect to Redis
// redisClient.connect();


// // convert Redis INFO metrics to Prometheus format
// const prometheusFormat = (metrics: { [key: string]: string}): string => {
//     let output = '';
//     for (const [key, value] of Object.entries(metrics)) {
//         // Attempt to parse the value as a float
//         const floatValue = parseFloat(value);
//         if (!isNaN(floatValue)) {
//             output += `# TYPE redis_${key} gauge\n`;
//             output += `redis_${key} ${floatValue}\n`;
//         }
//     }
//     return output;
// }

// testing info command
// async function getInfo() {
//     try {
//         const info = await redisClient.info();
//         console.log(info);
//     } catch (error) {
//         console.error('Error fetching INFO from Redis', error);
//     }
// }
// getInfo();


// define the type for the metrics object
// interface Metrics {
//     [key: string]: string;
// }
// // prometheus server: 9090/metrics
// // route to get metrics from Redis
// app.get('/metrics', async (req, res) => {
//     try {
//         const info = await redisClient.info();
//         console.log('Redis INFO:', info); 

//         const metrics: Metrics = info.split('\n').reduce((acc: Metrics, line) => {
//             const parts = line.split(':');
//             if (parts.length === 2) {
//                 acc[parts[0].trim()] = parts[1].trim();
//             }
//             return acc;
//         }, {});

//         console.log('Parsed Metrics:', metrics);  

//         const prometheusMetrics = prometheusFormat(metrics);
//         console.log('Prometheus Metrics:', prometheusMetrics);  

//         res.set('Content-Type', 'text/plain');
//         res.send(prometheusMetrics);
//     } catch (err) {
//         console.error('Error fetching metrics:', err);
//         res.status(500).json({ error: 'Failed to fetch metrics' });
//     }
// });



// global error handler
// app.use('/', (err, req, res, _next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// })

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
