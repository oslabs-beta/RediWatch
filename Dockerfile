FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm run build
RUN tsc
EXPOSE 3001
# ENTRYPOINT [ "node", "src/server/server.ts" ]
ENTRYPOINT [ "node", "dist/sersver/server.js" ]