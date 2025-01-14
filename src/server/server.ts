import express, { Request, Response } from "express";
import { Client } from 'pg';
import { performance } from "perf_hooks";
import Redis, { Redis as RedisClientType } from "ioredis";

const app = express();
const PORT = 3001;

import "dotenv/config";
require("dotenv").config();

//import model
const db = require('./models/queryModels');

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));


// Connect to the database
db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err: Error) => {
    console.error('Connection error', err.stack);
  });



interface PerformanceMetrics {
  duration: number;
  hits: number;
  misses: number;
}

const redisClient: RedisClientType = new Redis({
  host: "redis",
  port: 6379,
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis client connected"));

app.post("/test", async (req: Request, res: Response) => {
  try {
    // Connect to Redis
    await redisClient.ping();
    console.log("connected to Redis");

    // Set maxmemory to 30mb
    await redisClient.config("SET", "maxmemory", "30mb");
    console.log("maxmemory set to 30mb");

    // Fetch maxmemory configuration
    const configResult = (await redisClient.config(
      "GET",
      "maxmemory"
    )) as Array<string>;
    console.log("Config Result: ", configResult);

    // Test cache performance
    const performanceMetrics = await testCachePerformance(redisClient);
    res.json(performanceMetrics);
  } catch (error) {
    console.error("Error during Redis operations: ", error);
    res.status(500).send("Error during Redis operations");
  }
});

app.get("/api/test", async (req: Request, res: Response) => {
  res.status(200).json("test");
});

async function testCachePerformance(
  redisClient: RedisClientType
): Promise<PerformanceMetrics> {
  const sampleData = Array.from({ length: 10000 }, (_, i) => `key${i}`);
  const ttl = 60 * 60; // 1 hour

  const start = performance.now();

  // Setting keys
  for (const key of sampleData) {
    await redisClient.set(key, `value${key}`, "EX", ttl);
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

  console.log("Duration: ", duration);
  console.log("hits: ", hits);
  console.log("misses: ", misses);

  // await redisClient.quit();
  return { duration, hits, misses };
}

interface NewConnectionRequestBody {
  connectionnickname: string;
  connectionstring: string;
  user_id: number;
  config_id: number | null;
}

// Adds a connection string , config_id and nickname to existing user from homepage form input
app.post("/api/add-connection", async (req: Request, res: Response) => {
  const {
    connectionnickname,
    connectionstring,
    user_id,
    config_id,
  }: NewConnectionRequestBody = req.body;

  try {
    const result = await db.query(
      "INSERT INTO public.caches (connectionnickname, connectionstring, user_id, config_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [connectionnickname, connectionstring, user_id, config_id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting connection data:", err);
    res.status(500).json({ error: "Failed to add connection" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
