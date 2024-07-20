FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm run build
EXPOSE 3001
# ENTRYPOINT [ "node", "src/server/server.ts" ]
ENTRYPOINT [ "node", "dist/server/server.js" ]

# FROM node:16.13
# WORKDIR /usr/src/app
# COPY . /usr/src/app
# RUN npm install
# RUN npm install typescript
# RUN npm install tsc -g
# RUN npm run build
# EXPOSE 3000
# ENTRYPOINT ["node", "dist/server/server.js"]