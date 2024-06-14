import express, { Request, Response, NextFunction } from 'express';
import redis, { createClient } from 'redis';

const app = express();
const PORT = 3001;

app.use(express.json());


// const redisClient = createClient({
//     password: 'KptlZCYma2TJ1hIwR4ZkRQP0Uu7Cuq4k',
//     socket: {
//         host: 'redis-17407.c278.us-east-1-4.ec2.redns.redis-cloud.com',
//         port: 17407
//     }
// });

const redisClient = createClient({
    url: 'redis://default:KptlZCYma2TJ1hIwR4ZkRQP0Uu7Cuq4k@redis-17407.c278.us-east-1-4.ec2.redns.redis-cloud.com:17407'
})

redisClient.on('error', (err) => console.error('Redis Client Error', err));

// Connect to Redis
redisClient.connect();


// convert Redis INFO metrics to Prometheus format
const prometheusFormat = (metrics: { [key: string]: string}): string => {
    let output = '';
    for (const [key, value] of Object.entries(metrics)) {
        // Attempt to parse the value as a float
        const floatValue = parseFloat(value);
        if (!isNaN(floatValue)) {
            output += `# TYPE redis_${key} gauge\n`;
            output += `redis_${key} ${floatValue}\n`;
        }
    }
    return output;
}

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
interface Metrics {
    [key: string]: string;
}
// prometheus server: 9090/metrics
// route to get metrics from Redis
app.get('/metrics', async (req, res) => {
    try {
        const info = await redisClient.info();
        console.log('Redis INFO:', info); // Log the redis metrics using INFO command

        const metrics: Metrics = info.split('\n').reduce((acc: Metrics, line) => {
            const parts = line.split(':');
            if (parts.length === 2) {
                acc[parts[0].trim()] = parts[1].trim();
            }
            return acc;
        }, {});

        console.log('Parsed Metrics:', metrics);  // Log the parsed metrics

        const prometheusMetrics = prometheusFormat(metrics);
        console.log('Prometheus Metrics:', prometheusMetrics);  // Log the Prometheus formatted metrics

        res.set('Content-Type', 'text/plain');
        res.send(prometheusMetrics);
    } catch (err) {
        console.error('Error fetching metrics:', err);
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});

// GET route: get current scoreboard
// app.get('/api', playerController.getScores, (req, res) =>
//   res.json(res.locals.scores)
// );

// // POST route: update scoreboard
// app.post('/api', playerController.updateScores, (req, res) =>
//   res.json(res.locals.scores)
// );

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
