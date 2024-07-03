import express, { Request, Response, NextFunction } from 'express';
import redis, { createClient } from 'redis';
import { performance } from 'perf_hooks';
// // prometheus library
// import promClient from 'prom-client';

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

app.post('/test', async (req, res) => {
    const redisClient = createClient({
        url: 'redis://default:J4qW0Kf6udoPHKmthBviCYfGXE5ommO2@redis-11565.c274.us-east-1-3.ec2.redns.redis-cloud.com:11565'
    })
    
    redisClient.on('error', (err) => console.error('Redis Client Error', err));
    redisClient.on('connect', () => console.log('Redis client connected'));
    try {
        // Connect to Redis
        await redisClient.connect();
        console.log('connected to Redis');

        // add sample data to mimic cache behavior
        const sampleData = Array.from({ length: 1000 }, (_, i) => `key${i}`);
        // set ttl = 1 hour
        const ttl = 60 * 60;

        const start = performance.now();

        for (const key of sampleData) {
            await redisClient.set(key, `value${key}`, { EX: ttl });
        }
    
        for (let i = 0; i < 2000; i++) {
            const key = `key${Math.floor(Math.random() * 1000)}`;
            await redisClient.get(key);
        }

        const end = performance.now();
        // converting to seconds
        const duration = (end - start) / 1000;
        console.log('Duration: ', duration);

        

        await redisClient.quit();
        res.send({ duration });
    } catch (error) {
        console.error('Error during Redis operations: ', error);
        res.status(500).send('Error during Redis operations');
    }    
});

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
