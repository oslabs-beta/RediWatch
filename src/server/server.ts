import express, { Request, Response } from 'express';
import { performance } from 'perf_hooks';
import Redis, { Redis as RedisClientType } from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.json());

interface PerformanceMetrics {
    duration: number;
    hits: number;
    misses: number;
}

const redisClient: RedisClientType = new Redis({
    host: 'localhost',
    port: 6379
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis client connected'));

app.post('/test', async (req: Request, res: Response) => {
    try {
        // Connect to Redis
        await redisClient.ping();
        console.log('connected to Redis');
        
        // Set maxmemory to 30mb
        await redisClient.config('SET', 'maxmemory', '30mb');
        console.log('maxmemory set to 30mb');

        // Fetch maxmemory configuration
        const configResult = await redisClient.config('GET', 'maxmemory') as Array<string>;
        console.log('Config Result: ', configResult);

        // Test cache performance
        const performanceMetrics = await testCachePerformance(redisClient);
        res.json(performanceMetrics);
        
    } catch (error) {
        console.error('Error during Redis operations: ', error);
        res.status(500).send('Error during Redis operations');
    }    
});

async function testCachePerformance(redisClient: RedisClientType): Promise<PerformanceMetrics> {
    const sampleData = Array.from({ length: 10000 }, (_, i) => `key${i}`);
    const ttl = 60 * 60; // 1 hour

    const start = performance.now();

    // Setting keys
    for (const key of sampleData) {
        await redisClient.set(key, `value${key}`, 'EX', ttl);
    }
    
    // Retrieve keys
    let hits = 0;
    let misses = 0;
    for (let i = 0; i < 20000; i++) {
        const key = `key${Math.floor(Math.random() * 10000)}`;
        const result = await redisClient.get(key);
        if (result !== null) {
            hits++;
        } else {
            misses++;
        }
    }

    const end = performance.now();
    const duration = (end - start) / 1000; // converting to seconds

    console.log('Duration: ', duration);
    console.log('hits: ', hits);
    console.log('misses: ', misses);
    
    await redisClient.quit();
    return { duration, hits, misses };
}

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
