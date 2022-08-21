FROM node:12-alpine AS BUILD_IMAGE

# couchbase sdk requirements

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build-ts
RUN npm run next:build

RUN npm prune --production


FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/next/public ./next/public
COPY --from=BUILD_IMAGE /usr/src/app/package.json ./package.json
COPY --from=BUILD_IMAGE /usr/src/app/next/.next ./next/.next
COPY --from=BUILD_IMAGE /usr/src/app/next/next.config.js ./next/next.config.js

EXPOSE 5555

CMD [ "node", "dist/server.js"]