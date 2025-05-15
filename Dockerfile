FROM node:20-alpine AS build
WORKDIR /app

COPY package.json ./
COPY tsconfig*.json ./

COPY tsconfig*.json ./
COPY package.json ./
COPY src/ ./src

RUN npm i --legacy-peer-deps && npm run build

FROM node:20-alpine
WORKDIR /app
ARG ENV
ENV ENVERIONMENT=$ENV
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/build /app
COPY --from=build /app/package.json /app
COPY --from=build /app/tsconfig*.json /app

EXPOSE 5050
CMD npm run start