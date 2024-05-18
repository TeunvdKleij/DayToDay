FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine

WORKDIR /app
COPY --from=build /app ./
RUN npm install --production
EXPOSE 3001
CMD ["npm", "start"]
