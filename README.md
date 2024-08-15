# RediWatch

*Website and Dev-tool: [Rediwatch](https://github.com/oslabs-beta/RediWatch)*

## Overview

Caching provides significant performance optimization for any application, however it is difficult to confirm the efficiency of your cache. Also, one of the biggest problems facing developers today is how to handle cache invalidation (ensuring the value stored in your cache matches the value in the primary source).

Rediwatch is an open-source tool that displays vital metrics for Redis caches through an intuitive, user-friendly website. Rediwatch is easy to utilize, free to use, and assists developers in visualizing cache performance issues, so that they can avoid constantly monitoring their applications Redis caches. As users select different cache configurations and invalidation methods, metrics will be updated and visualized on the dashboard. Rediwatch monitors:

- Used memory
- Key space hits and misses
- Commands processed
- Connected clients
- Evicted and expired keys
- *and many more*

## Core Features

- Customizable Metrics: Customize which metrics you want to have displayed in real-time.
- Login: Create an authorized profile to quickly and securely access Rediwatch and save your Redis caches.
- Easy Set Up: Simply enter your Redis connection URL, give it a nickname, and click to connect.
- Free: Rediwatch offers cache visualization for free, making it accessible to all developers.

## Getting Started

### How do you use Rediwatch for applications in production?

Navigate to [Rediwatch](https://github.com/oslabs-beta/RediWatch) and set up a user account. *Only users with an account can use Rediwatch at this time.*

getting started

Go to your Redis cloud console and copy your Redis connection URL from your configuration settings. *Your connection url should include your host, port, and password for Redis.*

redis cache

Add your Redis connection URL on the homepage, and give it a unique nickname before you add it to your profile. Click submit to generate testing on this cache to display your metrics.

metrics graph

Rediwatch will generate the graphs for the performance metrics associated with the selected cache, and you can interact with our dynamic graphs by selecting different eviction policies, ttl times, and maxmemory setting on the Configuration page.

Select the cache configuration settings you would like to visualize, then click the run tests button to update the metrics graphs with the latest cache configuration.

configuration

### How do you use Rediwatch for applications in development?

There are two ways to use the application for development purposes. The first method:

1. First, clone the repository from Github .
2. Run ```docker build -t rediwatch -f Dockerfile-dev .``` in your terminal
3. Run ```docker-compose -f docker-compose-dev-hot.yml up``` in your terminal
4. Navigate to [localhost:8080](https://localhost:8080). You should see the web application and enter your Redis connection URL (default is empty) and nickname.

Or, simply pull the image from Docker:

1. Navigate to [Docker Hub](https://hub.docker.com) and pull the image using the command ```docker pull rediwatch/rediwatch```
2. Run ```npm run docker-dev:hot``` in your terminal
3. Navigate to [localhost:8080](https://localhost:8080). You should see the web application and enter your Redis connection URL (default is empty) and nickname.

*If you're having any trouble, please refer to the images in the section above.*

## Tech Stack

Node.js | Typescript | React.js | PostgreSQL | Redis | Grafana | Express | Material UI | Docker

## How to Contribute

1. Clone the repo and make a new branch
2. Run ```docker build -t rediwatch -f Dockerfile-dev .``` in your terminal
3. Run ```npm run docker-dev:hot``` in your terminal
4. Add a feature, fix a bug, or refactor some code
5. Write tests for the changes you made, if necessary
6. Run unit tests and make sure all tests pass: npm test
7. Open a Pull Request with a comprehensive description of changes to the dev branch

## Future Features
There are plenty of features that still need to be integrated into the codebase:
- Jest testing: Adding more unit tests and end-to-end tests for application performance reliability.
- Alerts and notifications: Set up alerts for individual metrics to be notified when a metric dips below or exceeds a specified value.
- AuthO: Integrating Google or Github login to quickly and securely access Rediwatch.

## Contributors

**Yang Cao** [Github](https://github.com) | [LinkedIn](https://linkedin.com)

**Ansel Nolting** [Github](https://github.com) | [LinkedIn](https://linkedin.com)

**Jennifer Slaughter** [Github](https://github.com) | [LinkedIn](https://linkedin.com)

**YoonJoo Woo** [Github](https://github.com) | [LinkedIn](https://linkedin.com)
