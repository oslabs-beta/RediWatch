import express, { Request, Response, NextFunction } from 'express';
// import redis, { createClient, RedisClientType } from 'redis';
import { performance } from 'perf_hooks';
import Redis, { Redis as RedisClientType } from 'ioredis';
// // prometheus library
// import promClient from 'prom-client';

const app = express();
const PORT = 3001;

app.use(express.json());

interface PerformanceMetrics {
    duration: number;
    hits: number;
    misses: number;
}

interface RedisConfigResult {
    maxmemory: string;
}

const redisClient: RedisClientType = new Redis({
    host: `redis-11565.c274.us-east-1-3.ec2.redns.redis-cloud.com`,
    port: 11565,
    password: 'J4qW0Kf6udoPHKmthBviCYfGXE5ommO2',
    username: 'default',
})

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis client connected'));

app.post('/test', async (req, res) => {
    // const redisClient: RedisClientType = createClient({
    //     url: 'redis://default:J4qW0Kf6udoPHKmthBviCYfGXE5ommO2@redis-11565.c274.us-east-1-3.ec2.redns.redis-cloud.com:11565'
    // })
   
    try {
        // Connect to Redis
        await redisClient.ping();
        console.log('connected to Redis');
        
        // Check supported configuration parameters
        const supportedConfigs = await redisClient.config('GET', '*') as Array<string>;
        console.log('Supported CONFIG parameters: ', supportedConfigs);

        if (supportedConfigs.includes('maxmemory')) {
            // Set maxmemory to 30mb if supported
            await redisClient.config('SET', 'maxmemory', '30mb');
            console.log('maxmemory set to 30mb');

            // Fetch maxmemory configuration
            const configResult = await redisClient.config('GET', 'maxmemory') as Array<string>;
            console.log('Config Result: ', configResult);

            // Destructure the result to get the maxmemory value
            const maxMemoryIndex = configResult.findIndex(config => config === 'maxmemory');
            const maxMemory = maxMemoryIndex !== -1 ? configResult[maxMemoryIndex + 1] : undefined;
            console.log('maxmemory: ', maxMemory);
        } else {
            console.log('maxmemory is not a supported CONFIG parameter.');
        }

        // Test cache performance
        const performanceMetrics = await testCachePerformance(redisClient);
        res.json(performanceMetrics);

        // test each eviction methods
        // const evictionPolicies = ['allkeys-lru', 'volatile-lru', 'allkeys-random', 'volatile-random', 'volatile-ttl', 'noeviction'];
        
        // for (const policy of evictionPolicies) {
        //     console.log(`Testing ${policy}`);
        //     const performanceMetrics = await testCachePerformance(redisClient, policy); 
        //     console.log(`Performance metrics for policy ${policy}: `, performanceMetrics);
            
        // }
        // const performanceMetrics = await testCachePerformance(redisClient);
        // res.send(performanceMetrics);
        
    } catch (error) {
        console.error('Error during Redis operations: ', error);
        res.status(500).send('Error during Redis operations');
    }    
});



async function testCachePerformance(redisClient: RedisClientType): Promise<PerformanceMetrics> {
    // await redisClient.configSet('maxmemory', '30mb');
    // await redisClient.configSet('maxmemory-policy', evictionPolicy);
    // console.log('maxmemory reset');

    // await redisClient.configGet('maxmemory', function(err: any, result: any) {
    //     if (err) {
    //         console.error('Error: ', err);
    //     } else {
    //         console.log('maxmemory: ', result[1]);
    //     }
    // })

    // try {
    //     const result = await redisClient.configGet('maxmemory');
    //     const maxMemory = result['maxmemory'];
    //     console.log('maxmemory: ', maxMemory);
    // } catch (error) {
    //     console.error('Error fetching maxmemory:', error);
    // }

    // add sample data to mimic cache behavior
    const sampleData = Array.from({ length: 1000 }, (_, i) => `key${i}`);
    // set ttl = 1 hour
    const ttl = 60 * 60;

    const start = performance.now();

    // setting keys
    for (const key of sampleData) {
        await redisClient.set(key, `value${key}`, 'EX', ttl );
    }
    

    // retrieve keys
    let hits = 0;
    let misses = 0;
    for (let i = 0; i < 2000; i++) {
        const key = `key${Math.floor(Math.random() * 1000)}`;
        const result = await redisClient.get(key);
        if (result !== null) {
            hits++;
        } else {
            misses++;
        }
    }

    const end = performance.now();
    // converting to seconds
    const duration = (end - start) / 1000;
    console.log('Duration: ', duration);
    console.log('hits: ', hits);
    console.log('misses: ', misses);
    

    await redisClient.quit();
    return { duration, hits, misses };
}
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
